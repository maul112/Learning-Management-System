<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'image' => fake()->imageUrl(),
            'description' => fake()->paragraph(),
            'order' => 0,
            'duration' => 0,
            'difficulty' => fake()->randomElement(['beginner', 'intermediate', 'advanced']),
            'academic_id' => 1,
        ];
    }

    public function title($title = null)
    {
        return $this->state(fn() => [
            'title' => $title,
        ]);
    }

    public function image($image = null)
    {
        return $this->state(fn() => [
            'image' => $image,
        ]);
    }

    public function description($description = null)
    {
        return $this->state(fn() => [
            'description' => $description,
        ]);
    }

    public function order($order = null)
    {
        return $this->state(fn() => [
            'order' => $order,
        ]);
    }

    public function duration($duration = null)
    {
        return $this->state(fn() => [
            'duration' => $duration,
        ]);
    }

    public function difficulty($difficulty = null)
    {
        return $this->state(fn() => [
            'difficulty' => $difficulty,
        ]);
    }

    public function academic($academic = null)
    {
        return $this->state(fn() => [
            'academic_id' => $academic,
        ]);
    }
}
