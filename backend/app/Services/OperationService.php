<?php

namespace App\Services;

use App\Models\Operation;
use App\Models\Suboperation;
use App\DTO\OperationQueryParametersDTO;
use App\DTO\OperationDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

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
    public function createOperation(array $data, bool $isUpdate = false): Operation
    {
        try {
            if ($isUpdate) {
                $operation = Operation::find($data['id']);
                if (!$operation) {
                    throw new ModelNotFoundException('Operation not found.');
                }
                $operation->update($data);
            } else {
                if (!isset($data['number'])) {
                    throw new \InvalidArgumentException('The "number" field is required.');
                }
                if (Operation::where('number', $data['number'])->exists()) {
                    throw new \Exception('Operation with this number already exists.');
                }
                $operation = Operation::create($data);
            }
        
            return $operation;
        } catch (QueryException $e) {
            if ($e->getCode() == '23505') { // Проверьте код ошибки для вашей СУБД
                throw new \Exception('Operation with this number already exists.');
            }
            throw $e; // Перебрасываем исключение, если это не ошибка дублирования
        }
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