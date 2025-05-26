<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Rating;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = Student::all();
        $courses = Course::all();

        foreach ($courses as $course) {
            foreach ($students as $student) {
                CourseEnrollment::create([
                    'student_id' => $student->id,
                    'course_id' => $course->id
                ]);

                Rating::create([
                    'student_id' => $student->id,
                    'course_id' => $course->id,
                    'rating' => fake()->numberBetween(1, 5),
                    'comment' => fake()->paragraph(),
                ]);
            }
        }
    }
}
