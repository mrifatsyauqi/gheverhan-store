<?php

namespace App\Http\Controllers;

use App\Domain\Commerce\Models\ProductVariant;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    use ApiResponse;

    /**
     * Validate cart items against actual database stock and price.
     */
    public function validateCart(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $items = $validated['items'];
        $validatedItems = [];
        $total = 0;
        $hasErrors = false;
        $errors = [];

        foreach ($items as $item) {
            $variant = ProductVariant::with('product')->find($item['variant_id']);
            
            $itemStatus = [
                'variant_id' => $variant->id,
                'sku' => $variant->sku,
                'product_name' => $variant->product->name,
                'requested_quantity' => $item['quantity'],
                'available_stock' => $variant->stock,
                'price' => $variant->price,
                'is_valid' => true,
                'message' => 'OK'
            ];

            if ($variant->stock < $item['quantity']) {
                $itemStatus['is_valid'] = false;
                $itemStatus['message'] = 'Not enough stock available.';
                $hasErrors = true;
                $errors[] = "Insufficient stock for {$variant->product->name} (SKU: {$variant->sku})";
            } else {
                $total += ($variant->price * $item['quantity']);
            }

            $validatedItems[] = $itemStatus;
        }

        $response = [
            'is_valid' => !$hasErrors,
            'total' => $total,
            'items' => $validatedItems,
        ];

        if ($hasErrors) {
            return $this->error('Cart validation failed.', 422, ['details' => $response, 'errors' => $errors]);
        }

        return $this->success($response, 'Cart is valid.');
    }
}
