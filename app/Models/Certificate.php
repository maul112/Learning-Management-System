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
        'course_id',
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

    public function course(): BelongsTo
    {
        return $this->belongsTo(
            \App\Models\Course::class,
            'course_id',
            'id'
        );
    }
}
