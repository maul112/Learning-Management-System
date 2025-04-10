<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Inertia\Inertia;

class AdminLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::with('module', 'subLessons')->get();

        return Inertia::render('lessons/index', [
            'lessons' => LessonResource::collection($lessons)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $modules = Module::all();

        return Inertia::render('lessons/create', [
            'modules' => ModuleResource::collection($modules),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
