<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
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
            'content' => $this->content,
            'order' => $this->order,
            'video' => $this->video,
            'status' => $this->status,
            'module' => [
                'id' => $this->module->id,
                'title' => $this->module->title,
                'course' => [
                    'id' => $this->module->course->id,
                    'title' => $this->module->course->title,
                    'academic' => [
                        'id' => $this->module->course->academic->id,
                        'title' => $this->module->course->academic->title
                    ]
                ]
            ],
        ];
    }
}
