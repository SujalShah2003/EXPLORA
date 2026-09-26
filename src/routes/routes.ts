import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '@/layouts/MasterLayout';
import HomePage from '@/pages/home/HomePage';
import ProductsPage from '@/pages/products/ProductsPage';
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage';
import CartPage from '@/pages/cart/CartPage';

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
          Component: HomePage
        }
      ]
    }
  ],
  { basename: '/' }
);
