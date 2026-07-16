import { apiClient } from './api-client';

export interface Address {
    id: number;
    user_id: number;
    recipient_name: string;
    phone_number: string;
    full_address: string;
    city: string;
    postal_code: string;
    is_primary: boolean;
}

export const addressService = {
    async getAddresses(): Promise<Address[]> {
        const response = await apiClient.get('/v1/customer/addresses');
        return response.data.data;
    },

    async createAddress(data: Omit<Address, 'id' | 'user_id'>): Promise<Address> {
        const response = await apiClient.post('/v1/customer/addresses', data);
        return response.data.data;
    },

    async deleteAddress(id: number): Promise<void> {
        await apiClient.delete(`/v1/customer/addresses/${id}`);
    }
};
