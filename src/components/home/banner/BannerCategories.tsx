import { SimpleGrid } from '@mantine/core';
import type { IconType } from 'react-icons';
import { FiHeart, FiHome, FiShoppingBag, FiSmartphone } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import CategoryTile from './CategoryTile';

const { categories } = CONTENT.home.banner;

const categoryIcons: Record<string, IconType> = {
  electronics: FiSmartphone,
  fashion: FiShoppingBag,
  home: FiHome,
  beauty: FiHeart
};

const BannerCategories = () => (
  <SimpleGrid cols={2} spacing="md" visibleFrom="md" aria-hidden="true">
    {categories.map(({ key, label }, index) => (
      <CategoryTile
        key={key}
        label={label}
        icon={categoryIcons[key] ?? FiShoppingBag}
        offset={index % 2 === 1}
      />
    ))}
  </SimpleGrid>
);

export default BannerCategories;
