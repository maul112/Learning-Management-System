<?php

namespace App\Http\Controllers;

use App\Http\Resources\DisscussionThreadResource;
use App\Models\DiscussionThread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscussionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discussions = DiscussionThread::with(['user', 'replies.user'])
            ->latest()
            ->get();

        // Format as paginated data structure for compatibility
        $paginatedData = [
            'current_page' => 1,
            'data' => $discussions,
            'first_page_url' => route('discussions.index'),
            'from' => 1,
            'last_page' => 1,
            'last_page_url' => route('discussions.index'),
            'links' => [],
            'next_page_url' => null,
            'path' => route('discussions.index'),
            'per_page' => $discussions->count(),
            'prev_page_url' => null,
            'to' => $discussions->count(),
            'total' => $discussions->count(),
        ];

        return Inertia::render('discussions/index', [
            'discussions' => $paginatedData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|in:general,question,resource',
        ]);

        $discussion = DiscussionThread::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category' => $validated['category'],
            'user_id' => $request->user()->id,
            'resolved' => false,
            'likes' => 0,
        ]);

        return redirect()->route('discussions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(DiscussionThread $discussion)
    {
        $discussion->load(['user', 'replies.user']);

        return Inertia::render('discussions/show', [
            'discussion' => new DisscussionThreadResource($discussion),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiscussionThread $discussion)
    {
        // Check if user is authorized to update this discussion
        if ($request->user()->id !== $discussion->user_id && !$request->user()->admin->exists()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'category' => 'sometimes|string|in:general,question,resource',
            'resolved' => 'sometimes|boolean',
        ]);

        $discussion->update($validated);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, DiscussionThread $discussion)
    {
        // Check if user is authorized to delete this discussion
        if ($request->user()->id !== $discussion->user_id && !$request->user()->admin->exists()) {
            abort(403);
        }

        $discussion->delete();

        return redirect()->route('discussions.index');
    }

    /**
     * Like a discussion
     */
    public function like(DiscussionThread $discussion)
    {
        // In a real application, you would track which users have liked which discussions
        // For simplicity, we're just incrementing the likes count here
        $discussion->increment('likes');

        return redirect()->back();
    }
}
