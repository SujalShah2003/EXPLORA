import { Box, Flex, Grid, Group, Paper, SimpleGrid, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { CONTENT } from '@/constants';

const filterSpans = [
  { base: 12, lg: 6 },
  { base: 12, sm: 4, lg: 2 },
  { base: 12, sm: 4, lg: 2 },
  { base: 12, sm: 4, lg: 2 }
];

const ProductsSkeleton = () => (
  <Box role="status" aria-busy="true">
    <VisuallyHidden>{CONTENT.common.loading}</VisuallyHidden>

    <Stack gap={8} mb="xl">
      <Skeleton h={14} w={60} />
      <Skeleton h={30} w={200} />
      <Skeleton h={16} w={300} />
    </Stack>

    <Paper withBorder radius="lg" p="lg" mb="xl">
      <Group justify="space-between" mb="md">
        <Skeleton h={20} w={80} />
        <Group gap="md">
          <Skeleton h={20} w={170} radius="xl" />
          <Skeleton h={24} w={70} radius="md" />
        </Group>
      </Group>
      <Grid gap="md">
        {filterSpans.map((span, i) => (
          <Grid.Col key={i} span={span}>
            <Skeleton h={14} w={70} mb={6} />
            <Skeleton h={36} radius="sm" />
          </Grid.Col>
        ))}
      </Grid>
    </Paper>

    <SimpleGrid cols={{ base: 1, xs: 2, md: 3, lg: 4 }} spacing="lg">
      {Array.from({ length: CONTENT.products.defaults.limit }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </SimpleGrid>

    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      gap="md"
      mt="xl"
    >
      <Skeleton h={14} w={220} />
      <Skeleton h={36} w={320} radius="md" />
      <Skeleton h={36} w={150} radius="md" />
    </Flex>
  </Box>
);

export default ProductsSkeleton;
