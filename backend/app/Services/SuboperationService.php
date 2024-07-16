<?php

namespace App\Services;

use App\Models\Operation;
use App\Models\Suboperation;
use Illuminate\Support\Facades\Log;

class SuboperationService
{
    /**
     * Create a new suboperation.
     *
     * @param string $operationId
     * @param array $data
     * @return Suboperation
     * @throws \Exception
     */
    public function createSuboperation(string $operationId, array $data): Suboperation
    {
        Log::info("Creating suboperation", ['operationId' => $operationId, 'data' => $data]);
        $operation = Operation::findOrFail($operationId);

        if ($operation->suboperations()->where('number', $data['number'])->exists()) {
            throw new \Exception("Suboperation with number {$data['number']} already exists.");
        }
        return $operation->suboperations()->create($data);
    }

    /**
     * Update an existing suboperation.
     *
     * @param Suboperation $suboperation
     * @param array $data
     * @return Suboperation
     * @throws \Exception
     */
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

    /**
     * Delete a suboperation and reorder remaining suboperations.
     *
     * @param string $suboperationId
     * @param bool $forceDelete
     * @return void
     */
    public function deleteSuboperation(string $suboperationId, bool $forceDelete = false): void
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

    /**
     * Reorder suboperations after deletion.
     *
     * @param string $operationId
     * @return void
     */
    protected function reorderSuboperations(string $operationId): void
    {
        Log::info("Reordering suboperations", ['operationId' => $operationId]);
        $suboperations = Operation::findOrFail($operationId)->suboperations()->orderBy('number')->get();
        $number = 1;
        foreach ($suboperations as $suboperation) {
            $suboperation->update(['number' => $number++]);
        }
    }
}
