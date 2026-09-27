import { lazy, Suspense } from 'react';
import { Box, SimpleGrid, Text } from '@mantine/core';
import SectionHeader from '@/common/SectionHeader';
import SectionError from '@/common/SectionError';
import { CONTENT } from '@/constants';
import { useGetCategoryListQuery } from '@services/category.service.ts';
import CategoriesSkeleton from './CategoriesSkeleton';

const CategoryCard = lazy(() => import('./CategoryCard'));

const copy = CONTENT.home.categories;

const gridCols = { base: 2, sm: 3, md: 4, lg: 6 };

const Categories = () => {
  const { data, isLoading, isError, isSuccess, isFetching, refetch } =
    useGetCategoryListQuery();

  const categories = data ?? [];

  return (
    <Box
      component="section"
      id="categories"
      mt={64}
      style={{ scrollMarginTop: 100 }}
    >
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        viewAll={copy.viewAll}
      />

      {isLoading && (
        <SimpleGrid cols={gridCols} spacing="md" aria-busy="true">
          <CategoriesSkeleton />
        </SimpleGrid>
      )}

      {isError && (
        <SectionError
          title={copy.errorTitle}
          message={copy.errorMessage}
          retryLabel={copy.retry}
          onRetry={refetch}
          retrying={isFetching}
        />
      )}

      {isSuccess && !categories.length && (
        <Text c="dimmed" ta="center" py="xl">
          {copy.empty}
        </Text>
      )}

      {isSuccess && categories.length > 0 && (
        <SimpleGrid cols={gridCols} spacing="md">
          <Suspense fallback={<CategoriesSkeleton count={categories.length} />}>
            {categories.map(slug => (
              <CategoryCard key={slug} slug={slug} />
            ))}
          </Suspense>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Categories;
