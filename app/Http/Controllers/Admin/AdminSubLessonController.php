<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubLesson;
use App\Http\Requests\StoreSubLessonRequest;
use App\Http\Requests\UpdateSubLessonRequest;
use App\Http\Resources\LessonResource;
use App\Http\Resources\SubLessonResource;
use App\Models\Lesson;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminSubLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subLessons = SubLesson::with('lesson')->get();

        return Inertia::render('admin/sub-lessons/index', [
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

        return Inertia::render('admin/sub-lessons/create', [
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
        try {
            $validated = $request->validated();

            SubLesson::create($validated);

            return redirect()->route('sub-lessons.index')->with('success', 'Sub lesson created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->route('sub-lessons.create')->with('error', 'Something went wrong');
        }
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
        $lessons = Lesson::all();

        return Inertia::render('admin/sub-lessons/edit', [
            'subLesson' => new SubLessonResource($subLesson),
            'lessons' => LessonResource::collection($lessons),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubLessonRequest $request, SubLesson $subLesson)
    {
        try {
            $validated = $request->validated();

            $subLesson->update($validated);

            return redirect()->route('sub-lessons.index')->with('success', 'Sub lesson updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubLesson $subLesson)
    {
        try {
            $subLesson->delete();

            return redirect()->route('sub-lessons.index')->with('success', 'Sub lesson deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Something went wrong');
        }
    }
}
