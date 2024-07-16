<?php

namespace App\Services;

use App\Models\Operation;
use App\Models\Suboperation;
use App\DTO\OperationQueryParametersDTO;
use App\DTO\OperationDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class OperationService
{
    /**
     * List operations with pagination and filtering.
     *
     * @param OperationQueryParametersDTO $params
     * @return LengthAwarePaginator
     */
    public function listOperationsWithSuboperations(OperationQueryParametersDTO $params): LengthAwarePaginator
    {
        Log::info("Listing operations with parameters", ['params' => $params]);
        
        $query = Operation::query()
            ->with('suboperations') 
            ->when(!empty($params->filter), function ($query) use ($params) {
                foreach ($params->filter as $field => $value) {
                    $query->where($field, 'like', "%$value%");
                }
            });

        return $query->paginate($params->perPage, ['*'], 'page', $params->page);
    }

    /**
     * Get filtered operations with suboperations.
     *
     * @param array $filter
     * @return Collection
     */
    public function getFilteredOperationsWithSuboperations(array $filter): Collection
    {
        Log::info("Getting filtered operations with suboperations", ['filter' => $filter]);
        $operations = Operation::with('suboperations')
            ->when(isset($filter['name']), function ($query) use ($filter) {
                return $query->where('name', 'like', '%' . $filter['name'] . '%');
            })
            ->when(isset($filter['status']), function ($query) use ($filter) {
                return $query->where('status', $filter['status']);
            })
            ->get();
    
        return $operations->map(function ($operation) {
            return new OperationDTO($operation);
        });
    }

    /**
     * Create a new operation.
     *
     * @param array $data
     * @return Operation
     */
    public function createOperation(array $data): Operation
    {
        Log::info("Creating operation", ['data' => $data]);
        return Operation::create($data);
    }

    /**
     * Update an existing operation.
     *
     * @param Operation $operation
     * @param array $data
     * @return Operation
     */
    public function updateOperation(Operation $operation, array $data): Operation
    {
        Log::info("Updating operation", ['id' => $operation->id, 'data' => $data]);
        $operation->update($data);
        return $operation;
    }

    /**
     * Delete an operation.
     *
     * @param Operation $operation
     * @return void
     */
    public function softDeleteOperation(string $operationId): bool
    {
        Log::info("Soft deleting operation", ['id' => $operationId]);
        
        $operation = Operation::findOrFail($operationId);

        $operation->suboperations()->delete();

        return $operation->delete();
    }

        /**
     * Force deleting suboperation.
     *
     * @param string $suboperationId
     * @return bool|null
     */
    public function forceDeleteSuboperation(string $suboperationId): ?bool
    {
        Log::info("Force deleting suboperation", ['id' => $suboperationId]);
        
        $suboperation = Suboperation::findOrFail($suboperationId);
        
        return $suboperation->forceDelete();
    }

    /**
     * Restore a deleted operation.
     *
     * @param string $operationId
     * @return ?Operation
     */
    public function restoreOperation(string $operationId)
    {
        $operation = Operation::withTrashed()->find($operationId);
    
        if ($operation && $operation->trashed()) {
            $operation->restore();
            return $operation;
        }
    
        return null;
    }
}