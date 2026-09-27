import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '@/layouts/MasterLayout';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ProductsPage = lazy(() => import('@/pages/products/ProductsPage'));
const ProductDetailPage = lazy(
  () => import('@/pages/product-detail/ProductDetailPage')
);
const CartPage = lazy(() => import('@/pages/cart/CartPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

export const routes = createBrowserRouter(
  [
    {
      Component: MasterLayout,
      children: [
        {
          index: true,
          Component: HomePage
        },
        {
          path: 'products',
          Component: ProductsPage
        },
        {
          path: 'product/:id',
          Component: ProductDetailPage
        },
        {
          path: 'cart',
          Component: CartPage
        },
        {
          path: '*',
          Component: NotFoundPage
        }
      ]
    }
  ],
  { basename: '/' }
);
