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
            'module' => new ModuleResource($this->whenLoaded('module')),
            'quizes' => QuizResource::collection($this->whenLoaded('quizes')),
        ];
    }
}
