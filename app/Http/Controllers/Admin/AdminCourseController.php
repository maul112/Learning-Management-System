<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AcademicResource;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use App\Models\Academic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $academic = $request->query('academic');

        $courses = Course::where('academic_id', $academic)->with('academic')->get();

        return Inertia::render('admin/courses/index', [
            'courses' => CourseResource::collection($courses),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $query = $request->query('academic');

        $academic = Academic::find($query);

        return Inertia::render('admin/courses/create', [
            'success' => session('success'),
            'error' => session('error'),
            'academic' => new AcademicResource($academic),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $imageUrl = $request->file('image')->store('courses', 'public');
                $validated['image'] = $imageUrl;
            }

            $course = Course::create($validated);

            return redirect()->route('academics.edit', $course->academic_id)->with('success', 'Course created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Course created failed.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $academics = Academic::all();

        return Inertia::render('admin/courses/edit', [
            'academics' => AcademicResource::collection($academics),
            'course' => new CourseResource($course),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($course->image && Storage::disk('public')->exists($course->image)) {
                    Storage::disk('public')->delete($course->image);
                }
                $imageUrl = $request->file('image')->store('courses', 'public');
                $validated['image'] = $imageUrl;
            } else {
                unset($validated['image']);
            }

            $course->update($validated);

            return redirect()->back()->with('success', 'Course updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function updateStatus(Request $request, Course $course)
    {
        $request->validate([
            'status' => 'required|in:active,draft,published',
        ]);

        $course->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function reorder(Request $request)
    {
        $ids = $request->input('ids'); // array of course IDs in new order

        foreach ($ids as $index => $id) {
            Course::where('id', $id)->update(['order' => $index + 1]);
        }

        return response()->json(['message' => 'Order updated successfully.']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        try {
            if ($course->image && Storage::disk('public')->exists($course->image)) {
                Storage::disk('public')->delete($course->image);
            }

            $course->delete();

            return redirect()->back()->with('success', 'Course deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
