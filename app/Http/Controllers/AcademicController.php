<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicController extends Controller
{
    public function index(Course $course)
    {
        $course->with('academic');

        return Inertia::render('academics/course', [
            'course' => new CourseResource($course),
        ]);
    }
}
