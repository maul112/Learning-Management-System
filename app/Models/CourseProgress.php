<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    protected $casts = [
        'progress_percentage' => 'decimal:2', // Contoh cast yang sudah ada
        'is_completed' => 'boolean',           // Contoh cast yang sudah ada
        'completed_at' => 'datetime',          // <--- TAMBAHKAN BARIS INI
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Course::class);
    }
}
