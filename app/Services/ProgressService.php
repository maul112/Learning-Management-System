<?php

namespace App\Services;

use App\Models\Course;
use App\Models\CourseProgress;
// use App\Models\Lesson; // Sudah diakses melalui relasi
// use App\Models\Quiz; // Sudah diakses melalui relasi
use App\Models\Student;
// use App\Models\Submission; // Tidak lagi dibutuhkan langsung untuk perhitungan ini
use App\Models\SubmissionHistory;
// use Illuminate\Database\Eloquent\Collection; // Hanya untuk type hinting, tidak wajib untuk logika ini
use Illuminate\Support\Facades\Log;

class ProgressService
{
    /**
     * Updates or creates a student's course progress record.
     *
     * @param Student $student The student whose progress is being updated.
     * @param Course $course The course for which progress is being updated.
     * @return CourseProgress The updated or created CourseProgress model instance.
     */
    public function updateCourseProgress(Student $student, Course $course): CourseProgress
    {
        // Memuat relasi yang diperlukan secara lazy jika belum dimuat
        // Penting: Pastikan relasi modules.lessons.quizzes dan lessonCompletions, submissionHistories ada dan benar
        $course->loadMissing(['modules.lessons.quizzes']);
        $student->loadMissing(['lessonCompletions', 'submissionHistories']);

        // 1. Menghitung Total Pelajaran dan Total Pelajaran yang Memiliki Kuis untuk kursus ini
        $totalLessons = 0;
        $totalLessonsWithQuizzes = 0; // Ini akan menjadi nilai untuk total_quizzes
        $allLessonIdsInCourse = []; // Untuk mengumpulkan semua ID pelajaran di kursus

        foreach ($course->modules as $module) {
            foreach ($module->lessons as $lesson) {
                $totalLessons++;
                $allLessonIdsInCourse[] = $lesson->id;

                // Jika pelajaran ini memiliki setidaknya satu kuis, hitung dia
                if ($lesson->quizzes->isNotEmpty()) {
                    $totalLessonsWithQuizzes++;
                }
            }
        }

        // 2. Menghitung Pelajaran yang Diselesaikan oleh siswa untuk kursus ini
        $lessonsCompleted = $student->lessonCompletions
            ->whereIn('lesson_id', $allLessonIdsInCourse) // Filter hanya untuk pelajaran di kursus ini
            ->count();

        // 3. Menghitung Pelajaran yang Kuisnya Diluluskan oleh siswa untuk kursus ini
        // Kriteria: Siswa memiliki SubmissionHistory untuk pelajaran tersebut dengan grade >= 75%
        $passedLessonsWithQuizzes = $student->submissionHistories
            // Filter submission histories yang belongs ke pelajaran di kursus ini
            ->filter(fn($history) => in_array($history->lesson_id, $allLessonIdsInCourse))
            // Filter yang memiliki grade lulus (>= 75%)
            ->filter(fn($history) => (float)str_replace('%', '', $history->grade) >= 75.00)
            // Ambil ID pelajaran unik dari submission history yang lulus
            ->pluck('lesson_id')
            ->unique() // Pastikan setiap pelajaran hanya dihitung sekali jika ada beberapa kali lulus
            ->count();

        // 4. Mencari atau Membuat record CourseProgress
        $progress = CourseProgress::firstOrNew(
            ['student_id' => $student->id, 'course_id' => $course->id]
        );

        // 5. Memperbarui Detail Progress
        $progress->total_lessons = $totalLessons;
        $progress->lessons_completed = $lessonsCompleted;

        // Gunakan perhitungan baru untuk kuis
        $progress->total_quizzes = $totalLessonsWithQuizzes; // Total pelajaran yang punya kuis
        $progress->quizzes_passed = $passedLessonsWithQuizzes; // Pelajaran yang kuisnya diluluskan

        // Mendefinisikan rasio penyelesaian pelajaran
        $lessonCompletionRatio = ($totalLessons > 0) ? ($lessonsCompleted / $totalLessons) : 0;
        $quizPassingRatio = ($totalLessonsWithQuizzes > 0) ? ($passedLessonsWithQuizzes / $totalLessonsWithQuizzes) : 0;

        // Menghitung persentase kemajuan keseluruhan HANYA berdasarkan pelajaran
        $progressPercentage = round(($lessonCompletionRatio * 0.7 + $quizPassingRatio * 0.3) * 100, 2);
        $progress->progress_percentage = min(100.00, $progressPercentage); // Batasi maksimal 100%

        // Menentukan apakah kursus selesai berdasarkan kriteria HANYA pelajaran
        $isCourseCompleted = ($lessonCompletionRatio >= 1.0); // Kursus selesai jika semua pelajaran selesai

        // Memperbarui status is_completed dan completed_at
        if ($isCourseCompleted && !$progress->is_completed) {
            $progress->is_completed = true;
            $progress->completed_at = now();
        } elseif (!$isCourseCompleted && $progress->is_completed) {
            $progress->is_completed = false;
            $progress->completed_at = null;
        } else if ($isCourseCompleted && $progress->is_completed) {
            // Sudah selesai dan tetap selesai, tidak ada perubahan pada completed_at jika sudah ada
        } else {
            $progress->is_completed = false;
        }

        $progress->save(); // Menyimpan perubahan ke database

        return $progress;
    }
}
