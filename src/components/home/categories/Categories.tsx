import { Box, SimpleGrid, Text } from '@mantine/core';
import { useGetCategoryListQuery } from '@services/category.service.ts';
import { CONTENT } from '@/constants';
import CategoriesHeader from './CategoriesHeader';
import CategoryCard from './CategoryCard';
import CategoriesSkeleton from './CategoriesSkeleton';
import CategoriesError from './CategoriesError';

const gridCols = { base: 2, sm: 3, md: 4, lg: 6 };

const Categories = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetCategoryListQuery();

  if (isLoading) {
    return (
      <>
        <Box component="section" mt={64}>
          <CategoriesHeader />
        </Box>
        <SimpleGrid cols={gridCols} spacing="md" aria-busy="true">
          <CategoriesSkeleton />
        </SimpleGrid>
      </>
    );
  }

  if (isError) {
    return <Box component="section" mt={64}>
      <CategoriesError onRetry={refetch} retrying={isFetching} /></Box>;
  }

  return (
    <Box component="section" mt={64}>
      <CategoriesHeader />
      {!data?.length ? (
        <Text c="dimmed" ta="center" py="xl">
          {CONTENT.home.categories.empty}
        </Text>
      ) : (
        <SimpleGrid cols={gridCols} spacing="md">
          {data.map(slug => (
            <CategoryCard key={slug} slug={slug} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Categories;
