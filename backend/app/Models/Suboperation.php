<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class Suboperation extends Model
{
    use SoftDeletes;

    protected $keyType = 'uuid';
    public $incrementing = false;
    protected $fillable = ['operation_id', 'number', 'name'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }
}

