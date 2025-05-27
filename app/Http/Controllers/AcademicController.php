<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\ModuleResource;
use App\Models\Course;
use App\Models\Lesson;
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
}
