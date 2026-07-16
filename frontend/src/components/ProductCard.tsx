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
        <div className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={imageUrl} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                />
                {defaultVariant && defaultVariant.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
            
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <div className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase font-semibold tracking-wider">
                    {product.brand?.name || 'GHEVERHAN'}
                </div>
                
                <h3 className="text-sm sm:text-base font-medium mb-1 line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                
                <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="text-sm sm:text-lg font-bold text-gray-900">
                        Rp {Number(price).toLocaleString('id-ID')}
                    </span>
                    <Button 
                        size="sm" 
                        variant="secondary"
                        className="h-8 w-8 sm:w-auto sm:px-3 rounded-full sm:rounded-md p-0 sm:p-2"
                        onClick={() => onAddToCart && onAddToCart(product)}
                        disabled={!defaultVariant || defaultVariant.stock <= 0}
                    >
                        <span className="hidden sm:inline">Add</span>
                        <span className="sm:hidden text-lg">+</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
