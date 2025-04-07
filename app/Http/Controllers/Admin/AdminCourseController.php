<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::all();

        return Inertia::render('courses/index', [
            'courses' => CourseResource::collection($courses),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $instructors = User::where('role', 'instructor')->get();

        return Inertia::render('courses/create', [
            'instructors' => UserResource::collection($instructors),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        try {
            $validated = $request->validated();

            Course::create($validated);

            return redirect()->back()->with('success', 'Course created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        try {
            $validated = $request->validated();

            $course->update($validated);

            return redirect()->back()->with('success', 'Course updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        try {
            $course->delete();

            return redirect()->back()->with('success', 'Course deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
