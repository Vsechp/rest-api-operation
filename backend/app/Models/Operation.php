<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operation extends Model
{
    use SoftDeletes;

    protected $keyType = 'uuid';
    public $incrementing = false;
    protected $dates = ['deleted_at'];
    protected $fillable = ['id', 'number', 'name'];

    public function suboperations(): HasMany
    {
        return $this->hasMany(Suboperation::class);
    }
}
