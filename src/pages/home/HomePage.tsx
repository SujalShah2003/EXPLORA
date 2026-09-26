import { lazy, Suspense } from 'react';
import PageSkeleton from '@/common/PageSkeleton';

const Banner = lazy(() => import('@/components/home/banner/Banner'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<PageSkeleton />}>
        <Banner />
      </Suspense>
    </div>
  );
};

export default HomePage;
