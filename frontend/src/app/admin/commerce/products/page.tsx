'use client';

import React, { useEffect, useState } from 'react';
import { productService, Product } from '@/services/product.service';
import { Button } from '@/components/ui/button';

export default function CommerceProductsAdmin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddDummyProduct = async () => {
        setLoading(true);
        try {
            const randomId = Math.floor(Math.random() * 1000);
            await productService.createProduct({
                name: `Dummy Product ${randomId}`,
                slug: `dummy-product-${randomId}`,
                description: 'This is an awesome dummy product for testing.',
                status: 'published',
                seo_metadata: {
                    og_image: `https://picsum.photos/seed/${randomId}/400/400`
                },
                variants: [
                    {
                        sku: `SKU-${randomId}`,
                        price: 150000 + (Math.random() * 50000),
                        stock: 10
                    }
                ]
            });
            await fetchProducts(); // Refresh the list
        } catch (error: any) {
            console.error("Failed to add dummy product", error);
            alert("Error: " + (error.response?.data?.message || error.message));
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Product Catalog</h1>
                <Button onClick={handleAddDummyProduct} disabled={loading}>Add Dummy Product</Button>
            </div>
            
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="border rounded">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4">Name</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Variants</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {product.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">{product.category?.name || '-'}</td>
                                    <td className="p-4">{product.brand?.name || '-'}</td>
                                    <td className="p-4">{product.variants?.length || 0}</td>
                                    <td className="p-4">
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-gray-500">No products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
