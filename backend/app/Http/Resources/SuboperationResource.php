<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuboperationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'operation_id' => $this->operation_id,
            'number' => $this->number,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}