<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuboperationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'number' => 'required|integer',
            'name' => 'required|string|max:255',
        ];
    }
}