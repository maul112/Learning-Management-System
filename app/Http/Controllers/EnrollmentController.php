<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function index()
    {
        return view('test', [
            'user' => Auth::user(),
            
        ]);
    }
    
    public function store(Request $request)
    {
        dd($request->all());
    }

    public function show()
    {
        
        // return view('showTest', compact('snapToken'));
    }
}
