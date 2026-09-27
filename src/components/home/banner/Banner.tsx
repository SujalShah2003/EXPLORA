import { lazy, Suspense } from 'react';
import { Paper, SimpleGrid, Skeleton, Stack } from '@mantine/core';

const BannerDecor = lazy(() => import('./BannerDecor'));
const BannerContent = lazy(() => import('./BannerContent'));
const BannerCategories = lazy(() => import('./BannerCategories'));

const Banner = () => (
  <Paper
    component="section"
    radius="xl"
    pos="relative"
    c="white"
    px={{ base: 24, md: 56 }}
    py={{ base: 40, md: 64 }}
    bg="linear-gradient(135deg, var(--mantine-color-primary-6) 0%, var(--mantine-color-primary-8) 60%, var(--mantine-color-primary-9) 100%)"
    style={{ overflow: 'hidden' }}
  >
    <Suspense fallback={null}>
      <BannerDecor />
    </Suspense>
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48} pos="relative">
      <Suspense
        fallback={
          <Stack gap="md">
            <Skeleton h={26} w={180} radius="sm" />
            <Skeleton h={{ base: 34, md: 48 }} w="90%" />
            <Skeleton h={{ base: 34, md: 48 }} w="60%" />
            <Skeleton h={16} w="80%" />
            <Skeleton h={50} w={330} radius="md" mt="md" />
          </Stack>
        }
      >
        <BannerContent />
      </Suspense>
      <Suspense fallback={null}>
        <BannerCategories />
      </Suspense>
    </SimpleGrid>
  </Paper>
);

export default Banner;
