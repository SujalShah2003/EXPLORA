import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '@/layouts/MasterLayout';
import HomePage from '@/pages/home/HomePage';

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
          path: '*',
          Component: HomePage
        }
      ]
    }
  ],
  { basename: '/' }
);
