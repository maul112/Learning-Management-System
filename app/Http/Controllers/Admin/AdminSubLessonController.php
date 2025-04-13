<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubLesson;
use App\Http\Requests\StoreSubLessonRequest;
use App\Http\Requests\UpdateSubLessonRequest;
use App\Http\Resources\LessonResource;
use App\Http\Resources\SubLessonResource;
use App\Models\Lesson;
use Inertia\Inertia;

class AdminSubLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subLessons = SubLesson::with('lesson')->get();

        return Inertia::render('sub-lessons/index', [
            'subLessons' => SubLessonResource::collection($subLessons),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lessons = Lesson::all();

        return Inertia::render('sub-lessons/create', [
            'lessons' => LessonResource::collection($lessons),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubLessonRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SubLesson $subLesson)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubLesson $subLesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubLessonRequest $request, SubLesson $subLesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubLesson $subLesson)
    {
        //
    }
}
