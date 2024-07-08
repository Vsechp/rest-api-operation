<?php
namespace App\Services;

use App\Models\Operation;
use App\Models\Suboperation;
use Illuminate\Support\Facades\Log;

class SuboperationService
{
    public function createSuboperation(int $operationId, array $data): Suboperation
    {
        Log::info("Creating suboperation", ['operationId' => $operationId, 'data' => $data]);
        $operation = Operation::findOrFail($operationId);

        if ($operation->suboperations()->where('number', $data['number'])->exists()) {
            throw new \Exception("Suboperation with number {$data['number']} already exists.");
        }
        return $operation->suboperations()->create($data);
    }

    public function updateSuboperation(Suboperation $suboperation, array $data): Suboperation
    {
        Log::info("Updating suboperation", ['id' => $suboperation->id, 'data' => $data]);

        $existingSuboperation = $suboperation->operation->suboperations()
            ->where('number', $data['number'])
            ->where('id', '!=', $suboperation->id)
            ->first();
        if ($existingSuboperation) {
            throw new \Exception("Suboperation with number {$data['number']} already exists.");
        }
        $suboperation->update($data);
        return $suboperation;
    }

    public function deleteSuboperation(int $suboperationId, bool $forceDelete = false): void
    {
        Log::info("Deleting suboperation", ['id' => $suboperationId, 'forceDelete' => $forceDelete]);
        $suboperation = Suboperation::withTrashed()->findOrFail($suboperationId);
        if ($forceDelete) {
            $suboperation->forceDelete();
        } else {
            $suboperation->delete();
        }
        $this->reorderSuboperations($suboperation->operation_id);
    }

    protected function reorderSuboperations(int $operationId): void
    {
        Log::info("Reordering suboperations", ['operationId' => $operationId]);
        $suboperations = Operation::findOrFail($operationId)->suboperations()->orderBy('number')->get();
        $number = 1;
        foreach ($suboperations as $suboperation) {
            $suboperation->update(['number' => $number++]);
        }
    }
}