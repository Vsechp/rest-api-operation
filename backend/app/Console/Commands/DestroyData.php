<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Operation;
use App\Models\Suboperation;
use Illuminate\Support\Facades\DB;

class DestroyData extends Command
{
    protected $signature = 'data:destroy';
    protected $description = 'Destroy the generated data';

    public function handle()
    {
        $startTime = microtime(true);

        DB::transaction(function () {
            Suboperation::query()->delete();
            Operation::query()->delete();
        });

        $endTime = microtime(true);
        $executionTime = $endTime - $startTime;

        $this->info("All operations and suboperations have been destroyed.");
        $this->info("Execution time: {$executionTime} seconds.");
    }
}