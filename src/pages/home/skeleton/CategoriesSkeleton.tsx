import { Box, Group, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { CONTENT } from '@/constants';

type CategoriesSkeletonProps = {
  count?: number;
};

const CategoriesSkeleton = ({ count = 12 }: CategoriesSkeletonProps) => (
  <Box mt={64} role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>
    <Group justify="space-between" align="center" mb="xl">
      <Stack gap={8}>
        <Skeleton h={14} w={90} />
        <Skeleton h={30} w={240} />
        <Skeleton h={16} w={280} />
      </Stack>
      <Skeleton h={18} w={140} />
    </Group>

    <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing="md">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} h={72} radius="lg" />
      ))}
    </SimpleGrid>
  </Box>
);

export default CategoriesSkeleton;
