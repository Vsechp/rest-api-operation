<?php

namespace App\Http\Controllers;

use App\Models\Operation;
use App\Http\Requests\OperationRequest;
use App\Http\Resources\OperationResource;
use App\Services\OperationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\DTO\OperationQueryParametersDTO;

class OperationController extends Controller
{
    protected $operationService;

    public function __construct(OperationService $operationService)
    {
        $this->operationService = $operationService;
    }




    /**
     * Display a listing of operations.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search', null);

        $queryParams = $request->all();
        unset($queryParams['page'], $queryParams['search']);

        if ($search !== null) {
            $queryParams['name'] = $search;
        }

        $operationQueryParameters = new OperationQueryParametersDTO($queryParams);

        $operations = $this->operationService->listOperationsWithSuboperations($operationQueryParameters);

        return response()->json([
            'data' => OperationResource::collection($operations),
            'current_page' => $operations->currentPage(),
            'total' => $operations->total(),
            'per_page' => $operations->perPage(),
        ]);
    }
    /**
     * Store a newly created operation.
     *
     * @param OperationRequest $request
     * @return JsonResponse
     */
    public function store(OperationRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if (Operation::where('number', $validated['number'])->exists()) {
            return response()->json([
                'message' => 'Operation with this number already exists.',
            ], 409);
        }

        $operation = $this->operationService->createOperation($validated);
        return response()->json([
            'message' => 'Operation created successfully',
            'operation' => new OperationResource($operation)
        ], 201);
    }

    /**
     * Display the specified operation.
     *
     * @param Operation $operation
     * @return JsonResponse
     */
    public function show(Operation $operation): JsonResponse
    {
        return response()->json(new OperationResource($operation));
    }

    /**
     * Update the specified operation.
     *
     * @param OperationRequest $request
     * @param Operation $operation
     * @return JsonResponse
     */
    public function update(OperationRequest $request, Operation $operation): JsonResponse
    {
        $validated = $request->validated();

        if (Operation::where('number', $validated['number'])->where('id', '!=', $operation->id)->exists()) {
            return response()->json([
                'message' => 'Operation with this number already exists.',
            ], 409);
        }

        $operation = $this->operationService->updateOperation($operation, $validated);

        return response()->json([
            'message' => 'Operation updated successfully',
            'operation' => new OperationResource($operation)
        ], 200);
    }

    /**
     * Remove the specified operation.
     *
     * @param Operation $operation
     * @return JsonResponse
     */
    public function destroy(Operation $operation): JsonResponse
    {
        $suboperationsCount = $operation->suboperations()->count();

        if ($suboperationsCount > 0) {
            return response()->json([
                'message' => 'Cannot delete operation. Suboperations exist.'
            ], 409);
        }

        $operation->delete();

        return response()->json([
            'message' => 'Operation soft deleted'
        ], 200);
    }

    /**
     * Force delete operation.
     *
     * @param string $operationId
     * @return JsonResponse
     */
    public function forceDelete(string $operationId): JsonResponse
    {
        $operation = Operation::withTrashed()->find($operationId);

        if (!$operation) {
            return response()->json([
                'message' => 'Operation not found.'
            ], 404);
        }

        $suboperationsCount = $operation->suboperations()->count();

        if ($suboperationsCount > 0) {
            return response()->json([
                'message' => 'Cannot permanently delete operation. Suboperations exist.'
            ], 409);
        }

        $operation->forceDelete();

        return response()->json([
            'message' => 'Operation permanently deleted.'
        ], 200);
    }

    public function restore(string $operationId): JsonResponse
    {
        $operation = $this->operationService->restoreOperation($operationId);

        if ($operation) {
            return response()->json([
                'message' => 'Operation restored successfully',
                'operation' => new OperationResource($operation)
            ], 200);
        } else {
            return response()->json([
                'message' => 'Operation not found'
            ], 404);
        }
    }

    public function showDeleted(): JsonResponse
    {
        $deletedOperations = Operation::onlyTrashed()->get();
        return response()->json(OperationResource::collection($deletedOperations));
    }

}