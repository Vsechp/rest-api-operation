<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Operation extends Model
{
    use SoftDeletes;

    protected $keyType = 'uuid';
    public $incrementing = false;
    protected $dates = ['deleted_at'];
    protected $fillable = ['number', 'name'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Str::uuid()->toString();
            }
        });
    }

    public function suboperations(): HasMany
    {
        return $this->hasMany(Suboperation::class);
    }
}