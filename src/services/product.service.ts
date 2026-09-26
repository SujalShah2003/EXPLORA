import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { apiService } from '@services/api.service.ts';
import type { ProductDetail, ProductsResponse, ProductSummary } from '@/types/product';

const PRODUCT_SUMMARY_FIELDS =
  'title,description,meta,thumbnail,price,rating,category,discountPercentage';

type LatestProductsArgs = {
  modifiedAfter: string;
  limit: number;
};

export type ProductsArgs = {
  q: string;
  category: string;
  modifiedAfter?: string;
  sortBy: string;
  order: 'asc' | 'desc';
  limit: number;
  skip: number;
};

type Response = ProductsResponse<ProductSummary>;

const categoryUrl = (slug: string) => `/products/category/${encodeURIComponent(slug)}`;

const product = apiService.injectEndpoints({
  endpoints: build => ({
    getLatestProducts: build.query<Response, LatestProductsArgs>({
      query: ({ modifiedAfter, limit }) => ({
        url: '/products',
        params: {
          modifiedAfter,
          limit,
          select: PRODUCT_SUMMARY_FIELDS,
          sortBy: 'meta.updatedAt',
          order: 'desc'
        }
      }),
      providesTags: ['PRODUCTS']
    }),

    getProductById: build.query<ProductDetail, string>({
      query: id => `/products/${encodeURIComponent(id)}`,
      providesTags: ['PRODUCTS']
    }),

    getProducts: build.query<Response, ProductsArgs>({
      async queryFn(
        { q, category, modifiedAfter, sortBy, order, limit, skip },
        _api,
        _extra,
        fetchWithBQ
      ) {
        const search = q.trim();
        const latestParams = modifiedAfter ? { modifiedAfter } : {};
        const pageParams = {
          limit,
          skip,
          select: PRODUCT_SUMMARY_FIELDS,
          ...(sortBy && { sortBy, order }),
          ...latestParams
        };

        // dummyjson can't search inside a category, so fetch the whole (small)
        // category already sorted, then filter and paginate it here.
        if (search && category) {
          const result = await fetchWithBQ({
            url: categoryUrl(category),
            params: { ...pageParams, limit: 0, skip: 0 }
          });
          if (result.error) return { error: result.error as FetchBaseQueryError };

          const term = search.toLowerCase();
          const matches = (result.data as Response).products.filter(
            item =>
              item.title.toLowerCase().includes(term) ||
              item.description.toLowerCase().includes(term)
          );
          return {
            data: {
              products: matches.slice(skip, skip + limit),
              total: matches.length,
              skip,
              limit
            }
          };
        }

        const url = category ? categoryUrl(category) : search ? '/products/search' : '/products';
        const result = await fetchWithBQ({
          url,
          params: search ? { q: search, ...pageParams } : pageParams
        });
        if (result.error) return { error: result.error as FetchBaseQueryError };
        return { data: result.data as Response };
      },
      providesTags: ['PRODUCTS']
    })
  })
});

export const { useGetLatestProductsQuery, useGetProductsQuery, useGetProductByIdQuery } = product;
