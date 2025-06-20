<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'options',
        'answer',
        'lesson_id',
    ];

    /**
     * Get the lesson that owns the quiz.
     * @return BelongsTo<Lesson, Quiz>
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Lesson::class);
    }

    /**
     * Get the student quiz's submissions.
     * @return HasMany<Submission, Quiz>
     */
    public function studentSubmissions(): HasMany
    {
        return $this->hasMany(\App\Models\Submission::class);
    }
}
