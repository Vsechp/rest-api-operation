<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OperationController;
use App\Http\Controllers\SuboperationController;

Route::get('/test', function () {
    return response()->json(['message' => 'web is working']);
});
