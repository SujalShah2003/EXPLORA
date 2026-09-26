import { Box, Group, Paper, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { CONTENT } from '@/constants';

const ProductDetailSkeleton = () => (
  <Box role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>

    <Skeleton h={14} w={260} mb="xl" />

    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48}>
      <Stack gap="md">
        <Skeleton h={{ base: 330, md: 470 }} radius="lg" />
        <Group gap="sm">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} h={78} w={78} radius="md" />
          ))}
        </Group>
      </Stack>

      <Stack gap="md">
        <Group gap="xs">
          <Skeleton h={22} w={90} radius="xl" />
          <Skeleton h={22} w={80} radius="xl" />
        </Group>
        <Skeleton h={34} w="85%" />
        <Skeleton h={16} w={120} />
        <Skeleton h={18} w={200} />
        <Skeleton h={34} w={220} />
        <Skeleton h={14} />
        <Skeleton h={14} />
        <Skeleton h={14} w="70%" />
        <Group gap="sm" mt="md">
          <Skeleton h={42} w={110} radius="sm" />
          <Skeleton h={42} w={220} radius="md" />
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" mt="md">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} h={44} radius="md" />
          ))}
        </SimpleGrid>
      </Stack>
    </SimpleGrid>

    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mt={48}>
      {Array.from({ length: 2 }, (_, i) => (
        <Paper key={i} withBorder radius="lg" p="lg">
          <Skeleton h={20} w={160} mb="lg" />
          <Stack gap="md">
            {Array.from({ length: 5 }, (_, row) => (
              <Skeleton key={row} h={16} />
            ))}
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  </Box>
);

export default ProductDetailSkeleton;
