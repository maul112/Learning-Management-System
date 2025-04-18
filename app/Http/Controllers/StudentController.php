<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
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
        $courses = Course::with(['instructor', 'modules'])->get();

        return Inertia::render('student/courses', [
            'courses' => CourseResource::collection($courses),
        ]);
    }
}
