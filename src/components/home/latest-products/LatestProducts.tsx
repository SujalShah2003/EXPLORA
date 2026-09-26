import { useState } from 'react';
import { Box, Button, SimpleGrid, Stack, Text } from '@mantine/core';
import { FiChevronDown } from 'react-icons/fi';
import dayjs from 'dayjs';
import SectionHeader from '@/common/SectionHeader';
import SectionError from '@/common/SectionError';
import ProductCard from '@/components/product/ProductCard';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { CONTENT } from '@/constants';
import { useGetLatestProductsQuery } from '@services/product.service.ts';

const copy = CONTENT.home.latestProducts;

const gridCols = { base: 1, xs: 2, md: 3, lg: 4 };

const LatestProducts = () => {
  const [limit, setLimit] = useState(copy.pageSize);

  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useGetLatestProductsQuery({
      modifiedAfter: copy.modifiedAfter,
      limit
    });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const hasMore = products.length < total;
  const isLoadingMore = isFetching && !isLoading;
  const pendingCount = Math.min(copy.pageSize, total - products.length);

  const handleLoadMore = () => setLimit(current => current + copy.pageSize);

  return (
    <Box component="section" mt={64}>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        viewAll={copy.viewAll}
      />

      {isLoading && (
        <SimpleGrid cols={gridCols} spacing="lg" aria-busy="true">
          {Array.from({ length: copy.pageSize }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </SimpleGrid>
      )}

      {isError && (
        <SectionError
          title={copy.errorTitle}
          message={copy.errorMessage}
          retryLabel={copy.retry}
          onRetry={refetch}
          retrying={isFetching}
        />
      )}

      {isSuccess && !products.length && (
        <Text c="dimmed" ta="center" py="xl">
          {copy.empty}
        </Text>
      )}

      {isSuccess && products.length > 0 && (
        <SimpleGrid cols={gridCols} spacing="lg" aria-busy={isLoadingMore}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isNew={dayjs(product.meta.createdAt).isAfter(copy.modifiedAfter)}
            />
          ))}
          {isLoadingMore &&
            Array.from({ length: pendingCount }, (_, i) => (
              <ProductCardSkeleton key={`pending-${i}`} />
            ))}
        </SimpleGrid>
      )}

      {isSuccess && products.length > 0 && (
        <Stack align="center" gap="xs" mt="xl">
          {hasMore && (
            <Button
              variant="light"
              size="md"
              radius="md"
              loading={isLoadingMore}
              onClick={handleLoadMore}
            >
              {copy.loadMore}
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default LatestProducts;
