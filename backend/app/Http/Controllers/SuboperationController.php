<?php

namespace App\Http\Controllers;

use App\Models\Suboperation;
use App\Http\Requests\SuboperationRequest;
use App\Http\Resources\SuboperationResource;
use Illuminate\Http\Request;

class SuboperationController extends Controller
{
    public function index()
    {
        $suboperations = Suboperation::paginate();
        return SuboperationResource::collection($suboperations);
    }

    public function store(SuboperationRequest $request, $operationId)
    {
        $validatedData = $request->validated();
        $validatedData['operation_id'] = $operationId;
    
        $suboperation = Suboperation::create($validatedData);
        return new SuboperationResource($suboperation);
    }

    public function show($id)
    {
        $suboperation = Suboperation::find($id);

        if (!$suboperation) {
            return response()->json(['error' => 'Suboperation not found'], 404);
        }

        return response()->json($suboperation);
    }
    

    public function update(SuboperationRequest $request, $suboperation)
    {
        $suboperation = Suboperation::findOrFail($suboperation);
        $suboperation->update($request->validated());
        return new SuboperationResource($suboperation);
    }

    public function destroy($suboperation)
    {
        $suboperation->delete();
        return response()->json(null, 204);
    }
}
