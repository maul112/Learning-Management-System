<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RatingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'student_id' => $this->student_id,
            'course_id' => $this->course_id,
            'course' => [
                'id' => $this->course->id,
                'title' => $this->course->title
            ],
            'student' => [
                'id' => $this->student->id,
                'name' => $this->student->name
            ]
        ];
    }
}
