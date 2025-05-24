<?php

namespace Database\Factories;

use App\Models\DiscussionThread;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reply>
 */
class ReplyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->paragraph(),
            'discussion_thread_id' => DiscussionThread::factory(),
            'user_id' => User::factory(),
        ];
    }
}
