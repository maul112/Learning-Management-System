<?php

namespace Database\Factories;

use App\Models\Module;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $options = [
            $this->faker->word(),
            $this->faker->word(),
            $this->faker->word(),
            $this->faker->word(),
        ];
        return [
            'question' => $this->faker->sentence(),
            'options' => json_encode($options),
            'answer' => $options[array_rand($options)],
            'module_id' => Module::factory(),
        ];
    }
}
