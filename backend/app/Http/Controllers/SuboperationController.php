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

    public function store(SuboperationRequest $request)
    {
        $suboperation = Suboperation::create($request->validated());
        return new SuboperationResource($suboperation);
    }

    public function show($id)
    {
        $suboperation = Suboperation::findOrFail($id);
        return new SuboperationResource($suboperation);
    }

    public function update(SuboperationRequest $request, $id)
    {
        $suboperation = Suboperation::findOrFail($id);
        $suboperation->update($request->validated());
        return new SuboperationResource($suboperation);
    }

    public function destroy($id)
    {
        $suboperation = Suboperation::findOrFail($id);
        $suboperation->delete();
        return response()->json(null, 204);
    }
}