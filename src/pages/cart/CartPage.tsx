import { lazy, Suspense } from 'react';
import CartSkeleton from './skeleton/CartSkeleton';

const Cart = lazy(() => import('@/components/cart/Cart'));

const CartPage = () => (
  <Suspense fallback={<CartSkeleton />}>
    <Cart />
  </Suspense>
);

export default CartPage;
