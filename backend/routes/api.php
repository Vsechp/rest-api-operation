<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OperationController;
use App\Http\Controllers\SuboperationController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::prefix('operations')->group(function () {
    Route::get('/', [OperationController::class, 'index']);
    Route::post('/', [OperationController::class, 'store']);
    Route::get('/{operation}', [OperationController::class, 'show'])->where('operation', '[0-9a-fA-F\-]+');
    Route::put('/{operation}', [OperationController::class, 'update'])->where('operation', '[0-9a-fA-F\-]+');
    Route::delete('/{operation}', [OperationController::class, 'destroy'])->where('operation', '[0-9a-fA-F\-]+');
    Route::put('/{operation}/restore', [OperationController::class, 'restore'])->where('operation', '[0-9a-fA-F\-]+');
    Route::delete('/{operation}/force', [OperationController::class, 'forceDelete'])->where('operation', '[0-9a-fA-F\-]+');

    Route::get('/deleted', [OperationController::class, 'showDeleted']);
});

Route::prefix('suboperations')->group(function () {
    Route::get('/', [SuboperationController::class, 'index']);
    Route::post('/{operation}', [SuboperationController::class, 'store']);
    Route::get('/{suboperation}', [SuboperationController::class, 'show'])->where('suboperation', '[0-9a-fA-F\-]+');
    Route::put('/{suboperation}', [SuboperationController::class, 'update'])->where('suboperation', '[0-9a-fA-F\-]+');
    Route::delete('/{suboperation}', [SuboperationController::class, 'destroy'])->where('suboperation', '[0-9a-fA-F\-]+');
});