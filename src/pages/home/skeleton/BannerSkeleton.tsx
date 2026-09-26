import { Group, Paper, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { CONTENT } from '@/constants';

const BannerSkeleton = () => (
  <Paper
    withBorder
    radius="xl"
    px={{ base: 24, md: 56 }}
    py={{ base: 40, md: 64 }}
    role="status"
    aria-busy="true"
  >
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
      <Stack gap="md">
        <Skeleton h={26} w={180} radius="sm" />
        <Skeleton h={{ base: 34, md: 48 }} w="90%" />
        <Skeleton h={{ base: 34, md: 48 }} w="60%" />
        <Skeleton h={16} w="85%" mt="xs" />
        <Skeleton h={16} w="70%" />
        <Group gap="sm" mt="md">
          <Skeleton h={50} w={190} radius="md" />
          <Skeleton h={50} w={140} radius="md" />
        </Group>
      </Stack>

      <SimpleGrid cols={2} spacing="md" visibleFrom="md">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} h={120} radius="lg" mt={i % 2 ? 24 : 0} mb={i % 2 ? 0 : 24} />
        ))}
      </SimpleGrid>
    </SimpleGrid>
  </Paper>
);

export default BannerSkeleton;
