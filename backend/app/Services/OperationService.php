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
    public function listOperations(OperationQueryParametersDTO $params): LengthAwarePaginator
    {
        Log::info("Listing operations with parameters", ['params' => $params]);
        $query = Operation::query();

        if (!empty($params->filter)) {
            foreach ($params->filter as $field => $value) {
                $query->where($field, 'like', "%$value%");
            }
        }

        return $query->paginate($params->perPage, ['*'], 'page', $params->page);
    }

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

    public function createOperation(array $data): Operation
    {
        Log::info("Creating operation", ['data' => $data]);
        return Operation::create($data);
    }

    public function updateOperation(Operation $operation, array $data): Operation
    {
        Log::info("Updating operation", ['id' => $operation->id, 'data' => $data]);
        $operation->update($data);
        return $operation;
    }

    public function deleteOperation(Operation $operation): void
    {
        Log::info("Deleting operation", ['id' => $operation->id]);
        $operation->suboperations()->delete();
        $operation->delete();
    }

    public function restoreOperation(int $operationId): ?Operation
    {
        Log::info("Restoring operation", ['id' => $operationId]);
        $operation = Operation::withTrashed()->find($operationId);
        if ($operation) {
            $operation->restore();
        }
        return $operation;
    }
}