<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Class Operation
 *
 * @property string $id
 * @property int $number
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
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
                $model->id = (string) Str::uuid();
            }
        });

        static::deleted(function ($model) {
            $model->recalculateSuboperationsNumbers();
        });
    }

    /**
     * @return HasMany
     */
    public function suboperations(): HasMany
    {
        return $this->hasMany(Suboperation::class);
    }

    /**
     * Recalculate suboperations numbers after deleting a suboperation.
     */
    public function recalculateSuboperationsNumbers()
    {
        $suboperations = $this->suboperations()->orderBy('number', 'asc')->get();

        DB::transaction(function () use ($suboperations) {
            $number = 1;
            foreach ($suboperations as $suboperation) {
                $suboperation->number = $number++;
                $suboperation->save();
            }
        });
    }
}