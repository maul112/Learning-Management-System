<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('student/dashboard');
    }

    public function academic()
    {
        return Inertia::render('student/academic');
    }

    public function courses()
    {
        $courses = Course::with(['modules'])->get();

        return Inertia::render('student/courses', [
            'courses' => CourseResource::collection($courses),
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
        $user->load(['student.enrollments']);

        return Inertia::render('student/profile', [
            'courses' => CourseResource::collection($courses),
            'user' => new UserResource($user),
        ]);
    }
}
