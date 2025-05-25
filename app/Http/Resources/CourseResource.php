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
            'price' => $this->price,
            'status' => $this->status,
            'academic' => new AcademicResource($this->whenLoaded('academic')),
            'students' => UserResource::collection($this->whenLoaded('students')),
            'modules' => ModuleResource::collection($this->whenLoaded('modules')),
            'ratings' => RatingResource::collection($this->whenLoaded('ratings')),
            'is_completed' => $this->whenPivotLoaded('course_enrollments', fn() => $this->pivot->is_completed),
        ];
    }
}
