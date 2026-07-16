import { apiClient } from './api-client';

export interface OrderItem {
    id: number;
    product_id: number;
    product_variant_id: number;
    quantity: number;
    price_at_checkout: string;
    variant: {
        id: number;
        sku: string;
        product: {
            id: number;
            name: string;
            slug: string;
        }
    }
}

export interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    shipping_address: string;
    shipping_method: string;
    payment_method: string;
    total_amount: string;
    status: string;
    created_at: string;
    items: OrderItem[];
}

export const orderService = {
    async getCustomerOrders(): Promise<Order[]> {
        const response = await apiClient.get('/v1/customer/orders');
        return response.data.data;
    }
};
