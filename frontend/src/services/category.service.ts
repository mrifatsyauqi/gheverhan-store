import { apiClient } from './api-client';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    products_count?: number;
    created_at: string;
    updated_at: string;
}

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        const response = await apiClient.get('/v1/commerce/categories');
        return response.data.data;
    },

    async getCategoryBySlug(slug: string): Promise<Category> {
        const response = await apiClient.get(`/v1/commerce/categories/${slug}`);
        return response.data.data;
    }
};
