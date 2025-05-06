<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicResource;
use App\Http\Resources\CourseResource;
use App\Models\Academic;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningPathController extends Controller
{
    public function index()
    {
        $academics = Academic::all();

        return redirect()->route('learning-path.show', $academics[0]->id);
    }

    public function show(Academic $academic)
    {
        $academics = Academic::all();
        $academic->with('courses');
        $courses = Course::all();

        return Inertia::render('learning-path', [
            'academic_id' => $academic->id,
            'academic' => new AcademicResource($academic),
            'academics' => AcademicResource::collection($academics),
            'courses' => CourseResource::collection($courses),
        ]);
    }
}
