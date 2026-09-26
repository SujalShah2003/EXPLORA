import { Button, Text, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CONTENT } from '@/constants';
import { formatSlug } from '@utils/format.ts';
import { getCategoryIcon } from './categoryIcons';

type CategoryCardProps = {
  slug: string;
};

const CategoryCard = ({ slug }: CategoryCardProps) => {
  const Icon = getCategoryIcon(slug);

  return (
    <Button
      component={Link}
      to={`${CONTENT.home.categories.productsHref}${encodeURIComponent(slug)}`}
      variant="default"
      radius="lg"
      h={72}
      px="md"
      fullWidth
      justify="flex-start"
      leftSection={
        <ThemeIcon variant="light" size={40} radius="md">
          <Icon size={22} />
        </ThemeIcon>
      }
    >
      <Text fw={600} fz="sm" truncate>
        {formatSlug(slug)}
      </Text>
    </Button>
  );
};

export default CategoryCard;
