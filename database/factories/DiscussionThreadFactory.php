<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DiscussionThread>
 */
class DiscussionThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement(['general', 'question', 'announcement']),
            'likes' => $this->faker->numberBetween(0, 100),
            'resolved' => $this->faker->boolean(),
            'user_id' => User::factory(),
        ];
    }
}
