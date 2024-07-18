<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuboperationsTable extends Migration
{
    public function up()
    {
        Schema::create('suboperations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('operation_id');
            $table->foreign('operation_id')->references('id')->on('operations')->onDelete('cascade');
            $table->integer('number');
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();

        });
    }

    public function down()
    {
        Schema::dropIfExists('suboperations');
    }
}
