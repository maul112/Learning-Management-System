<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Module extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'video_url',
        'course_id'
    ];

    /**
     * Get the course that owns the module.
     * @return BelongsTo<Course, Module>
     */
    public function course(): BelongsTo
    {
        return $this
            ->belongsTo(
                Course::class,
                'course_id',
                'id'
            );
    }
}
