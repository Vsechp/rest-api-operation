<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SuboperationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'operation_id' => 'required|exists:operations,id',
            'number' => 'required|integer',
            'name' => 'required|string|max:255',
        ];
    }
}