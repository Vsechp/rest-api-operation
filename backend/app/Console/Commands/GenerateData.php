<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Operation;
use App\Models\Suboperation;
use Illuminate\Support\Str;
use Carbon\Carbon;

class GenerateData extends Command
{
    protected $signature = 'data:generate';
    protected $description = 'Generates operations and suboperations';

    public function handle()
    {
        ini_set('memory_limit', '512M');

        $startTime = microtime(true);

        Operation::truncate();
        Suboperation::truncate();

        $operations = [];
        $suboperations = [];
        $lastNumber = 0;

        $totalOperations = 100000;
        $totalSuboperations = 0;
        $batchSize = 1000;
        $now = Carbon::now();

        DB::beginTransaction();
        try {
            for ($i = 1; $i <= $totalOperations; $i++) {
                $number = ++$lastNumber;
                $operationId = Str::uuid()->toString();
                $operations[] = [
                    'id' => $operationId,
                    'name' => Str::random(rand(4, 10)),
                    'number' => $number,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

                $suboperationsCount = rand(1, 10);
                $totalSuboperations += $suboperationsCount;
                for ($j = 0; $j < $suboperationsCount; $j++) {
                    $suboperations[] = [
                        'id' => Str::uuid()->toString(),
                        'operation_id' => $operationId,
                        'name' => Str::random(rand(4, 10)),
                        'number' => $j + 1,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }

                if (count($operations) >= $batchSize || $i == $totalOperations) {
                    DB::table('operations')->insert($operations);
                    DB::table('suboperations')->insert($suboperations);
                    $this->info("Inserted $i operations and $totalSuboperations suboperations.");
                    $operations = [];
                    $suboperations = [];
                    gc_collect_cycles();
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Failed to generate data: ' . $e->getMessage());
            return;
        }

        $endTime = microtime(true);
        $executionTime = $endTime - $startTime;

        $this->info('Data generation completed successfully in ' . $executionTime . ' seconds.');
    }
}
