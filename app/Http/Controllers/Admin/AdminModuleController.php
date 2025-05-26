<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\ModuleResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = Module::with('course')->get();

        return Inertia::render('admin/modules/index', [
            'modules' => ModuleResource::collection($modules),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $query = $request->query('course');

        $course = Course::find($query)->load(['academic', 'modules']);

        return Inertia::render('admin/modules/create', [
            'success' => session('success'),
            'error' => session('error'),
            'course' => new CourseResource($course),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModuleRequest $request)
    {
        try {
            $validated = $request->validated();

            Module::create($validated);

            return redirect()->route('courses.edit', $validated['course_id'])->with('success', 'Module created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to create module.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Module $module)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Module $module)
    {
        $courses = Course::all();
        $module->load(['course.academic', 'lessons']);

        return Inertia::render('admin/modules/edit', [
            'courses' => CourseResource::collection($courses),
            'module' => new ModuleResource($module),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModuleRequest $request, Module $module)
    {
        try {
            $validated = $request->validated();

            $module->update($validated);

            return redirect()->route('courses.edit', $module->course_id)->with('success', 'Module updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to update module.');
        }
    }

    public function updateStatus(Request $request, Module $module)
    {
        $request->validate([
            'status' => 'required|in:active,draft,published',
        ]);

        $module->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids'); // array of course IDs in new order

        foreach ($ids as $index => $id) {
            Module::where('id', $id)->update(['order' => $index + 1]);
        }

        return redirect()->back()->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module)
    {
        try {
            $module->delete();

            return redirect()->back()->with('success', 'Module deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete module.');
        }
    }
}
