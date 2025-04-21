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
            'description' => $this->description,
            'order' => $this->order,
            'duration' => $this->duration,
            'difficulty' => $this->difficulty,
            'academic' => [
                'id' => $this->academic->id,
                'title' => $this->academic->title
            ],
            'modules' => ModuleResource::collection($this->modules),
        ];
    }
}
