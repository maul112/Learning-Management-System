<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Academic>
 */
class AcademicFactory extends Factory
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
            'status' => fake()->randomElement(['published', 'draft']),
        ];
    }

    public function title($title = null)
    {
        return $this->state(fn() => [
            'title' => $title,
        ]);
    }

    public function description($description = null)
    {
        return $this->state(fn() => [
            'description' => $description,
        ]);
    }

    public function image($imageUrl = null)
    {
        return $this->state(fn() => [
            'image' => $imageUrl,
        ]);
    }
}
