import React from 'react';
import { Product } from '@/services/product.service';
import { Button } from '@/components/ui/button';

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const defaultVariant = product.variants?.[0];
    const price = defaultVariant ? defaultVariant.price : 0;
    
    // Fallback to a placeholder if no image exists
    const imageUrl = product.seo_metadata?.og_image || 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 mb-1 uppercase font-semibold tracking-wider">
                    {product.brand?.name || 'Generic'}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold">
                        Rp {Number(price).toLocaleString('id-ID')}
                    </span>
                    <Button 
                        size="sm" 
                        onClick={() => onAddToCart && onAddToCart(product)}
                        disabled={!defaultVariant || defaultVariant.stock <= 0}
                    >
                        {defaultVariant && defaultVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
