<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ModuleEnrollment extends Model
{
    /** @use HasFactory<\Database\Factories\CourseEnrollmentFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'module_id',
    ];

    /**
     * Get the course that the student is enrolled in.
     * @return BelongsTo<Course, ModuleEnrollment>
     */
    public function module(): BelongsTo
    {
        return $this
            ->belongsTo(
                Module::class,
                'course_id',
            );
    }

    /**
     * Get the student that is enrolled in the course.
     * @return BelongsTo<User, ModuleEnrollment>
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
