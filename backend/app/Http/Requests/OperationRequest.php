<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OperationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'number' => 'required|integer|unique:operations,number,' . $this->route('operation'),
            'name' => 'required|string|max:255',
        ];
    }
}