<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiscussionThreadRequest;
use App\Http\Requests\UpdateDiscussionThreadRequest;
use App\Http\Resources\DiscussionThreadResource;
use App\Models\DiscussionThread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDiscussionThreadRequest $request)
    {
        try {
            $validated = $request->validated();

            DiscussionThread::create([
                'title' => $validated['title'],
                'content' => $validated['content'],
                'category' => $validated['category'],
                'user_id' => $request->user()->id,
                'resolved' => false,
                'likes' => 0,
            ]);

            return redirect()->route('discussions.index')->with('success', 'Discussion created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to create discussion.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DiscussionThread $discussion)
    {
        $discussion->load(['user', 'replies.user']);

        return Inertia::render('discussions/show', [
            'discussion' => new DiscussionThreadResource($discussion),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDiscussionThreadRequest $request, DiscussionThread $discussion)
    {
        try {
            // Check if user is authorized to update this discussion
            if ($request->user()->id !== $discussion->user_id && !$request->user()->admin->exists()) {
                abort(403);
            }

            $validated = $request->validated();;

            $discussion->update($validated);

            return redirect()->back()->with('success', 'Discussion updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to update discussion.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, DiscussionThread $discussion)
    {
        try {
            // Check if user is authorized to delete this discussion
            if ($request->user()->id !== $discussion->user_id && !$request->user()->admin->exists()) {
                abort(403);
            }

            $discussion->delete();

            return redirect()->route('discussions.index')->with('success', 'Discussion deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete discussion.');
        }
    }

    /**
     * Like a discussion
     */
    public function like(DiscussionThread $discussion)
    {
        // In a real application, you would track which users have liked which discussions
        // For simplicity, we're just incrementing the likes count here
        $discussion->increment('likes');

        return redirect()->back()->with('success', 'Discussion liked successfully.');
    }
}
