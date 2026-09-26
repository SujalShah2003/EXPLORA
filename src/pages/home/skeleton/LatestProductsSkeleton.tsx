import { Box, Group, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { CONTENT } from '@/constants';

type LatestProductsSkeletonProps = {
  count?: number;
};

const LatestProductsSkeleton = ({
  count = CONTENT.home.latestProducts.pageSize
}: LatestProductsSkeletonProps) => (
  <Box mt={64} role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>
    <Group justify="space-between" align="center" mb="xl">
      <Stack gap={8}>
        <Skeleton h={14} w={70} />
        <Skeleton h={30} w={220} />
        <Skeleton h={16} w={320} />
      </Stack>
      <Skeleton h={18} w={140} />
    </Group>

    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </SimpleGrid>
  </Box>
);

export default LatestProductsSkeleton;
