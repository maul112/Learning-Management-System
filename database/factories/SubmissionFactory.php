<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submission>
 */
class SubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quiz = Quiz::factory()->create();
        $selectedAnswer = json_decode($quiz->options)[array_rand(json_decode($quiz->options))];

        return [
            'student_id' => Student::factory()->student(),
            'quiz_id' => $quiz->id,
            'selected_answer' => $selectedAnswer,
            'is_correct' => $selectedAnswer === $quiz->answer,
        ];
    }
}
