<?php
namespace App\DTO;

class OperationQueryParametersDTO
{
    public ?array $filter;
    public int $page;
    public int $perPage;

    public function __construct(
        ?array $filter = null,
        int $page = 1,
        int $perPage = 15
    ) {
        $this->filter = $filter;
        $this->page = max(1, $page);
        $this->perPage = max(1, min(100, $perPage));
    }
}