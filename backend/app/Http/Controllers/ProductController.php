<?php

namespace App\Http\Controllers;

use App\Domain\Commerce\Services\ProductCatalogService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    protected ProductCatalogService $productService;

    public function __construct(ProductCatalogService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request): JsonResponse
    {
        $search = $request->query('q');
        $products = $this->productService->getPublishedProducts($search);
        return $this->success($products, 'Products retrieved successfully.');
    }

    public function show(string $slug): JsonResponse
    {
        $product = $this->productService->getProductBySlug($slug);
        
        if (!$product) {
            return $this->error('Product not found.', 404);
        }

        return $this->success($product, 'Product retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:products,slug',
            'description' => 'nullable|string',
            'status' => 'nullable|in:draft,published,archived',
            'seo_metadata' => 'nullable|array',
            'variants' => 'nullable|array',
            'variants.*.sku' => 'required_with:variants|string|unique:product_variants,sku',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',
            'variants.*.attributes' => 'nullable|array',
        ]);

        $product = $this->productService->createProduct($validated);
        
        return $this->success($product, 'Product created successfully.', 201);
    }
}
