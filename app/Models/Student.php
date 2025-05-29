<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this
            ->belongsTo(
                \App\Models\User::class,
                'user_id',
                'id'
            );
    }

    /**
     * Get the user's courses as a student.
     * @return BelongsToMany<Course, Student, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function enrollments(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                \App\Models\Course::class,
                'course_enrollments',
                'student_id',
                'course_id'
            )
            ->withPivot('is_completed')
            ->withTimestamps();
    }

    /**
     * Get the user's quiz submissions as a student.
     * @return HasMany<Submission, student>
     */
    public function studentQuizSubmissions(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\Submission::class,
                'student_id',
                'id'
            );
    }

    /**
     * Get the user's quiz submissions as a student.
     * @return HasMany<SubmissionHistory, student>
     */
    public function studentQuizSubmissionsHistory(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\SubmissionHistory::class,
                'student_id',
                'id'
            );
    }

    /**
     * Get the user's certificates as a student.
     * @return BelongsToMany<Course, student, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function studentCourseCertificates(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                \App\Models\Module::class,
                'certificates',
                'student_id',
                'module_id'
            );
    }

    /**
     * Get the user's ratings as a student.
     * @return HasMany<Rating, student>
     */
    public function studentRatings(): HasMany
    {
        return $this
            ->hasMany(
                \App\Models\Rating::class,
                'student_id',
                'id'
            );
    }
}
