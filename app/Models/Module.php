<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'status',
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
                \App\Models\Course::class,
                'course_id',
                'id'
            );
    }

    public function lessons(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\Lesson::class,
                'module_id',
                'id'
            );
    }

    public function certificates(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                \App\Models\User::class,
                'certificates',
                'module_id',
                'student_id'
            );
    }
}
