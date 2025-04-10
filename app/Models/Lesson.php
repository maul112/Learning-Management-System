<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'module_id',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function subLessons(): HasMany
    {
        return $this->hasMany(SubLesson::class);
    }
}
