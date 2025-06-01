<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\StudentResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\Student;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('student/dashboard');
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
}
