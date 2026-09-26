import { lazy, Suspense } from 'react';
import BannerSkeleton from './skeleton/BannerSkeleton';
import CategoriesSkeleton from './skeleton/CategoriesSkeleton';
import LatestProductsSkeleton from './skeleton/LatestProductsSkeleton';

const Banner = lazy(() => import('@/components/home/banner/Banner'));
const Categories = lazy(() => import('@/components/home/categories/Categories'));
const LatestProducts = lazy(() => import('@/components/home/latest-products/LatestProducts'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<LatestProductsSkeleton />}>
        <LatestProducts />
      </Suspense>
    </div>
  );
};

export default HomePage;
