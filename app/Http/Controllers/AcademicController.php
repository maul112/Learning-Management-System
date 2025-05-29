<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Quiz;
use App\Models\Submission;
use App\Models\SubmissionHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index(Course $course)
    {
        $courses = Course::with(['ratings'])->get();
        $course->load([
            'academic',
            'ratings.student.user',
            'modules.lessons',
            'students.user'
        ]);

        return Inertia::render('academics/course', [
            'courses' => CourseResource::collection($courses),
            'course' => new CourseResource($course),
        ]);
    }

    public function show(Course $course, Lesson $lesson)
    {
        $courses = Course::all();
        $course->load([
            'academic',
            'ratings',
            'modules',
            'students.user',
            'modules.lessons.module.course',
        ]);
        $lesson->load(['module.lessons', 'module.course', 'quizes']);

        return Inertia::render('academics/tutorials', [
            'courses' => CourseResource::collection($courses),
            'course' => new CourseResource($course),
            'lesson' => new LessonResource($lesson),
        ]);
    }

    public function quizzesSubmit(Request $request)
    {
        $request->validate([
            'submissions' => ['required', 'array'],
            'submissions.*.quiz_id' => ['required', 'exists:quizzes,id'],
            'submissions.*.selected_answer' => ['nullable', 'string'],
        ]);

        $studentId = Auth::id();
        if (!$studentId) {
            return redirect()->route('login')->with('error', 'Please log in to submit quizzes.');
        }

        $firstQuizId = $request->input('submissions.0.quiz_id');
        $lesson = Quiz::with('lesson')->find($firstQuizId);
        $lessonId = $lesson->id;


        try {
            $submissionHistory = SubmissionHistory::create([
                'lesson_id' => $lessonId,
                'student_id' => $studentId,
                'status' => 'pending',
                'grade' => null,
            ]);

            $correctAnswersCount = 0;
            $totalQuizzes = count($request->submissions);

            foreach ($request->submissions as $submissionData) {
                $quizId = $submissionData['quiz_id'];
                $selectedAnswer = $submissionData['selected_answer'];

                $quiz = Quiz::find($quizId);

                $isCorrect = false;
                if ($quiz && $quiz->answer === $selectedAnswer) {
                    $isCorrect = true;
                    $correctAnswersCount++;
                }

                Submission::create([
                    'student_id' => $studentId,
                    'quiz_id' => $quizId,
                    'submission_history_id' => $submissionHistory->id,
                    'selected_answer' => $selectedAnswer,
                    'is_correct' => $isCorrect,
                ]);
            }

            $passingScorePercentage = 75;
            $scorePercentage = ($totalQuizzes > 0) ? ($correctAnswersCount / $totalQuizzes) * 100 : 0;

            $status = ($scorePercentage >= $passingScorePercentage) ? 'passed' : 'failed';
            $grade = round($scorePercentage, 2) . '%';

            $submissionHistory->update([
                'status' => $status,
                'grade' => $grade,
            ]);

            return redirect()->back()->with('success', 'Quiz submitted successfully.');
        } catch (\Exception $e) {
            Log::error('Quiz submission failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);

            return redirect()->back()->with('error', 'Failed to submit quiz.');
        }
    }
}
