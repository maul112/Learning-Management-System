<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Http\Resources\LessonResource;
use App\Http\Resources\QuizResource;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $query = $request->query('lesson');
        $lesson = Lesson::find($query)->load(['module.course.academic', 'quizzes']);

        return Inertia::render('admin/quizzes/create', [
            'lesson' => new LessonResource($lesson),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        try {
            $validated = $request->validated();

            $validated['options'] = json_encode($validated['options']);

            $quiz = Quiz::create($validated);

            return redirect()->route('lessons.edit', $quiz->lesson_id)->with('success', '')->with('success', 'Quiz created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to create quiz.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        $quiz = $quiz->load(['lesson.module.course.academic']);

        return Inertia::render('admin/quizzes/edit', [
            'quiz' => new QuizResource($quiz),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        try {
            $validated = $request->validated();

            $validated['options'] = json_encode($validated['options']);

            $quiz->update($validated);

            return redirect()->route('lessons.edit', $quiz->lesson_id)->with('success', 'Quiz updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to update quiz.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        try {
            $lessonId = $quiz->lesson_id;

            $quiz->delete();

            return redirect()->route('lessons.edit', $lessonId)->with('success', 'Quiz deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete quiz.');
        }
    }
}
