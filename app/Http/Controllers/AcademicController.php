<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Http\Resources\ModuleResource;
use App\Models\Course;
use App\Models\Module;
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

    public function show(Course $course, Module $module)
    {
        $module->load('lessons');

        return Inertia::render('academics/tutorials', [
            'course' => new CourseResource($course),
            'module' => new ModuleResource($module),
        ]);
    }
}
