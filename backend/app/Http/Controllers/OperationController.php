<?php

namespace App\Http\Controllers;

use App\Models\Operation;
use App\Http\Requests\OperationRequest;
use App\Http\Resources\OperationResource;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function index()
    {
        $operations = Operation::with('suboperations')->paginate();
        return OperationResource::collection($operations);
    }

    public function store(OperationRequest $request)
    {

        $validated = $request->validated();
        
        if (Operation::where('number', $validated['number'])->exists()) {
            return response()->json([
                'message' => 'Operation with this number already exists.',
            ], 409);
        }

        $operation = Operation::create($request->validated());
        return response()->json([
            'message' => 'Operation created successfully',
            'operation' => new OperationResource($operation)
        ], 201);
    }

    public function show($id)
    {
        $operation = Operation::with('suboperations')->findOrFail($id);
        return new OperationResource($operation);
    }

    public function update(OperationRequest $request, $id)
    {
        $operation = Operation::findOrFail($id);

        $validated = $request->validated();
        
        if (Operation::where('number', $validated['number'])->where('id', '!=', $id)->exists()) {
            return response()->json([
                'message' => 'Operation with this number already exists.',
            ], 409);
        }

        $operation->update($validated);

        return response()->json([
            'message' => 'Operation updated successfully',
            'operation' => new OperationResource($operation)
        ], 200);
    }


    public function destroy($id)
    {
        $operation = Operation::findOrFail($id);
    
        $suboperationsCount = $operation->suboperations()->withTrashed()->count();
    
        if ($suboperationsCount > 0) {
            return response()->json([
                'message' => 'Cannot delete operation. Suboperations exist.'
            ], 409);
        }
    
        $operation->forceDelete();
    
        return response()->json([
            'message' => 'Operation deleted permanently'
        ], 200);
    }
    
}