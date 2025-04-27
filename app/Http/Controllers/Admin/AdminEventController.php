<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();

        return Inertia::render('admin/events/index', [
            'events' => EventResource::collection($events),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $imageUrl = $request->file('image')->store('events', 'public');
                $validated['image'] = $imageUrl;
            }

            Event::create($validated);

            return redirect()->route('events.index')->with('success', 'Event created successfully.');
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->with('error', 'Failed to create event.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('admin/events/edit', [
            'event' => new EventResource($event),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($event->image && Storage::disk('public')->exists($event->image)) {
                    Storage::disk('public')->delete($event->image);
                }
                $imageUrl = $request->file('image')->store('events', 'public');
                $validated['image'] = $imageUrl;
            }

            $event->update($validated);

            return redirect()->route('events.index')->with('success', 'Event updated successfully.');
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->with('error', 'Failed to update event.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            if ($event->image && Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            }

            $event->delete();

            return redirect()->route('events.index')->with('success', 'Event deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->with('error', 'Failed to delete event.');
        }
    }
}
