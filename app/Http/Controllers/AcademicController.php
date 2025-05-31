<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Submission;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SubmissionHistory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\StudentResource;

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

        // No longer relying on session('snapToken') from a redirect here
        // The snapToken will now be handled directly by the client-side axios call.
        return Inertia::render('academics/course', [
            'courses' => CourseResource::collection($courses),
            'course' => new CourseResource($course),
            'snapToken' => null, // We won't pass snapToken via Inertia props from index anymore for this flow
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
        $lesson->load([
            'module.lessons',
            'module.course',
            'quizzes' => function ($query) {
                $query->inRandomOrder()->limit(4);
            }
        ]);
        $user = Auth::user();
        $student = Student::where('user_id', '=', $user->id)
            ->with([
                'user',
                'submissionHistories' => function ($query) use ($lesson) {
                    $query->where('lesson_id', '=', $lesson->id)->with('submissions');
                }
            ])
            ->first();

        return Inertia::render('academics/tutorials', [
            'courses' => CourseResource::collection($courses),
            'course' => new CourseResource($course),
            'lesson' => new LessonResource($lesson),
            'student' => new StudentResource($student),
        ]);
    }

    public function payments(Course $course)
    {
        $user = Auth::user();

        try {
            // Configure Midtrans (do this once)
            \Midtrans\Config::$serverKey = config('midtrans.serverKey');
            \Midtrans\Config::$isProduction = false; // Set to true for Production Environment (accept real transaction).
            \Midtrans\Config::$isSanitized = true;
            \Midtrans\Config::$is3ds = true;

            // 1. Handle free courses immediately
            if ($course->price == 0) {
                $student = Student::where('user_id', $user->id)->first();
                if ($student && !$student->courses()->where('course_id', $course->id)->exists()) {
                    $student->courses()->attach($course->id);
                }
                return response()->json([
                    'redirectUrl' => route('academics.show', [
                        'course' => $course->id,
                        'lesson' => $course->modules[0]->lessons[0]->id // Make sure this path is valid
                    ]),
                    'message' => 'You have successfully enrolled in this free course!',
                ]);
            }

            // 2. Check for existing payment
            $existingPayment = Payment::where([
                'course_id' => $course->id,
                'user_id' => $user->id,
            ])->first();

            $snapToken = null;

            if ($existingPayment) {
                if ($existingPayment->status == 'paid') {
                    // If already paid, return redirect URL
                    return response()->json([
                        'redirectUrl' => route('academics.show', [
                            'course' => $course->id,
                            'lesson' => $course->modules[0]->lessons[0]->id
                        ]),
                        'message' => 'You have already paid for this course. Enjoy!',
                    ]);
                }

                // If pending or expired, re-generate token for the existing payment_id
                // Midtrans allows re-generation of snap token for same order_id
                $params = [
                    'transaction_details' => [
                        'order_id' => $existingPayment->payment_id,
                        'gross_amount' => $existingPayment->amount,
                    ],
                    'customer_details' => [
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                ];
                $snapToken = \Midtrans\Snap::getSnapToken($params);
            } else {
                // No existing payment, create a new one
                $createPayment = Payment::create([
                    'payment_id' => Str::uuid(),
                    'user_id' => $user->id,
                    'course_id' => $course->id,
                    'amount' => $course->price,
                    'status' => 'pending',
                    'payment_method' => null,
                    'payment_detail' => null,
                    'paid_at' => null,
                    'expired_at' => now()->addHour(),
                ]);

                $params = [
                    'transaction_details' => [
                        'order_id' => $createPayment->payment_id,
                        'gross_amount' => $createPayment->amount,
                    ],
                    'customer_details' => [
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                ];
                $snapToken = \Midtrans\Snap::getSnapToken($params);
            }

            // Always return a JSON response with the snapToken
            return response()->json(['snapToken' => $snapToken]);
        } catch (\Exception $e) {
            Log::error('Midtrans payment processing failed: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            // Return an error JSON response
            return response()->json(['error' => 'Failed to process payment. Please try again or contact support.'], 500);
        }
    }

    public function quizzesSubmit(Request $request)
    {
        $request->validate([
            'submissions' => ['required', 'array'],
            'submissions.*.quiz_id' => ['required', 'exists:quizzes,id'],
            'submissions.*.selected_answer' => ['nullable', 'string'],
        ]);

        $userId = Auth::id();
        $studentId = Student::where('user_id', $userId)->value('id');
        if (!$studentId) {
            return redirect()->route('login')->with('error', 'Please log in to submit quizzes.');
        }

        $firstQuizId = $request->input('submissions.0.quiz_id');
        $quiz = Quiz::with('lesson')->find($firstQuizId);
        $lessonId = $quiz->lesson->id;

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
