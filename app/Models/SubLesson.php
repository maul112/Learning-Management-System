<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubLesson extends Model
{
    /** @use HasFactory<\Database\Factories\SubLessonFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'order',
        'lesson_id',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
