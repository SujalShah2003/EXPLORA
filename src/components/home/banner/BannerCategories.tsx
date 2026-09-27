import { lazy, Suspense } from 'react';
import { SimpleGrid } from '@mantine/core';
import type { IconType } from 'react-icons';
import { FiHeart, FiHome, FiShoppingBag, FiSmartphone } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const CategoryTile = lazy(() => import('./CategoryTile'));

const { categories } = CONTENT.home.banner;

const categoryIcons: Record<string, IconType> = {
  electronics: FiSmartphone,
  fashion: FiShoppingBag,
  home: FiHome,
  beauty: FiHeart
};

const BannerCategories = () => (
  <SimpleGrid cols={2} spacing="xl" visibleFrom="md" aria-hidden="true">
    <Suspense fallback={null}>
      {categories.map(({ key, label }, index) => (
        <CategoryTile
          key={key}
          label={label}
          icon={categoryIcons[key] ?? FiShoppingBag}
          offset={index % 2 === 1}
        />
      ))}
    </Suspense>
  </SimpleGrid>
);

export default BannerCategories;
