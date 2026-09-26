import { lazy, Suspense } from 'react';
import ProductDetailSkeleton from './skeleton/ProductDetailSkeleton';

const ProductDetail = lazy(() => import('@/components/product-detail/ProductDetail'));

const ProductDetailPage = () => (
  <Suspense fallback={<ProductDetailSkeleton />}>
    <ProductDetail />
  </Suspense>
);

export default ProductDetailPage;
