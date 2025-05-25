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
    public function index(Request $request)
    {
        $courses = Course::with([
            'academic',
            'ratings',
            'modules',
            'students'
        ])->get();
        $redirect = $request->get('redirect');
        $academics = Academic::with([
            'courses' => fn($query) =>
            $query
                ->where('status', 'published')
                ->orderBy('order'),
            'courses.ratings',
            'courses.modules',
            'courses.students'
        ])
            ->get();

        if ($redirect) {
            return redirect()->route('learning-path.show', $academics[0]->id);
        }

        return Inertia::render('learning-paths/index', [
            'courses' => CourseResource::collection($courses),
            'academics' => AcademicResource::collection($academics),
        ]);
    }

    public function show(Academic $academic)
    {
        $courses = Course::all();
        $academics = Academic::where(
            'status',
            'published'
        )->get();
        $academic->load([
            'courses' => function ($query) {
                $query->where('status', 'published')->orderBy('order');
            },
            'courses.ratings',
            'courses.modules',
            'courses.students'
        ]);

        return Inertia::render('learning-paths/show', [
            'courses' => CourseResource::collection($courses),
            'academic_id' => $academic->id,
            'academic' => new AcademicResource($academic),
            'academics' => AcademicResource::collection($academics),
        ]);
    }
}
