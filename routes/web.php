<?php

use App\Http\Controllers\AcademicController;
use App\Http\Controllers\Admin\AdminAcademicController;
use App\Http\Controllers\Admin\AdminCourseController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminLessonController;
use App\Http\Controllers\Admin\AdminModuleController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\LearningPathController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsStudent;
use App\Http\Resources\AcademicResource;
use App\Http\Resources\CourseResource;
use App\Models\Academic;
use App\Models\Course;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $academics = Academic::with(['courses'])->get();
    $courses = Course::all();
    return Inertia::render('welcome', [
        'academics' => AcademicResource::collection($academics),
        'courses' => CourseResource::collection($courses),
    ]);
})->name('home');

Route::controller(LearningPathController::class)->group(function () {
    Route::get('/learning-paths', 'index')
        ->name('learning-path.index');
    Route::get('/learning-paths/{academic}', 'show')
        ->name('learning-path.show');
});

Route::controller(AcademicController::class)->group(function () {
    Route::get('/academies/{course}', 'index')
        ->name('academics.index');
    Route::get('/academies/{course}/tutorials/{lesson}', 'show')
        ->name('academics.show')
        ->middleware(['auth', IsStudent::class]);
});

Route::controller(RatingController::class)->group(function () {
    Route::get('/ratings', 'index')
        ->name('ratings.index');
});

Route::middleware(['auth', 'verified', IsAdmin::class])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])
        ->name('dashboard');
    Route::resource('users', AdminUserController::class);
    Route::resource('academics', AdminAcademicController::class);
    Route::resource('courses', AdminCourseController::class);
    Route::resource('modules', AdminModuleController::class);
    Route::resource('lessons', AdminLessonController::class);
    Route::put('/academics/{academic}/status', [AdminAcademicController::class, 'updateStatus'])
        ->name('academics.updateStatus');
    Route::put('/courses/{course}/status', [AdminCourseController::class, 'updateStatus'])
        ->name('courses.updateStatus');
    Route::post('/courses/reorder', [AdminCourseController::class, 'reorder'])
        ->name('courses.reorder');
    Route::put('/modules/{module}/status', [AdminModuleController::class, 'updateStatus'])
        ->name('modules.updateStatus');
    Route::post('/modules/reorder', [AdminModuleController::class, 'reorder'])
        ->name('modules.reorder');
    Route::put('/lessons/{lesson}/status', [AdminLessonController::class, 'updateStatus'])
        ->name('lessons.updateStatus');
    Route::post('/lessons/reorder', [AdminLessonController::class, 'reorder'])
        ->name('lessons.reorder');
});

Route::middleware(['auth', 'verified', IsStudent::class])->prefix('student')->group(function () {
    Route::get('dashboard', [StudentController::class, 'index'])
        ->name('student.dashboard');
    Route::get('academic', [StudentController::class, 'academic'])
        ->name('student.academic');
    Route::get('courses', [StudentController::class, 'courses'])
        ->name('student.courses');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('discussions', DiscussionController::class);
    Route::post('discussions/{discussionthread}/like', [DiscussionController::class, 'like'])->name('discussions.like');
    Route::resource('replies', ReplyController::class);
    Route::post('replies/{reply}/like', [ReplyController::class, 'like'])->name('replies.like');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
