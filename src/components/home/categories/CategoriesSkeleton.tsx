import { Skeleton } from '@mantine/core';

type CategoriesSkeletonProps = {
  count?: number;
};

const CategoriesSkeleton = ({ count = 12 }: CategoriesSkeletonProps) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} h={72} radius="lg" />
    ))}
  </>
);

export default CategoriesSkeleton;
