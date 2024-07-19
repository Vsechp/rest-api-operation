<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Operation;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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
            $totalOperations = Operation::count();
            $totalPages = ceil($totalOperations / $perPage);

            $this->info("Total operations: $totalOperations. Total pages: $totalPages.");

            for ($page = 1; $page <= $totalPages; $page++) {
                $offset = ($page - 1) * $perPage;

                $operations = Operation::with(['suboperations' => function ($query) {
                    $query->whereRaw("number % 2 = 0");
                }])
                ->skip($offset)
                ->take($perPage)
                ->get();

                $this->info("Processing page $page. Operations found: " . $operations->count());

                $operationsToProcess = $operations->filter(function ($operation) {
                    return $operation->suboperations->count() > 2;
                })->values();

                $filteredOperations = collect();

                foreach ($operationsToProcess as $key => $operation) {
                    if ($key % 4 !== 1 && $key % 4 !== 3) {
                        if ($operation->suboperations->count() > 4) {
                            if ($operation->suboperations->contains(function ($suboperation) {
                                return Str::contains($suboperation->name, 'A');
                            })) {
                                $filteredOperations->push($operation);
                            }
                        } else {
                            $filteredOperations->push($operation);
                        }
                    }
                }

                $suboperationsCount = $filteredOperations->sum(function ($operation) {
                    return $operation->suboperations->count();
                });

                $this->info("Page $page: $suboperationsCount suboperations");
            }

            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $this->info("Data processing completed successfully. Execution time: $executionTime seconds.");
        } catch (\Exception $e) {
            $this->error("Error processing data: " . $e->getMessage());
        }
    }
}
