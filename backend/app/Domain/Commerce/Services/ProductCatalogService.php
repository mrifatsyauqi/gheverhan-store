<?php

namespace App\Domain\Commerce\Services;

use App\Domain\Commerce\Models\Product;
use Illuminate\Support\Collection;

class ProductCatalogService
{
    /**
     * Get all published products with relations.
     */
    public function getPublishedProducts(?string $search = null): Collection
    {
        $query = Product::with(['category', 'brand', 'variants'])
            ->where('status', 'published');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }

    /**
     * Get product by slug.
     */
    public function getProductBySlug(string $slug): ?Product
    {
        return Product::with(['category', 'brand', 'variants'])
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Create a new product.
     */
    public function createProduct(array $data): Product
    {
        $product = Product::create([
            'category_id' => $data['category_id'] ?? null,
            'brand_id' => $data['brand_id'] ?? null,
            'name' => $data['name'],
            'slug' => \Illuminate\Support\Str::slug($data['slug'] ?? $data['name']),
            'description' => $data['description'] ?? null,
            'status' => $data['status'] ?? 'draft',
            'seo_metadata' => $data['seo_metadata'] ?? null,
        ]);

        if (isset($data['variants']) && is_array($data['variants'])) {
            foreach ($data['variants'] as $variant) {
                $product->variants()->create([
                    'sku' => $variant['sku'],
                    'price' => $variant['price'],
                    'stock' => $variant['stock'] ?? 0,
                    'attributes' => $variant['attributes'] ?? null,
                ]);
            }
        }

        return $product->load(['category', 'brand', 'variants']);
    }
}
