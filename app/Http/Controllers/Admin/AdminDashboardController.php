<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $instructors_count = User::where('role', 'instructor')->count();
        $students_count = User::where('role', 'student')->count();
        $user_active_cound = User::where('status', 'active')
            ->where('role', '!=', 'admin')->count();
        $module_count = Module::count();

        return Inertia::render('dashboard', [
            'instructorsCount' => $instructors_count,
            'studentsCount' => $students_count,
            'userActiveCount' => $user_active_cound,
            'moduleCount' => $module_count
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
