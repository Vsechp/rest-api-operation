<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Operation;
use Illuminate\Support\Str;

class ProcessData extends Command
{
    protected $signature = 'data:process';
    protected $description = 'Processes the generated data';

    public function handle()
    {
        $this->info("Starting data processing...");
        $startTime = microtime(true);

        try {
            $perPage = 1000;
            $page = 1;
            $totalOperations = Operation::count();
            $totalPages = ceil($totalOperations / $perPage);

            $this->info("Total operations: $totalOperations. Total pages: $totalPages.");

            while ($page <= $totalPages) {
                $operations = Operation::with(['suboperations' => function ($query) {
                    $query->whereRaw("number % 2 = 0");
                }])->skip(($page - 1) * $perPage)->take($perPage)->get();

                $this->info("Processing page $page. Operations found: " . $operations->count());

                $operationsToProcess = $operations->filter(function ($operation) {
                    return $operation->suboperations->count() > 2;
                })->sortBy('name');

                $operationsToProcess = $operationsToProcess->values()->filter(function ($operation, $key) {
                    return $key % 4 !== 1 && $key % 4 !== 3;
                });

                $finalOperations = $operationsToProcess->filter(function ($operation) {
                    if ($operation->suboperations->count() <= 4) {
                        return true;
                    }
                    return $operation->suboperations->contains(function ($suboperation) {
                        return Str::contains($suboperation->name, 'A');
                    });
                });

                $suboperationsCount = $finalOperations->sum(function ($operation) {
                    return $operation->suboperations->count();
                });

                $this->info("Page $page: $suboperationsCount suboperations");

                $page++;
            }

            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $this->info("Data processing completed successfully. Execution time: $executionTime seconds.");
        } catch (\Exception $e) {
            $this->error("Error processing data: " . $e->getMessage());
        }
    }
}