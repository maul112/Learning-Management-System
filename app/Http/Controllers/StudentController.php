<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\UserResource;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseProgress;
use App\Models\Student;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $student = Student::where('user_id', '=', $user->id)
            ->with([
                'user',
                'enrollments',
                // 'enrollments.course.academic',
                // 'enrollments.course.modules.lessons',
                // 'enrollments.course.students.user',
                // 'enrollments.ratings',
                'courseProgresses.course',
            ])
            ->first();

        return Inertia::render('student/dashboard', [
            'student' => new StudentResource($student),
        ]);
    }

    public function academic()
    {
        $user = Auth::user();

        $student = Student::where('user_id', '=', $user->id)
            ->with([
                'user',
                'enrollments',
                // 'enrollments.course.academic',
                // 'enrollments.course.modules.lessons',
                // 'enrollments.course.students.user',
                // 'enrollments.ratings',
                'courseProgresses.course',
            ])
            ->first();

        return Inertia::render('student/academic', [
            'student' => new StudentResource($student),
        ]);
    }

    public function edit(Request $request)
    {
        $courses = Course::all();

        return Inertia::render('student/settings/profile', [
            'courses' => CourseResource::collection($courses),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function editPassword(Request $request)
    {
        $courses = Course::all();
        return Inertia::render('student/settings/password', [
            'courses' => CourseResource::collection($courses),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function profile(User $user)
    {
        $courses = Course::all();
        $user->load([
            'student.enrollments.ratings',
            'student.enrollments.modules',
            'student.enrollments.students'
        ]);

        return Inertia::render('student/profile', [
            'courses' => CourseResource::collection($courses),
            'user' => new UserResource($user),
        ]);
    }

    public function getCertificateData(Course $course): JsonResponse
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->with(['user'])->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found.'], 404);
        }

        // Muat progress kursus yang relevan untuk siswa ini
        $courseProgress = CourseProgress::where('student_id', $student->id)
            ->where('course_id', $course->id)
            ->first();

        // Pastikan kursus telah diselesaikan sebelum melanjutkan
        if (!$courseProgress || !$courseProgress->is_completed) {
            return response()->json(['message' => 'Course not completed or certificate not available.'], 403);
        }

        // --- LOGIKA UTAMA: Cari atau Buat Record Certificate ---
        // firstOrCreate akan mencari record berdasarkan atribut pertama (student_id, course_id).
        // Jika tidak ditemukan, ia akan membuat record baru dan mengembalikan instance-nya.
        // Karena `fillable` Anda di model Certificate hanya 'student_id' dan 'course_id',
        // Anda tidak perlu argumen kedua di firstOrCreate kecuali ada kolom lain yang ingin diisi saat pembuatan.
        $certificate = Certificate::firstOrCreate(
            [
                'student_id' => $student->id,
                'course_id' => $course->id,
            ]
            // Argumen kedua di sini adalah nilai tambahan untuk pembuatan record jika belum ada.
            // Contoh: ['issue_date' => now()] jika Anda punya kolom 'issue_date' di tabel certificates
        );

        // --- Data yang akan dikirim ke frontend React ---
        $certificateData = [
            'certificateId' => $certificate->id, // ID dari record Certificate yang dibuat/ditemukan
            'studentName' => $student->user->name, // Asumsi relasi user ada di model Student
            'courseTitle' => $course->title,
            // Tanggal penyelesaian kursus diambil dari progress kursus
            'completionDate' => $courseProgress->completed_at ? $courseProgress->completed_at->format('F d, Y') : null,
            // Anda juga bisa menggunakan tanggal pembuatan record sertifikat sebagai 'issueDate'
            'issueDate' => $certificate->created_at ? $certificate->created_at->format('F d, Y') : null,
            // Tambahkan data lain yang mungkin relevan untuk sertifikat
            'courseDuration' => $course->duration ?? 'N/A', // Asumsi ada kolom duration_in_hours di Course
        ];

        return response()->json($certificateData);
    }
}
