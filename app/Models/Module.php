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
        'description',
        'order',
        'duration',
        'difficulty',
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

    public function lessons(): HasMany
    {
        return $this
            ->hasMany(
                Lesson::class,
                'module_id',
                'id'
            );
    }

    /**
     * Get the course's enrolled students.
     * @return BelongsToMany<User, Course, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function students(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                User::class,
                'module_enrollments',
                'module_id',
                'student_id'
            )
            ->withPivot('progress', 'status')
            ->withTimestamps();
    }

    public function certificates(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                User::class,
                'certificates',
                'module_id',
                'student_id'
            );
    }
}
