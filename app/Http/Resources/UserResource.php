<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'avatar' => $this->avatar,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'status' => $this->status,
            'instructor' => [
                'id' => $this->instructor?->id,
                'user_id' => $this->instructor?->user_id
            ],
            'student' => [
                'id' => $this->student?->id,
                'user_id' => $this->student?->user_id,
            ],
        ];
    }
}
