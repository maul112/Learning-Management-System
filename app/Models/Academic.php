<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Academic extends Model
{
    /** @use HasFactory<\Database\Factories\AcademicFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
