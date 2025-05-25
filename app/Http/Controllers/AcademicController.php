<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Models\Course;
use App\Models\Lesson;
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

    public function show(Course $course, Lesson $lesson)
    {
        $lesson->load('module');

        return Inertia::render('academics/tutorials', [
            'course' => new CourseResource($course),
            'lesson' => new LessonResource($lesson),
        ]);
    }
}
