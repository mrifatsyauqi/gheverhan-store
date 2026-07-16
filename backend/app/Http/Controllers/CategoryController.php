<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Commerce\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();

        return response()->json([
            'success' => true,
            'message' => 'Categories fetched successfully',
            'data' => $categories,
            'errors' => null,
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)->with('products.variants')->first();

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category fetched successfully',
            'data' => $category,
            'errors' => null,
        ]);
    }
}
