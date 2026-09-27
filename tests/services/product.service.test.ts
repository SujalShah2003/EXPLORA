// @vitest-environment node
// RTK Query's fetchBaseQuery conflicts with jsdom's AbortSignal, so run in plain Node.
import { configureStore } from '@reduxjs/toolkit';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiService } from '@services/api.service.ts';
import { product as productApi } from '@services/product.service.ts';
import { makeProduct } from '../fixtures/product';

const makeStore = () =>
  configureStore({
    reducer: { [apiService.reducerPath]: apiService.reducer },
    middleware: gdm => gdm({ serializableCheck: false }).concat(apiService.middleware)
  });

type Args = {
  q: string;
  category: string;
  sortBy: string;
  order: 'asc' | 'desc';
  limit: number;
  skip: number;
  modifiedAfter?: string;
};

const baseArgs: Args = { q: '', category: '', sortBy: '', order: 'asc', limit: 12, skip: 0 };

let requests: URL[];
let responseBody: unknown;

beforeEach(() => {
  requests = [];
  responseBody = { products: [], total: 0, skip: 0, limit: 12 };
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: Request) => {
      requests.push(new URL(input.url));
      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const run = (args: Partial<Args>) =>
  makeStore().dispatch(productApi.endpoints.getProducts.initiate({ ...baseArgs, ...args }));

describe('getProducts endpoint selection', () => {
  it('lists all products with paging params', async () => {
    await run({ limit: 24, skip: 24 });
    const [url] = requests;
    expect(url.pathname).toBe('/products');
    expect(url.searchParams.get('limit')).toBe('24');
    expect(url.searchParams.get('skip')).toBe('24');
    expect(url.searchParams.has('sortBy')).toBe(false);
  });

  it('uses the search endpoint for a query', async () => {
    await run({ q: '  phone ' });
    const [url] = requests;
    expect(url.pathname).toBe('/products/search');
    expect(url.searchParams.get('q')).toBe('phone');
  });

  it('uses the category endpoint for a category', async () => {
    await run({ category: 'smartphones', sortBy: 'price', order: 'desc' });
    const [url] = requests;
    expect(url.pathname).toBe('/products/category/smartphones');
    expect(url.searchParams.get('sortBy')).toBe('price');
    expect(url.searchParams.get('order')).toBe('desc');
  });

  it('adds modifiedAfter for latest-only', async () => {
    await run({ modifiedAfter: '2026-06-01T00:00:00Z' });
    expect(requests[0].searchParams.get('modifiedAfter')).toBe('2026-06-01T00:00:00Z');
  });
});

describe('getProducts search inside a category', () => {
  it('fetches the whole category and filters + paginates client-side', async () => {
    responseBody = {
      products: [
        makeProduct({ id: 1, title: 'iPhone 13', description: 'Apple phone' }),
        makeProduct({ id: 2, title: 'Galaxy S', description: 'Android phone' }),
        makeProduct({ id: 3, title: 'Pixel', description: 'Google device' })
      ],
      total: 3,
      skip: 0,
      limit: 0
    };

    const result = await run({ q: 'Phone', category: 'smartphones', limit: 1, skip: 1 });

    const [url] = requests;
    expect(url.pathname).toBe('/products/category/smartphones');
    expect(url.searchParams.get('limit')).toBe('0');
    expect(url.searchParams.has('q')).toBe(false);

    expect(result.data?.total).toBe(2);
    expect(result.data?.products.map(p => p.id)).toEqual([2]);
  });
});
