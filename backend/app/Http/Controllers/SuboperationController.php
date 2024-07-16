<?php

namespace App\Http\Controllers;

use App\Models\Suboperation;
use App\Http\Requests\SuboperationRequest;
use App\Http\Resources\SuboperationResource;
use App\Services\SuboperationService;
use Illuminate\Http\JsonResponse;

class SuboperationController extends Controller
{
    protected $suboperationService;

    public function __construct(SuboperationService $suboperationService)
    {
        $this->suboperationService = $suboperationService;
    }

    /**
     * Display a listing of suboperations.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $suboperations = Suboperation::paginate();
        return response()->json(SuboperationResource::collection($suboperations));
    }

    /**
     * Store a newly created suboperation.
     *
     * @param SuboperationRequest $request
     * @param string $operationId
     * @return JsonResponse
     */
    public function store(SuboperationRequest $request, string $operationId): JsonResponse
    {
        $validatedData = $request->validated();
        $validatedData['operation_id'] = $operationId;
    
        $suboperation = $this->suboperationService->createSuboperation($operationId, $validatedData);
        return response()->json(new SuboperationResource($suboperation), 201);
    }

    /**
     * Display the specified suboperation.
     *
     * @param Suboperation $suboperation
     * @return JsonResponse
     */
    public function show(Suboperation $suboperation): JsonResponse
    {
        return response()->json(new SuboperationResource($suboperation));
    }

    /**
     * Update the specified suboperation.
     *
     * @param SuboperationRequest $request
     * @param Suboperation $suboperation
     * @return JsonResponse
     */
    public function update(SuboperationRequest $request, Suboperation $suboperation): JsonResponse
    {
        $suboperation = $this->suboperationService->updateSuboperation($suboperation, $request->validated());
        return response()->json(new SuboperationResource($suboperation));
    }

    /**
     * Remove the specified suboperation.
     *
     * @param Suboperation $suboperation
     * @return JsonResponse
     */
    public function destroy(Suboperation $suboperation): JsonResponse
    {
        $this->suboperationService->deleteSuboperation($suboperation->id);
        return response()->json(null, 204);
    }
}
