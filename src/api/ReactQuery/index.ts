import {QueryClient} from 'react-query';

export type ApiResponse<T> = {
  afxToken: string | null;
  data: T;
  message: string;
  error: boolean;
  status: number;
};

export type BaseModule = {
  name: string;
};

export type applicantType = 'mainApplicant' | 'guarantor';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: (failureCount: number, error: unknown) => {
        if ((error as any)?.status >= 500 || (error as any)?.status === 0) {
          return failureCount < 3;
        }
        return false;
      },
    },
    mutations: {
      // Don't automatically refresh the query on mutation success
      // We'll use the `queryClient.invalidateQueries()` function to do that manually
      // This avoids unnecessary network requests
      useErrorBoundary: true,
    },
  },
});
