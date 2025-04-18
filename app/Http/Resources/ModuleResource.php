<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'order' => $this->order,
            'duration' => $this->duration,
            'difficulty' => $this->difficulty,
            'course_id' => $this->course_id,
            'course' => [
                'id' => $this->course->id,
                'title' => $this->course->title
            ],
            'lessons' => LessonResource::collection($this->lessons),
        ];
    }
}
