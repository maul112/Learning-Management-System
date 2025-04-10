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
            'order' => $this->order,
            'module_id' => $this->module_id,
            'module' => $this->module->title,
            'sub_lessons' => SubLessonResource::collection($this->subLessons),
        ];
    }
}
