'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from './error-boundary';
import { useAuthStore } from '../store/auth-store';
import { apiClient } from '../services/api-client';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Attempt to fetch user session on mount
    const fetchUser = async () => {
      try {
        const response = await apiClient.get('/user');
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [setUser, setLoading]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
