import { apiService } from '@services/api.service.ts';

const category = apiService.injectEndpoints({
  endpoints: build => ({
    getCategoryList: build.query<string[], void>({
      query: () => '/products/category-list',
      providesTags: ['CATEGORIES']
    })
  })
});

export const { useGetCategoryListQuery } = category;
