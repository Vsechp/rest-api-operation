<?php
namespace App\DTO;

use App\Models\Operation;

class OperationDTO
{
    public int $id;
    public string $name;
    public string $status;
    public array $suboperations;

    public function __construct(Operation $operation)
    {
        $this->id = $operation->id;
        $this->name = $operation->name;
        $this->status = $operation->status;
        $this->suboperations = $operation->suboperations->toArray();
    }
}