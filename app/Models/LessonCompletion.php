<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonCompletion extends Model
{
    /** @use HasFactory<\Database\Factories\LessonCompletionFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'lesson_id',
        'completed_at',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(
            \App\Models\Student::class,
            'student_id',
            'id'
        );
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(
            \App\Models\Lesson::class,
            'lesson_id',
            'id'
        );
    }
}
