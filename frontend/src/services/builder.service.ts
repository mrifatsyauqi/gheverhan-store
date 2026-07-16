import apiClient from './api-client';

export interface Theme {
    id: number;
    name: string;
    is_active: boolean;
    settings: Record<string, any>;
}

export const builderService = {
    async getActiveTheme(): Promise<Theme> {
        const response = await apiClient.get('/v1/builder/theme/active');
        return response.data.data;
    },

    async saveTheme(data: Partial<Theme>): Promise<Theme> {
        const response = await apiClient.post('/v1/builder/theme', data);
        return response.data.data;
    }
};
