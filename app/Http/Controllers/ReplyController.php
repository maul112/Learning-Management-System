<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReplyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'content' => 'required|string',
                'discussion_thread_id' => 'required|exists:discussion_threads,id',
            ]);

            Reply::create([
                'content' => $validated['content'],
                'discussion_thread_id' => $validated['discussion_thread_id'],
                'user_id' => $request->user()->id,
                'likes' => 0,
            ]);

            return redirect()->back()->with('success', 'Reply created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to create reply.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reply $reply)
    {
        try {
            // Check if user is authorized to update this reply
            if ($request->user()->id !== $reply->user_id && !$request->user()->admin->exists()) {
                abort(403);
            }

            $validated = $request->validate([
                'content' => 'required|string',
            ]);

            $reply->update($validated);

            return redirect()->back()->with('success', 'Reply updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to update reply.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Reply $reply)
    {
        try {
            // Check if user is authorized to delete this reply
            if ($request->user()->id !== $reply->user_id && !$request->user()->admin->exists()) {
                abort(403);
            }

            $reply->delete();

            return redirect()->back()->with('success', 'Reply deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', 'Failed to delete reply.');
        }
    }

    /**
     * Like a reply
     */
    public function like(Reply $reply)
    {
        // In a real application, you would track which users have liked which replies
        // For simplicity, we're just incrementing the likes count here
        $reply->increment('likes');

        return redirect()->back()->with('success', 'Reply liked successfully.');
    }
}
