<?php

namespace Database\Factories;

use App\Models\CourseProgress; // Sesuaikan namespace jika model CourseProgress Anda di folder lain
use App\Models\Student;        // Pastikan Anda memiliki model Student
use App\Models\Course;         // Pastikan Anda memiliki model Course
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseProgressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CourseProgress::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalLessons = $this->faker->numberBetween(5, 20); // Total pelajaran antara 5 sampai 20
        $lessonsCompleted = $this->faker->numberBetween(0, $totalLessons); // Pelajaran yang diselesaikan

        $totalQuizzes = $this->faker->numberBetween(2, 10); // Total kuis antara 2 sampai 10
        $quizzesPassed = $this->faker->numberBetween(0, $totalQuizzes); // Kuis yang diluluskan

        // Contoh perhitungan persentase kemajuan (bisa Anda sesuaikan dengan logika di ProgressService Anda)
        // Misalnya: 70% dari progres ditentukan oleh pelajaran, 30% oleh kuis
        $lessonProgressRatio = ($totalLessons > 0) ? ($lessonsCompleted / $totalLessons) : 0;
        $quizProgressRatio = ($totalQuizzes > 0) ? ($quizzesPassed / $totalQuizzes) : 0;

        $progressPercentage = round(($lessonProgressRatio * 0.7 + $quizProgressRatio * 0.3) * 100, 2);

        // Menentukan apakah kursus selesai berdasarkan persentase (misal: 100% untuk selesai)
        $isCompleted = ($progressPercentage >= 100.00);

        return [
            'student_id' => Student::factory(), // Membuat student baru jika belum ada
            'course_id' => Course::factory(),   // Membuat course baru jika belum ada
            'lessons_completed' => $lessonsCompleted,
            'total_lessons' => $totalLessons,
            'quizzes_passed' => $quizzesPassed,
            'total_quizzes' => $totalQuizzes,
            'progress_percentage' => $progressPercentage,
            'is_completed' => $isCompleted,
            'completed_at' => $isCompleted ? $this->faker->dateTimeBetween('-1 year', 'now') : null,
        ];
    }

    /**
     * Indicate that the course progress is in a completed state.
     * Anda bisa menggunakan ini untuk membuat data yang sudah 100% selesai.
     */
    public function completed(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'lessons_completed' => $attributes['total_lessons'] ?? $this->faker->numberBetween(5, 20), // Pastikan total_lessons terisi
                'quizzes_passed' => $attributes['total_quizzes'] ?? $this->faker->numberBetween(2, 10), // Pastikan total_quizzes terisi
                'progress_percentage' => 100.00,
                'is_completed' => true,
                'completed_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            ];
        });
    }

    /**
     * Indicate that the course progress is in an incomplete state.
     * Anda bisa menggunakan ini untuk membuat data yang belum 100% selesai.
     */
    public function incomplete(): Factory
    {
        return $this->state(function (array $attributes) {
            $totalLessons = $attributes['total_lessons'] ?? $this->faker->numberBetween(5, 20);
            $totalQuizzes = $attributes['total_quizzes'] ?? $this->faker->numberBetween(2, 10);

            // Pastikan pelajaran yang diselesaikan kurang dari total
            $lessonsCompleted = $this->faker->numberBetween(0, max(0, $totalLessons - 1));
            // Pastikan kuis yang diluluskan kurang dari total
            $quizzesPassed = $this->faker->numberBetween(0, max(0, $totalQuizzes - 1));

            $lessonProgressRatio = ($totalLessons > 0) ? ($lessonsCompleted / $totalLessons) : 0;
            $quizProgressRatio = ($totalQuizzes > 0) ? ($quizzesPassed / $totalQuizzes) : 0;
            $progressPercentage = round(($lessonProgressRatio * 0.7 + $quizProgressRatio * 0.3) * 100, 2);

            // Pastikan persentase kurang dari 100 jika belum selesai
            $progressPercentage = ($progressPercentage < 100.00) ? $progressPercentage : $this->faker->numberBetween(1, 99);


            return [
                'lessons_completed' => $lessonsCompleted,
                'total_lessons' => $totalLessons,
                'quizzes_passed' => $quizzesPassed,
                'total_quizzes' => $totalQuizzes,
                'progress_percentage' => $progressPercentage,
                'is_completed' => false,
                'completed_at' => null,
            ];
        });
    }
}
