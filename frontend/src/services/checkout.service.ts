import { apiClient } from './api-client';

export interface CheckoutPayload {
    customer_name: string;
    customer_email: string;
    shipping_address: string;
    shipping_method: string;
    payment_method: string;
    items: {
        variant_id: number;
        quantity: number;
    }[];
}

export interface CheckoutResponse {
    order_number: string;
    total_amount: string;
}

export const checkoutService = {
    placeOrder: async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
        const response = await apiClient.post<{ data: CheckoutResponse }>('/v1/commerce/checkout', payload);
        return response.data.data;
    }
};
