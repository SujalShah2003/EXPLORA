import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).app?.auth?.token;
    if (token?.access) {
      headers.set('Authorization', `Bearer ${token.access}`);
    } else {
      headers.delete('Authorization');
    }
    return headers;
  }
});

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: ['CATEGORIES'],
  refetchOnReconnect: true,
  endpoints: () => ({})
});
