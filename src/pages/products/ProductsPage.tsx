import { lazy, Suspense } from 'react';
import ProductsSkeleton from './skeleton/ProductsSkeleton';

const Products = lazy(() => import('@/components/products/Products'));

const ProductsPage = () => (
  <Suspense fallback={<ProductsSkeleton />}>
    <Products />
  </Suspense>
);

export default ProductsPage;
