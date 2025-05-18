<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicResource;
use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    public function index()
    {
        $academics = Academic::with(['courses' => function ($query) {
            $query->with(['modules']);
        }])->get();

        return Inertia::render('ratings', [
            'academics' => AcademicResource::collection($academics),
        ]);
    }
}
