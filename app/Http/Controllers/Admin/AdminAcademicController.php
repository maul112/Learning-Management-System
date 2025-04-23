<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic;
use App\Http\Requests\StoreAcademicRequest;
use App\Http\Requests\UpdateAcademicRequest;
use App\Http\Resources\AcademicResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminAcademicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $academics = Academic::all();

        return Inertia::render('admin/academics/index', [
            'academics' => AcademicResource::collection($academics),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/academics/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcademicRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $imageUrl = $request->file('image')->store('academics', 'public');
                $validated['image'] = $imageUrl;
            }

            Academic::create($validated);

            return redirect()->route('academics.index')->with('success', 'Academic created successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Academic $academic)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Academic $academic)
    {
        return Inertia::render('admin/academics/edit', [
            'academic' => new AcademicResource($academic)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcademicRequest $request, Academic $academic)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($academic->image && Storage::disk('public')->exists($academic->image)) {
                    Storage::disk('public')->delete($academic->image);
                }
                $imageUrl = $request->file('image')->store('academics', 'public');
                $validated['image'] = $imageUrl;
            } else {
                unset($validated['image']);
            }

            $academic->update($validated);

            return redirect()->route('academics.index')->with('success', 'Academic updated successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Academic $academic)
    {
        try {

            if ($academic->image && Storage::disk('public')->exists($academic->image)) {
                Storage::disk('public')->delete($academic->image);
            }

            $academic->delete();

            return redirect()->route('academics.index')->with('success', 'Academic deleted successfully.');
        } catch (\Exception $e) {
            Log::error($e->getMessage());

            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
