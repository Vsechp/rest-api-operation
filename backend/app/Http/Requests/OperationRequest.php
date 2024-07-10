<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OperationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:255',
        ];
        
        if ($this->isMethod('post')) {
            $rules['number'] = 'required|integer|unique:operations,number';
        } elseif ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['number'] = [
                'required',
                'integer',
                Rule::unique('operations', 'number')->ignore($this->operation),
            ];
        }

        return $rules;
    }
}