<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubmissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'student' => new StudentResource($this->whenLoaded('student')),
            'quiz' => new QuizResource($this->whenLoaded('quiz')),
            'submission_history' => new SubmissionHistoryResource($this->whenLoaded('submissionHistory')),
            'selected_answer' => $this->selected_answer,
            'is_correct' => $this->is_correct,
        ];
    }
}
