import { apiClient } from './api-client';
import { User } from '../../../shared/types/user';
import { useAuthStore } from '@/store/auth-store';

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        access_token: string;
        token_type: string;
    };
    errors?: any;
}

export const authService = {
    login: async (credentials: any) => {
        const response = await apiClient.post<AuthResponse>('/login', credentials);
        if (response.data.success && response.data.data) {
            useAuthStore.getState().setAuth(response.data.data.user, response.data.data.access_token);
        }
        return response.data;
    },

    register: async (userData: any) => {
        const response = await apiClient.post<AuthResponse>('/register', userData);
        if (response.data.success && response.data.data) {
            useAuthStore.getState().setAuth(response.data.data.user, response.data.data.access_token);
        }
        return response.data;
    },

    logout: async () => {
        try {
            await apiClient.post('/logout');
        } finally {
            useAuthStore.getState().clearAuth();
        }
    },

    getUser: async () => {
        const response = await apiClient.get('/user');
        if (response.data.success && response.data.data) {
            useAuthStore.getState().updateUser(response.data.data);
        }
        return response.data.data;
    }
};
