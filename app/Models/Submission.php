<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submission extends Model
{
    /** @use HasFactory<\Database\Factories\SubmissionFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'quiz_id',
        'submission_history_id',
        'selected_answer',
        'is_correct',
    ];

    /**
     * Get the student that submitted the quiz.
     * @return BelongsTo<student, Submission>
     */
    public function student(): BelongsTo
    {
        return $this
            ->belongsTo(
                Student::class,
                'student_id'
            );
    }

    /**
     * Get the quiz that was submitted.
     * @return BelongsTo<Quiz, Submission>
     */
    public function quiz(): BelongsTo
    {
        return $this
            ->belongsTo(
                Quiz::class,
                'quiz_id'
            );
    }

    public function submissionHistory(): BelongsTo
    {
        return $this
            ->belongsTo(
                SubmissionHistory::class,
                'submission_history_id'
            );
    }
}
