<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOperationsTable extends Migration
{
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('number')->unique();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('operations');
    }
}
