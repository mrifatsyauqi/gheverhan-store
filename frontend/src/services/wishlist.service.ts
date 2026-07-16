import { apiClient } from './api-client';

export interface Wishlist {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
    product: {
        id: number;
        name: string;
        slug: string;
        variants: {
            id: number;
            price: number;
            sku: string;
        }[];
    }
}

export const wishlistService = {
    async getWishlist(): Promise<Wishlist[]> {
        const response = await apiClient.get('/v1/customer/wishlist');
        return response.data.data;
    },

    async addWishlist(productId: number): Promise<Wishlist> {
        const response = await apiClient.post(`/v1/customer/wishlist/${productId}`);
        return response.data.data;
    },

    async removeWishlist(productId: number): Promise<void> {
        await apiClient.delete(`/v1/customer/wishlist/${productId}`);
    }
};
