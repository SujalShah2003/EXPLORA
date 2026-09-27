import { lazy, Suspense } from 'react';
import { Box, Button, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import SectionHeader from '@/common/SectionHeader';
import SectionError from '@/common/SectionError';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { CONTENT } from '@/constants';
import { useGetProductsQuery } from '@services/product.service.ts';
import { useProductFilters } from './useProductFilters';

const ProductCard = lazy(() => import('@/components/product/ProductCard'));
const ProductFilters = lazy(() => import('./ProductFilters'));
const ProductsPagination = lazy(() => import('./ProductsPagination'));

const copy = CONTENT.products;

const gridCols = { base: 1, xs: 2, md: 3, lg: 4 };

const Products = () => {
  const { values, update, reset, isFiltered } = useProductFilters();
  const { q, category, latest, sortBy, order, limit, page } = values;

  const { currentData, isFetching, isError, refetch } = useGetProductsQuery({
    q,
    category,
    modifiedAfter: latest ? copy.filters.latest.modifiedAfter : undefined,
    sortBy,
    order,
    limit,
    skip: (page - 1) * limit
  });

  const products = currentData?.products ?? [];
  const total = currentData?.total ?? 0;
  const isLoading = isFetching && !currentData;

  const handlePageChange = (next: number) => {
    update({ page: next });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="section">
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <Suspense fallback={<Skeleton h={170} radius="lg" mb="xl" />}>
        <ProductFilters
          values={values}
          isFiltered={isFiltered}
          onChange={update}
          onReset={reset}
        />
      </Suspense>

      {isLoading && (
        <SimpleGrid cols={gridCols} spacing="lg" aria-busy="true">
          {Array.from({ length: limit }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </SimpleGrid>
      )}

      {isError && !isFetching && (
        <SectionError
          title={copy.errorTitle}
          message={copy.errorMessage}
          retryLabel={copy.retry}
          onRetry={refetch}
          retrying={isFetching}
        />
      )}

      {currentData && !products.length && (
        <Stack align="center" gap="sm" py="xl">
          <Text c="dimmed">{copy.empty}</Text>
          {isFiltered && (
            <Button variant="light" onClick={reset}>
              {copy.clearFilters}
            </Button>
          )}
        </Stack>
      )}

      {currentData && products.length > 0 && (
        <>
          <SimpleGrid cols={gridCols} spacing="lg">
            <Suspense
              fallback={Array.from({ length: products.length }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isNew={dayjs(product.meta.createdAt).isAfter(
                    copy.filters.latest.modifiedAfter
                  )}
                />
              ))}
            </Suspense>
          </SimpleGrid>

          <Suspense fallback={<Skeleton h={36} radius="md" mt="xl" />}>
            <ProductsPagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={handlePageChange}
              onLimitChange={value => update({ limit: value })}
            />
          </Suspense>
        </>
      )}
    </Box>
  );
};

export default Products;
