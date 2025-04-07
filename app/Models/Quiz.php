<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'options',
        'answer',
        'module_id',
    ];

    /**
     * Get the module that owns the quiz.
     * @return BelongsTo<Module, Quiz>
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    /**
     * Get the student quiz's submissions.
     * @return HasMany<Submission, Quiz>
     */
    public function studentSubmissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }
}
