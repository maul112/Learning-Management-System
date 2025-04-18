<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'instructor_id',
    ];

    /**
     * Get the user that instructs the course.
     * @return BelongsTo<User, Course>
     */
    public function instructor(): BelongsTo
    {
        return $this
            ->belongsTo(
                User::class,
                'instructor_id'
            );
    }

    /**
     * Get the course's modules.
     * @return HasMany<Module, Course>
     */
    public function modules(): HasMany
    {
        return $this
            ->hasMany(
                Module::class,
                'course_id',
                'id'
            );
    }


    /**
     * Get the course's certificates.
     * @return BelongsToMany<User, Course, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function studentCourseCertificates(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                User::class,
                'certificates',
                'course_id',
                'student_id'
            );
    }
}
