import { FC } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { routes } from '@/routes/routes';
import { theme } from '@/theme';
import { MantineProvider } from '@mantine/core';
import AppToaster from '@/common/AppToaster';

export const appMode: 'light' | 'dark' | 'auto' = 'light';

const App: FC = () => {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme={appMode}>
        <PersistGate persistor={persistor} loading="Initializing...">
          <RouterProvider router={routes} />
        </PersistGate>
        <AppToaster />
      </MantineProvider>
    </Provider>
  );
};

export default App;
