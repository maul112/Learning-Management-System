<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseProgress extends Model
{
    /** @use HasFactory<\Database\Factories\CourseProgressFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'lessons_completed',
        'total_lessons',
        'quizzes_passed',
        'total_quizzes',
        'progress_percentage',
        'is_completed',
        'completed_at',
    ];
}
