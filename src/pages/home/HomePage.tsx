import { lazy, Suspense } from 'react';
import PageSkeleton from '@/common/PageSkeleton';

const HomeIndex = lazy(() => import('@/components/home'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<PageSkeleton />}>
        <HomeIndex />
      </Suspense>
    </div>
  );
};

export default HomePage;
