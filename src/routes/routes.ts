import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '@/layouts/MasterLayout';
import HomePage from '@/pages/home/HomePage';
import ProductsPage from '@/pages/products/ProductsPage';

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
          path: '*',
          Component: HomePage
        }
      ]
    }
  ],
  { basename: '/' }
);
