<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat 1 Admin
        $user = User::factory()->admin()->mufid()->create();
        Admin::factory()->create([
            'user_id' => $user->id
        ]);

        Student::factory(50)->create();
    }
}
