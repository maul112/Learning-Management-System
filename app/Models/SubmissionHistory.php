<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubmissionHistory extends Model
{
    /** @use HasFactory<\Database\Factories\SubmissionHistoryFactory> */
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'student_id',
        'status',
        'grade',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Lesson::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(\App\Models\Submission::class);
    }
}
