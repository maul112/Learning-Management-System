<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'lesson' => new LessonResource($this->whenLoaded('lesson')),
            'student' => new StudentResource($this->whenLoaded('student')),
            'submissions' => SubmissionResource::collection($this->whenLoaded('submissions')),
            'status' => $this->status,
            'grade' => $this->grade,
        ];
    }
}
