import { lazy, Suspense } from 'react';
import BannerSkeleton from './skeleton/BannerSkeleton';
import CategoriesSkeleton from './skeleton/CategoriesSkeleton';

const Banner = lazy(() => import('@/components/home/banner/Banner'));
const Categories = lazy(() => import('@/components/home/categories/Categories'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
    </div>
  );
};

export default HomePage;
