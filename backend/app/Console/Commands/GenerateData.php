<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Operation;
use App\Models\Suboperation;
use Illuminate\Support\Str;

class GenerateData extends Command
{
    protected $signature = 'data:generate';
    protected $description = 'Generates operations and suboperations';

    public function handle()
    {
        $startTime = microtime(true);

        Operation::truncate();
        Suboperation::truncate();

        $operations = [];
        $suboperations = [];
        $lastNumber = 0;

        for ($i = 1; $i <= 100000; $i++) {
            $number = ++$lastNumber;
            $operationId = Str::uuid()->toString();
            $now = now();
            $operations[] = [
                'id' => $operationId,
                'name' => Str::random(rand(4, 10)),
                'number' => $number,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            $suboperationsCount = rand(1, 10);
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

            // Изменение здесь: вставляем данные после каждых 100 операций вместо 1000
            if ($i % 100 == 0 || $i == 100000) {
                DB::table('operations')->insert($operations);
                DB::table('suboperations')->insert($suboperations);
                $this->info("Inserted 100 operations and their suboperations.");
                $operations = [];
                $suboperations = [];
            }
        }

        $endTime = microtime(true);
        $executionTime = $endTime - $startTime;

        $this->info('Data generation completed successfully in ' . $executionTime . ' seconds.');
    }
}