<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Module;
use App\Models\Quiz;
use App\Models\Submission;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat 1 Admin
        User::factory()->admin()->mufid()->create();

        Quiz::factory(5)->create();

        CourseEnrollment::factory(5)->create();

        Submission::factory(5)->create();

        Certificate::factory(5)->create();
    }
}
