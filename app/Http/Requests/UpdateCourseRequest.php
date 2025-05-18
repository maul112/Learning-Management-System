<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string',
            'image' => $this->hasFile('image') ? 'image|mimes:jpeg,png,jpg,gif|max:5000' : 'nullable',
            'information' => 'nullable|string',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'difficulty' => 'nullable|in:beginner,intermediate,advanced',
            'price' => 'nullable|integer',
            'status' => 'nullable|in:published,draft',
            'academic_id' => 'nullable|exists:academics,id',
        ];
    }
}
