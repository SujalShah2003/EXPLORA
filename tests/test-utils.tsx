import type { ReactElement, ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { apiService } from '@services/api.service.ts';
import { appReducer } from '@/store/app/app.reducer.ts';
import { theme } from '@/theme';

export const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      [apiService.reducerPath]: apiService.reducer
    },
    middleware: gdm => gdm({ serializableCheck: false }).concat(apiService.middleware)
  });

export type TestStore = ReturnType<typeof makeStore>;

type Options = {
  store?: TestStore;
  route?: string;
};

export const renderWithProviders = (
  ui: ReactElement,
  { store = makeStore(), route = '/' }: Options = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </MantineProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
};
