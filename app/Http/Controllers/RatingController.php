<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicResource;
use App\Http\Resources\CourseResource;
use App\Models\Academic;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        $academics = Academic::with(['courses' => function ($query) {
            $query->with(['modules']);
        }])->get();

        return Inertia::render('ratings', [
            'courses' => CourseResource::collection($courses),
            'academics' => AcademicResource::collection($academics),
        ]);
    }
}
