<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    /** @use HasFactory<\Database\Factories\CertificateFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'module_id',
    ];

    /**
     * Get the user that owns the certificate.
     * @return BelongsTo<User, Certificate>
     */
    public function student(): BelongsTo
    {
        return $this
            ->belongsTo(
                \App\Models\Student::class,
                'student_id',
                'id'
            );
    }

    /**
     * Get the course that owns the certificate.
     * @return BelongsTo<Course, Certificate>
     */
    public function module(): BelongsTo
    {
        return $this
            ->belongsTo(
                \App\Models\Module::class,
                'course_id',
                'id'
            );
    }
}
