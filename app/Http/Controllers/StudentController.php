<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('student/dashboard');
    }

    public function academic()
    {
        return Inertia::render('student/academic');
    }
}
