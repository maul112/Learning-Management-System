<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcademicResource;
use App\Models\Academic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningPathController extends Controller
{
    public function index(Request $request)
    {
        $redirect = $request->get('redirect');
        $academics = Academic::where('status', 'published')->get();

        if ($redirect) {
            return redirect()->route('learning-path.show', $academics[0]->id);
        }

        return Inertia::render('learning-paths/index', [
            'academics' => AcademicResource::collection($academics),
        ]);
    }

    public function show(Academic $academic)
    {
        $academics = Academic::where('status', 'published')->get();
        $academic->load(['courses' => function ($query) {
            $query->where('status', 'published')->orderBy('order');
        }]);

        return Inertia::render('learning-paths/show', [
            'academic_id' => $academic->id,
            'academic' => new AcademicResource($academic),
            'academics' => AcademicResource::collection($academics),
        ]);
    }
}
