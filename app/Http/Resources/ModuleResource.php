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
            // 'course' => [
            //     'id' => $this->course->id,
            //     'title' => $this->course->title,
            //     'academic' => [
            //         'id' => $this->course->academic->id,
            //         'title' => $this->course->academic->title
            //     ]
            // ],
            'lessons' => LessonResource::collection($this->whenLoaded('lessons')),
        ];
    }
}
