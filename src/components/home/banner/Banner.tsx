import { Paper, SimpleGrid } from '@mantine/core';
import BannerDecor from './BannerDecor';
import BannerContent from './BannerContent';
import BannerCategories from './BannerCategories';

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
    <BannerDecor />
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48} pos="relative">
      <BannerContent />
      <BannerCategories />
    </SimpleGrid>
  </Paper>
);

export default Banner;
