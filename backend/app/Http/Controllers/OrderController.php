<?php

namespace App\Http\Controllers;

use App\Domain\Commerce\Models\Order;
use App\Domain\Commerce\Models\OrderItem;
use App\Domain\Commerce\Models\ProductVariant;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    use ApiResponse;

    /**
     * Get user's orders
     */
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with('items.variant.product')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->success($orders, 'Orders fetched successfully.');
    }

    /**
     * Handle the checkout process (create order).
     */
    public function checkout(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'shipping_address' => 'required|string',
            'shipping_method' => 'required|string',
            'payment_method' => 'required|string',
            'items' => 'required|array',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $totalAmount = 0;
            $orderItemsData = [];

            // 1. Validate stock and calculate total
            foreach ($validated['items'] as $item) {
                // Lock for update to prevent race conditions (for MVP we'll just check)
                $variant = ProductVariant::lockForUpdate()->find($item['variant_id']);

                if ($variant->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for SKU: {$variant->sku}");
                }

                $price = $variant->price;
                $totalAmount += ($price * $item['quantity']);

                $orderItemsData[] = [
                    'product_id' => $variant->product_id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $item['quantity'],
                    'price_at_checkout' => $price,
                ];

                // Deduct stock
                $variant->stock -= $item['quantity'];
                $variant->save();
            }

            // 2. Create Order
            $order = Order::create([
                'user_id' => $request->user()?->id,
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_method' => $validated['shipping_method'],
                'payment_method' => $validated['payment_method'],
                'total_amount' => $totalAmount,
                'status' => 'Pending Payment',
            ]);

            // 3. Create Order Items
            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            DB::commit();

            return $this->success([
                'order_number' => $order->order_number,
                'total_amount' => $order->total_amount,
            ], 'Order placed successfully.', 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->error('Checkout failed: ' . $e->getMessage(), 422);
        }
    }
}
