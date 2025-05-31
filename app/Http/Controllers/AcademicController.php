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
use GuzzleHttp\Promise\Create;
use App\Models\SubmissionHistory;
use Illuminate\Support\Facades\DB;
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

        return Inertia::render('academics/course', [
            'courses' => CourseResource::collection($courses),
            'course' => new CourseResource($course),
        ]);
    }

    public function show(Course $course, Lesson $lesson)
    {
        $courses = Course::all();
        $snapToken = null;
        if($course->price != 0) {
            $cekPayment = Payment::where([
                'course_id' => $course->id,
                'user_id' => Auth::user()->id,
            ])->first();
            // mon ghilok majer
            if(!$cekPayment) {
                $createPayment = Payment::create([
                    'payment_id' => Str::uuid(),
                    'user_id' => Auth::user()->id,
                    'course_id' => $course->id,
                    'amount' => $course->price,
                    'status' => 'pending',
                    'payment_method' => null,
                    'payment_detail' => null,
                    'paid_at' => null,
                    'expired_at' => now()->addHour(),
                ]);
                // Set your Merchant Server Key
                \Midtrans\Config::$serverKey = config('midtrans.serverKey');
                // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
                \Midtrans\Config::$isProduction = false;
                // Set sanitization on (default)
                \Midtrans\Config::$isSanitized = true;
                // Set 3DS transaction for credit card to true
                \Midtrans\Config::$is3ds = true;

                $params = array(
                    'transaction_details' => array(
                        'order_id' => $createPayment->payment_id,
                        'gross_amount' => $createPayment->amount,
                    ),
                    'customer_details' => array(
                        'name' => Auth::user()->name,
                        'email' => Auth::user()->email,
                    ),
                );

                $snapToken = \Midtrans\Snap::getSnapToken($params);
            // mon mareh majer
            } else {
                $cekUnpaidPayment = Payment::where([
                    'course_id' => $course->id,
                    'user_id' => Auth::user()->id,
                ])->first();
                $snapToken = $cekUnpaidPayment->payment_id;
            }
        }
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
            'snapToken' => $snapToken,
        ]);
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
