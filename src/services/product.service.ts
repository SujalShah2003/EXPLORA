import { apiService } from '@services/api.service.ts';
import type { ProductsResponse, ProductSummary } from '@/types/product';

type LatestProductsArgs = {
  modifiedAfter: string;
  limit: number;
};

const product = apiService.injectEndpoints({
  endpoints: build => ({
    getLatestProducts: build.query<ProductsResponse<ProductSummary>, LatestProductsArgs>({
      query: ({ modifiedAfter, limit }) => ({
        url: '/products',
        params: {
          modifiedAfter,
          limit,
          select: 'title,description,meta,thumbnail,price,rating,category,discountPercentage',
          sortBy: 'meta.updatedAt',
          order: 'desc'
        }
      }),
      providesTags: ['PRODUCTS']
    })
  })
});

export const { useGetLatestProductsQuery } = product;
