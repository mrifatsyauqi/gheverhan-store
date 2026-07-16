import { apiClient } from './api-client';

export interface CMSPage {
    id: number;
    title: string;
    slug: string;
    summary?: string;
    body?: string;
    featured_image?: string;
    seo_metadata?: Record<string, any>;
    status: string;
    type: string;
    configuration?: Record<string, any>;
}

export const cmsService = {
    async getPages(): Promise<CMSPage[]> {
        const response = await apiClient.get('/v1/cms/pages');
        return response.data.data;
    },

    async getPageBySlug(slug: string): Promise<CMSPage> {
        const response = await apiClient.get(`/v1/cms/pages/${slug}`);
        return response.data.data;
    },

    async createPage(data: Partial<CMSPage>): Promise<CMSPage> {
        const response = await apiClient.post('/v1/cms/pages', data);
        return response.data.data;
    }
};
