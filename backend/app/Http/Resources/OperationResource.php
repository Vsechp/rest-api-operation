<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OperationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'suboperations' => SuboperationResource::collection($this->whenLoaded('suboperations')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}