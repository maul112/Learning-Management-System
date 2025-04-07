<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseEnrollment extends Model
{
    /** @use HasFactory<\Database\Factories\CourseEnrollmentFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'progress',
        'status'
    ];

    /**
     * Get the course that the student is enrolled in.
     * @return BelongsTo<Course, CourseEnrollment>
     */
    public function course(): BelongsTo
    {
        return $this
            ->belongsTo(
                Course::class,
                'course_id',
            );
    }

    /**
     * Get the student that is enrolled in the course.
     * @return BelongsTo<User, CourseEnrollment>
     */
    public function student(): BelongsTo
    {
        return $this
            ->belongsTo(
                User::class,
                'student_id'
            );
    }
}
