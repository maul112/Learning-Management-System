<?php

namespace Database\Seeders;

use App\Models\DiscussionThread;
use App\Models\Reply;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscussionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = Student::all();

        foreach ($students as $student) {
            $disscussion = DiscussionThread::factory()->create([
                'title' => fake()->sentence(),
                'content' => $this->generateDiscussionThread(),
                'category' => fake()->randomElement(['general', 'question', 'resource']),
                'resolved' => fake()->boolean(),
                'user_id' => $student->user->id
            ]);

            $studentReply = Student::factory(2)->create();

            foreach ($studentReply as $reply) {
                Reply::factory()->create([
                    'content' => $this->generateReply(),
                    'discussion_thread_id' => $disscussion->id,
                    'user_id' => $reply->user->id
                ]);
            }
        }
    }

    public function generateDiscussionThread(): string
    {
        $heading = '# ' . fake()->sentence;
        $subheading = '## ' . fake()->sentence;
        $paragraph = fake()->paragraphs(3, true);
        $list = collect(range(1, 5))
            ->map(fn() => '- ' . fake()->sentence)
            ->implode("\n");
        $code = "```text\nconsole.log('Hello, world!');\n```";

        return implode("\n\n", [$heading, $subheading, $paragraph, $list, $code]);
    }

    public function generateReply(): string
    {
        $paragraph = fake()->paragraphs(3, true);
        $list = collect(range(1, 5))
            ->map(fn() => '- ' . fake()->sentence)
            ->implode("\n");
        $code = "```text\nconsole.log('Hello, world!');\n```";

        return implode("\n\n", [$paragraph, $list, $code]);
    }
}
