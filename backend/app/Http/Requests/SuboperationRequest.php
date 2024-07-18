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
        $rules = [
            'name' => 'required|string|max:255',
        ];
    
        if ($this->isMethod('post')) { 
            $rules['number'] = 'required|integer';
        }
    
        return $rules;
    }
}