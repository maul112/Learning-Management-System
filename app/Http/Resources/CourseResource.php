<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'image' => $this->image,
            'information' => $this->information,
            'description' => $this->description,
            'order' => $this->order,
            'duration' => $this->duration,
            'difficulty' => $this->difficulty,
            'type' => $this->type,
            'academic' => [
                'id' => $this->academic->id,
                'title' => $this->academic->title,
            ],
            'ratings' => RatingResource::collection($this->ratings),
            'modules' => ModuleResource::collection($this->modules),
            'students' => UserResource::collection($this->students)
        ];
    }
}
