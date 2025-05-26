<?php

namespace Database\Seeders;

use App\Models\Academic;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Android Developer',
                'image' => '/academics/android.jpg',
                'description' => 'Kurikulum didesain dengan persetujuan dari Tim Google Android untuk mempersiapkan developer Android standar Global. Dicoding adalah Google Developer Authorized Training Partner.',
                'courses' => [
                    [
                        'title' => 'Memulai Pemrograman dengan Kotlin',
                        'image' => '/courses/android.jpg',
                        'information' => 'Langkah pertama untuk menjadi seorang Android Developer dengan mempelajari bahasa yang direkomendasikan oleh Google.',
                        'description' => $this->generateDescription(),
                        'order' => 1,
                        'duration' => 50,
                        'difficulty' => 'beginner',
                        'academic_id' => 1,
                    ],
                    [
                        'title' => 'Belajar Membuat Aplikasi Android untuk Pemula',
                        'image' => '/courses/android.jpg',
                        'information' => 'Buat aplikasi pertamamu dengan memahami dasar-dasar membuat tampilan dan logika aplikasi.',
                        'description' => $this->generateDescription(),
                        'order' => 2,
                        'duration' => 60,
                        'difficulty' => 'beginner',
                        'academic_id' => 1,
                    ],
                    [
                        'title' => 'Belajar Fundamental Aplikasi Android',
                        'image' => '/courses/android.jpg',
                        'information' => 'Perdalam keahlianmu di dunia pemrograman Android dengan mempelajari cara membuat aplikasi yang dapat mengambil data dari server dan menyimpannya ke dalam database.',
                        'description' => $this->generateDescription(),
                        'order' => 3,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 1,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Android Intermediate',
                        'image' => '/courses/android.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Android Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 4,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 1,
                    ]
                ]
            ],
            [
                'title' => 'Back-End Developer',
                'image' => '/academics/backend.jpg',
                'description' => 'Kurikulum disusun oleh Dicoding bersama AWS beserta pelaku industri Back-End Development. Siswa dipersiapkan untuk menjadi Back-End Developer dengan JavaScript sesuai kebutuhan industri.',
                'courses' => [
                    [
                        'title' => 'Belajar Membuat Aplikasi Back-End untuk Pemula',
                        'image' => '/courses/backend.jpg',
                        'information' => 'Buat aplikasi pertamamu dengan memahami dasar-dasar membuat tampilan dan logika aplikasi.',
                        'description' => $this->generateDescription(),
                        'order' => 1,
                        'duration' => 50,
                        'difficulty' => 'beginner',
                        'academic_id' => 2,
                    ],
                    [
                        'title' => 'Belajar Fundamental Aplikasi Back-End',
                        'image' => '/courses/backend.jpg',
                        'information' => 'Perdalam keahlianmu di dunia pemrograman Back-End dengan mempelajari cara membuat aplikasi yang dapat mengambil data dari server dan menyimpannya ke dalam database.',
                        'description' => $this->generateDescription(),
                        'order' => 2,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 2,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Back-End Intermediate',
                        'image' => '/courses/backend.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Back-End Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 3,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 2,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Back-End Expert',
                        'image' => '/courses/backend.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Back-End Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 4,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 2,
                    ]
                ]
            ],
            [
                'title' => 'Front-End Developer',
                'image' => '/academics/frontend.jpg',
                'description' => 'Kurikulum disusun oleh Dicoding dan pelaku industri di bidang Web Development. Siswa dipersiapkan untuk menjadi Front-End Web Developer sesuai standar kebutuhan industri.',
                'courses' => [
                    [
                        'title' => 'Belajar Membuat Aplikasi Front-End untuk Pemula',
                        'image' => '/courses/frontend.jpg',
                        'information' => 'Buat aplikasi pertamamu dengan memahami dasar-dasar membuat tampilan dan logika aplikasi.',
                        'description' => $this->generateDescription(),
                        'order' => 1,
                        'duration' => 50,
                        'difficulty' => 'beginner',
                        'academic_id' => 3,
                    ],
                    [
                        'title' => 'Belajar Fundamental Aplikasi Front-End',
                        'image' => '/courses/frontend.jpg',
                        'information' => 'Perdalam keahlianmu di dunia pemrograman Front-End dengan mempelajari cara membuat aplikasi yang dapat mengambil data dari server dan menyimpannya ke dalam database.',
                        'description' => $this->generateDescription(),
                        'order' => 2,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 3,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Front-End Intermediate',
                        'image' => '/courses/frontend.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Front-End Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 3,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 3,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Front-End Expert',
                        'image' => '/courses/frontend.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Front-End Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 4,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 3,
                    ]
                ]
            ],
            [
                'title' => 'iOS Developer',
                'image' => '/academics/ios.jpg',
                'description' => 'Kurikulum disusun oleh Dicoding dan pelaku industri di bidang iOS Development. Siswa dipersiapkan untuk menjadi iOS Developer sesuai standar kebutuhan industri.',
                'courses' => [
                    [
                        'title' => 'Belajar Membuat Aplikasi iOS untuk Pemula',
                        'image' => '/courses/ios.jpg',
                        'information' => 'Buat aplikasi pertamamu dengan memahami dasar-dasar membuat tampilan dan logika aplikasi.',
                        'description' => $this->generateDescription(),
                        'order' => 1,
                        'duration' => 50,
                        'difficulty' => 'beginner',
                        'academic_id' => 4,
                    ],
                    [
                        'title' => 'Belajar Fundamental Aplikasi iOS',
                        'image' => '/courses/ios.jpg',
                        'information' => 'Perdalam keahlianmu di dunia pemrograman iOS dengan mempelajari cara membuat aplikasi yang dapat mengambil data dari server dan menyimpannya ke dalam database.',
                        'description' => $this->generateDescription(),
                        'order' => 2,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 4,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi iOS Intermediate',
                        'image' => '/courses/ios.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate iOS Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 3,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 4,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi iOS Expert',
                        'image' => '/courses/ios.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate iOS Developer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 4,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 4,
                    ]
                ]
            ],
            [
                'title' => 'Machine Learning Engineer',
                'image' => '/academics/mc.jpg',
                'description' => 'Kurikulum lengkap yang disusun oleh Dicoding bersama IBM beserta pelaku industri. Siswa dipersiapkan untuk menjadi Machine Learning Engineer sesuai standar kebutuhan industri.',
                'courses' => [
                    [
                        'title' => 'Belajar Membuat Aplikasi Machine Learning untuk Pemula',
                        'image' => '/courses/mc.jpg',
                        'information' => 'Buat aplikasi pertamamu dengan memahami dasar-dasar membuat tampilan dan logika aplikasi.',
                        'description' => $this->generateDescription(),
                        'order' => 1,
                        'duration' => 50,
                        'difficulty' => 'beginner',
                        'academic_id' => 5,
                    ],
                    [
                        'title' => 'Belajar Fundamental Aplikasi Machine Learning',
                        'image' => '/courses/mc.jpg',
                        'information' => 'Perdalam keahlianmu di dunia pemrograman Machine Learning dengan mempelajari cara membuat aplikasi yang dapat mengambil data dari server dan menyimpannya ke dalam database.',
                        'description' => $this->generateDescription(),
                        'order' => 2,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 5,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Machine Learning Intermediate',
                        'image' => '/courses/mc.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Machine Learning Engineer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 3,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 5,
                    ],
                    [
                        'title' => 'Belajar Pengembangan Aplikasi Machine Learning Expert',
                        'image' => '/courses/mc.jpg',
                        'information' => 'Perdalam keahlian untuk menjadi Associate Machine Learning Engineer yang fokus pada pengalaman pengguna yang lebih baik.',
                        'description' => $this->generateDescription(),
                        'order' => 4,
                        'duration' => 150,
                        'difficulty' => 'intermediate',
                        'academic_id' => 5,
                    ]
                ]
            ]
        ];

        foreach ($data as $item) {
            Academic::create([
                'title' => $item['title'],
                'image' => $item['image'],
                'description' => $item['description'],
                'status' => 'published',
            ]);

            foreach ($item['courses'] as $course) {
                $course = Course::create([
                    'title' => $course['title'],
                    'image' => $course['image'],
                    'information' => $course['information'],
                    'description' => $course['description'],
                    'order' => $course['order'],
                    'duration' => $course['duration'],
                    'difficulty' => $course['difficulty'],
                    'price' => $course['order'] > 1 ? fake()->randomFloat(2, 0, 100) : 0,
                    'status' => 'published',
                    'academic_id' => $course['academic_id'],
                ]);

                for ($i = 0; $i < fake()->numberBetween(1, 3); $i++) {
                    $module = Module::create([
                        'title' => fake()->sentence(1),
                        'order' => $i + 1,
                        'status' => fake()->randomElement(['published', 'draft']),
                        'course_id' => $course->id
                    ]);

                    for ($j = 0; $j < fake()->numberBetween(1, 3); $j++) {
                        Lesson::create([
                            'title' => fake()->sentence(2),
                            'content' => $this->generateMarkdownContent(),
                            'video' => fake()->imageUrl(),
                            'order' => $j + 1,
                            'status' => fake()->randomElement(['published', 'draft']),
                            'module_id' => $module->id
                        ]);
                    }
                }
            }
        }
    }

    public function generateMarkdownContent(): string
    {
        $heading = '# ' . fake()->sentence;
        $subheading = '## ' . fake()->sentence;
        $paragraph = fake()->paragraphs(3, true);
        $list = collect(range(1, 5))
            ->map(fn() => '- ' . fake()->sentence)
            ->implode("\n");
        $code = '```
        javascript
            console.log("Hello, world!");
        ```';

        return implode("\n\n", [$heading, $subheading, $paragraph, $list, $code]);
    }

    public function generateDescription(): string
    {
        $heading = '# ' . fake()->sentence;
        $subheading = '## ' . fake()->sentence;
        $paragraph = fake()->paragraphs(3, true);
        $list = collect(range(1, 5))
            ->map(fn() => '- ' . fake()->sentence)
            ->implode("\n");

        return implode("\n\n", [$heading, $subheading, $paragraph, $list]);
    }
}
