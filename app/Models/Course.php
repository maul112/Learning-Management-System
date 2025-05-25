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
        'image',
        'information',
        'description',
        'order',
        'duration',
        'difficulty',
        'price',
        'status',
        'academic_id',
    ];

    public function academic(): BelongsTo
    {
        return $this
            ->belongsTo(
                \App\Models\Academic::class,
                'academic_id',
                'id'
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
                \App\Models\Module::class,
                'course_id',
                'id'
            );
    }

    public function students(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                \App\Models\Student::class,
                'course_enrollments',
                'course_id',
                'student_id'
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
                \App\Models\Student::class,
                'certificates',
                'course_id',
                'student_id'
            );
    }

    public function ratings(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\Rating::class,
                'course_id',
                'id'
            );
    }

    public function payments(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\Payment::class,
                'course_id',
                'id'
            );
    }
}
