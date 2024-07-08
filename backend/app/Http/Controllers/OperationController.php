<?php

namespace App\Http\Controllers;

use App\Models\Operation;
use App\Http\Requests\OperationRequest;
use App\Http\Resources\OperationResource;
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
        $operation = Operation::create($request->validated());
        return new OperationResource($operation);
    }

    public function show($id)
    {
        $operation = Operation::with('suboperations')->findOrFail($id);
        return new OperationResource($operation);
    }

    public function update(OperationRequest $request, $id)
    {
        $operation = Operation::findOrFail($id);
        $operation->update($request->validated());
        return new OperationResource($operation);
    }

    public function destroy($id)
    {
        $operation = Operation::findOrFail($id);
        $operation->delete();
        return response()->json(null, 204);
    }
}