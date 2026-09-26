import { lazy, Suspense } from 'react';

const HomeIndex = lazy(() => import('@/components/home'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <HomeIndex />
      </Suspense>
    </div>
  );
};

export default HomePage;
