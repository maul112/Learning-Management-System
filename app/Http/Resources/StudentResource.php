<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
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
            'user' => new UserResource($this->whenLoaded('user')),
            'courses_enrolled' => CourseResource::collection($this->whenLoaded('enrollments')),
            'submission_histories' => SubmissionHistoryResource::collection($this->whenLoaded('submissionHistories')),
            'course_progresses' => CourseProgressResource::collection($this->whenLoaded('courseProgresses')),
            'lesson_completions' => LessonCompletionResource::collection($this->whenLoaded('lessonCompletions')),
        ];
    }
}
