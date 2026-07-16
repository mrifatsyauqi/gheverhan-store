<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Commerce\Models\Wishlist;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlists = Wishlist::with('product.variants')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Wishlist fetched successfully',
            'data' => $wishlists,
            'errors' => null,
        ]);
    }

    public function store(Request $request, $productId)
    {
        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $productId,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Product added to wishlist',
            'data' => $wishlist,
            'errors' => null,
        ]);
    }

    public function destroy(Request $request, $productId)
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product removed from wishlist',
            'data' => null,
            'errors' => null,
        ]);
    }
}
