import { Box, Paper, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { CONTENT } from '@/constants';

type PageSkeletonProps = {
  cards?: number;
};

const PageSkeleton = ({ cards = 8 }: PageSkeletonProps) => (
  <Box role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>

    <Skeleton h={{ base: 260, md: 360 }} radius="xl" mb={48} />

    <Skeleton h={28} w={220} mb="lg" />

    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
      {Array.from({ length: cards }, (_, i) => (
        <Paper key={i} withBorder radius="lg" p="md">
          <Skeleton h={180} radius="md" mb="md" />
          <Stack gap="xs">
            <Skeleton h={16} />
            <Skeleton h={16} w="70%" />
            <Skeleton h={14} w="40%" mt="xs" />
            <Skeleton h={36} radius="md" mt="sm" />
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  </Box>
);

export default PageSkeleton;
