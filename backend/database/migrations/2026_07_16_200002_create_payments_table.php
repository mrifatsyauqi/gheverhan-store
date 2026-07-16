<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('reference_id')->unique()->comment('Our internal payment reference');
            $table->string('gateway_reference')->nullable()->comment('Gateway transaction ID');
            $table->string('payment_method')->nullable();
            $table->string('payment_channel')->nullable();
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('IDR');
            $table->enum('status', ['pending', 'waiting_payment', 'paid', 'expired', 'failed', 'refunded', 'cancelled'])->default('pending');
            $table->json('payment_instructions')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
