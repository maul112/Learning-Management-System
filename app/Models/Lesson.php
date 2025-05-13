<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'order',
        'video',
        'status',
        'module_id',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Module::class);
    }

    public function quiz(): HasOne
    {
        return $this->hasOne(\App\Models\Quiz::class);
    }
}
