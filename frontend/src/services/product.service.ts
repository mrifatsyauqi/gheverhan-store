import { apiClient } from './api-client';

export interface ProductVariant {
    id?: number;
    sku: string;
    price: number;
    stock: number;
    attributes?: Record<string, any>;
}

export interface Product {
    id: number;
    category_id?: number;
    brand_id?: number;
    name: string;
    slug: string;
    description?: string;
    status: 'draft' | 'published' | 'archived';
    seo_metadata?: Record<string, any>;
    variants?: ProductVariant[];
    category?: any;
    brand?: any;
}

export const productService = {
    async getProducts(): Promise<Product[]> {
        const response = await apiClient.get('/v1/commerce/products');
        return response.data.data;
    },

    async getProductBySlug(slug: string): Promise<Product> {
        const response = await apiClient.get(`/v1/commerce/products/${slug}`);
        return response.data.data;
    },

    async createProduct(data: Partial<Product>): Promise<Product> {
        const response = await apiClient.post('/v1/commerce/admin/products', data);
        return response.data.data;
    }
};
