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
            'order' => $this->order,
            'status' => $this->status,
            'course' => new CourseResource($this->whenLoaded('course')),
            'lessons' => LessonResource::collection($this->whenLoaded('lessons')),
        ];
    }
}
