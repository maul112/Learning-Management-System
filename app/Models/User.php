<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'role',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's courses as a student.
     * @return BelongsToMany<Course, User, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function studentCourses(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                Course::class,
                'course_enrollments',
                'student_id',
                'course_id'
            )
            ->withPivot('progress', 'status')
            ->withTimestamps();
    }

    /**
     * Get the user's quiz submissions as a student.
     * @return HasMany<Submission, User>
     */
    public function studentQuizSubmissions(): HasMany
    {
        return $this
            ->hasMany(
                Submission::class,
                'student_id',
                'id'
            );
    }

    /**
     * Get the user's certificates as a student.
     * @return BelongsToMany<Course, User, \Illuminate\Database\Eloquent\Relations\Pivot>
     */
    public function studentCourseCertificates(): BelongsToMany
    {
        return $this
            ->belongsToMany(
                Module::class,
                'certificates',
                'student_id',
                'module_id'
            );
    }
}
