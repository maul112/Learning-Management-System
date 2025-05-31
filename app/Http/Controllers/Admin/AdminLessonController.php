<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminLessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::with(['module'])->get();

        return Inertia::render('admin/lessons/index', [
            'lessons' => LessonResource::collection($lessons),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $query = $request->query('module');
        $module = Module::find($query)->load(['course.academic', 'lessons']);

        return Inertia::render('admin/lessons/create', [
            'module' => new ModuleResource($module),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        try {
            $validated = $request->validated();

            Lesson::create($validated);

            return redirect()->route('lessons.index')->with('success', 'Lesson created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to create lesson.');
        }
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
        $lesson->load(['module.course.academic', 'quizzes']);

        return Inertia::render('admin/lessons/edit', [
            'lesson' => new LessonResource($lesson),
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        try {
            $validated = $request->validated();

            $lesson->update($validated);

            return redirect()->route('modules.edit', $lesson->module_id)->with('success', 'Lesson updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to update lesson.');
        }
    }

    public function updateStatus(Request $request, Lesson $lesson)
    {
        $request->validate([
            'status' => 'required|in:active,draft,published',
        ]);

        $lesson->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids'); // array of course IDs in new order

        foreach ($ids as $index => $id) {
            Lesson::where('id', $id)->update(['order' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        try {
            $lesson->delete();

            return redirect()->back()->with('success', 'Lesson deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete lesson.');
        }
    }
}
