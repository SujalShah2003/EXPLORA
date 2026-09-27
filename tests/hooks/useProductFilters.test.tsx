import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { useProductFilters } from '@/components/products/useProductFilters';

const setup = (url = '/products') =>
  renderHook(() => ({ filters: useProductFilters(), location: useLocation() }), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={[url]}>{children}</MemoryRouter>
    )
  });

describe('useProductFilters', () => {
  it('returns defaults when the URL has no params', () => {
    const { result } = setup();
    expect(result.current.filters.values).toEqual({
      q: '',
      category: '',
      latest: false,
      sortBy: '',
      order: 'asc',
      limit: 12,
      page: 1
    });
    expect(result.current.filters.isFiltered).toBe(false);
  });

  it('reads valid values from the URL', () => {
    const { result } = setup(
      '/products?q=phone&category=smartphones&latest=1&sortBy=price&order=desc&limit=24&page=3'
    );
    expect(result.current.filters.values).toEqual({
      q: 'phone',
      category: 'smartphones',
      latest: true,
      sortBy: 'price',
      order: 'desc',
      limit: 24,
      page: 3
    });
    expect(result.current.filters.isFiltered).toBe(true);
  });

  it('falls back to defaults for invalid values', () => {
    const { result } = setup('/products?sortBy=hacked&order=sideways&limit=7&page=-2');
    const { sortBy, order, limit, page } = result.current.filters.values;
    expect({ sortBy, order, limit, page }).toEqual({ sortBy: '', order: 'asc', limit: 12, page: 1 });
  });

  it('writes changes to the URL and resets to page 1', () => {
    const { result } = setup('/products?page=4');
    act(() => result.current.filters.update({ category: 'laptops' }));
    expect(result.current.location.search).toBe('?category=laptops');
    expect(result.current.filters.values.page).toBe(1);
  });

  it('keeps the other filters when only the page changes', () => {
    const { result } = setup('/products?q=rice');
    act(() => result.current.filters.update({ page: 2 }));
    expect(result.current.location.search).toBe('?q=rice&page=2');
  });

  it('omits default values and drops order when no sort is set', () => {
    const { result } = setup('/products?sortBy=price&order=desc');
    act(() => result.current.filters.update({ sortBy: '', limit: 12 }));
    expect(result.current.location.search).toBe('');
  });

  it('reset clears every param', () => {
    const { result } = setup('/products?q=rice&category=groceries&latest=1');
    act(() => result.current.filters.reset());
    expect(result.current.location.search).toBe('');
    expect(result.current.filters.isFiltered).toBe(false);
  });
});
