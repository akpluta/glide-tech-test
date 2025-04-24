<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organisations', static function (Blueprint $table) {
            $table->id();
            $table->string('registry');
            $table->string('assignment');
            $table->string('name');
            $table->string('address')->nullable();
            $table->unique(['assignment']);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organisations');
    }
};
