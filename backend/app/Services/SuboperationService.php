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
    
        if (isset($data['number'])) {
            $existingSuboperation = $suboperation->operation->suboperations()
                ->where('number', $data['number'])
                ->where('id', '!=', $suboperation->id)
                ->first();
            if ($existingSuboperation) {
                throw new \Exception("Suboperation with number {$data['number']} already exists.");
            }
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
    public function deleteSuboperation(string $suboperationId)
    {
        $suboperation = Suboperation::findOrFail($suboperationId);
        $operationId = $suboperation->operation_id;
        
        $suboperation->delete();
        
        $remainingSuboperations = Suboperation::where('operation_id', $operationId)->orderBy('number')->get();
        foreach ($remainingSuboperations as $index => $subop) {
            $subop->number = $index + 1;
            $subop->save();
        }
        
        Log::info("Suboperation deleted", ['id' => $suboperationId]);
    }

    /**
     * Reorder suboperation numbers for the specified operation.
     *
     * @param string $operationId
     */
    public function reorderSuboperations($operationId)
    {
        $suboperations = Suboperation::where('operation_id', $operationId)->orderBy('number', 'asc')->get();
        $number = 1;
        foreach ($suboperations as $suboperation) {
            $suboperation->number = $number++;
            $suboperation->save();
        }
    }
}
