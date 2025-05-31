<?php

namespace Database\Factories;

use App\Models\Quiz; // Pastikan model Quiz di-import
use App\Models\Lesson; // Pastikan model Lesson di-import, karena ada foreign key
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quiz::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Contoh opsi dan jawaban
        $options = [
            $this->faker->sentence(3), // Opsi A
            $this->faker->sentence(3), // Opsi B
            $this->faker->sentence(3), // Opsi C
            $this->faker->sentence(3), // Opsi D
        ];

        // Pilih salah satu opsi sebagai jawaban yang benar
        $answer = $this->faker->randomElement($options);

        // Pastikan ada Lesson yang sudah ada di database
        // Jika belum ada lesson, ini akan membuat satu secara otomatis
        // Atau Anda bisa memastikan lesson sudah ada di seeder utama
        $lessonId = Lesson::inRandomOrder()->first()->id ?? Lesson::factory()->create()->id;

        return [
            'question' => $this->faker->sentence(6) . '?', // Contoh pertanyaan
            'options' => json_encode($options), // Simpan sebagai JSON string
            'answer' => $answer,
            'lesson_id' => $lessonId,
        ];
    }

    /**
     * Indicate that the quiz has a specific answer.
     *
     * @param string $correctAnswer
     * @return static
     */
    public function withSpecificAnswer(string $correctAnswer): static
    {
        return $this->state(fn(array $attributes) => [
            'answer' => $correctAnswer,
        ]);
    }

    /**
     * Indicate that the quiz has specific options.
     *
     * @param array $customOptions
     * @return static
     */
    public function withSpecificOptions(array $customOptions): static
    {
        return $this->state(fn(array $attributes) => [
            'options' => json_encode($customOptions),
        ]);
    }
}
