<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'avatar' => $this->faker->imageUrl(),
            'role' => 'student',
            'status' => $this->faker->randomElement(['active', 'suspend']),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function admin()
    {
        return $this->state(fn() => ['role' => 'admin']);
    }

    public function instructor()
    {
        return $this->state(fn() => ['role' => 'instructor']);
    }

    public function student()
    {
        return $this->state(fn() => ['role' => 'student']);
    }

    public function mufid()
    {
        return $this->state(fn() => [
            'name' => 'Mufid Risqi',
            'email' => 'risqimufid50@gmail.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);
    }

    public function studentMufid()
    {
        return $this->state(fn() => [
            'name' => 'Ahmad Mufid Risqi',
            'email' => 'mufidmaxsus17@gmail.com',
            'password' => Hash::make('mufid123'),
            'email_verified_at' => now(),
            'role' => 'student',
        ]);
    }
}
