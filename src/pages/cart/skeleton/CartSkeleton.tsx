import { Box, Grid, Group, Paper, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { CONTENT } from '@/constants';

const CartSkeleton = () => (
  <Box role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>

    <Stack gap={8} mb="xl">
      <Skeleton h={14} w={50} />
      <Skeleton h={30} w={180} />
      <Skeleton h={16} w={90} />
    </Stack>

    <Grid gap="xl" align="flex-start">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Stack gap="md">
          {Array.from({ length: 3 }, (_, i) => (
            <Paper key={i} withBorder radius="lg" p="md">
              <Group wrap="nowrap" gap="md">
                <Skeleton h={92} w={92} radius="md" />
                <Stack gap={8} flex={1}>
                  <Skeleton h={16} w="60%" />
                  <Skeleton h={12} w="25%" />
                </Stack>
                <Skeleton h={36} w={100} radius="sm" visibleFrom="sm" />
                <Skeleton h={22} w={90} visibleFrom="sm" />
              </Group>
            </Paper>
          ))}
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Paper withBorder radius="lg" p="lg">
          <Skeleton h={20} w={140} mb="lg" />
          <Stack gap="md">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} h={16} />
            ))}
            <Skeleton h={50} radius="md" mt="sm" />
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  </Box>
);

export default CartSkeleton;
