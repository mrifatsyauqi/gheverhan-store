import { create } from 'zustand';
import { Theme, builderService } from '../services/builder.service';

interface ThemeState {
    activeTheme: Theme | null;
    isLoading: boolean;
    error: string | null;
    fetchActiveTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
    activeTheme: null,
    isLoading: false,
    error: null,
    fetchActiveTheme: async () => {
        set({ isLoading: true, error: null });
        try {
            const theme = await builderService.getActiveTheme();
            set({ activeTheme: theme, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to load theme', isLoading: false });
        }
    }
}));
