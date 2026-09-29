import { useSearchParams } from 'react-router-dom';
import { CONTENT } from '@/constants';

const { defaults, filters } = CONTENT.products;

const sortValues = filters.sortBy.options.map(option => option.value);
const limitValues = filters.limit.options.map(Number);

export type ProductFilters = {
  q: string;
  category: string;
  latest: boolean;
  sortBy: string;
  order: 'asc' | 'desc';
  limit: number;
  page: number;
};

const defaultFilters: ProductFilters = {
  q: '',
  category: '',
  latest: false,
  sortBy: defaults.sortBy,
  order: defaults.order as 'asc' | 'desc',
  limit: defaults.limit,
  page: 1
};

const toSearchParams = (filters: ProductFilters) => {
  const search = new URLSearchParams();
  if (filters.q) search.set('q', filters.q);
  if (filters.category) search.set('category', filters.category);
  if (filters.latest) search.set('latest', '1');
  if (filters.sortBy) search.set('sortBy', filters.sortBy);
  if (filters.sortBy && filters.order !== defaultFilters.order) search.set('order', filters.order);
  if (filters.limit !== defaultFilters.limit) search.set('limit', String(filters.limit));
  if (filters.page !== 1) search.set('page', String(filters.page));
  return search;
};

export const useProductFilters = () => {
  const [params, setParams] = useSearchParams();

  const sortBy = params.get('sortBy') ?? '';
  const order = params.get('order');
  const limit = Number(params.get('limit'));
  const page = Number(params.get('page'));

  const values: ProductFilters = {
    q: params.get('q') ?? '',
    category: params.get('category') ?? '',
    latest: params.get('latest') === '1',
    sortBy: sortValues.includes(sortBy) ? sortBy : defaultFilters.sortBy,
    order: order === 'asc' || order === 'desc' ? order : defaultFilters.order,
    limit: limitValues.includes(limit) ? limit : defaultFilters.limit,
    page: Number.isInteger(page) && page > 0 ? page : 1
  };

  // Any change other than the page itself sends the user back to page 1.
  const update = (patch: Partial<ProductFilters>, options?: { replace?: boolean }) => {
    const next = { ...values, ...patch };
    if (!('page' in patch)) next.page = 1;
    setParams(toSearchParams(next), { replace: options?.replace });
  };

  const reset = () => setParams(new URLSearchParams());

  const isFiltered = toSearchParams({ ...values, page: 1 }).toString() !== '';

  return { values, update, reset, isFiltered };
};
