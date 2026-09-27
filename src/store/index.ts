import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { appReducer } from '@/store/app/app.reducer.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { apiService } from '@services/api.service.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistConfig = {
  keyPrefix: 'root:',
  key: 'product',
  storage: storage,
  stateReconciler: hardSet,
  whitelist: ['cart'],
  debug: import.meta.env.MODE === 'development',
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_SECRET,
      onError: function (error) {
        console.log('Critical Error Transforming Encrypted Data ==>', error);
      }
    })
  ]
};

export const store = configureStore({
  devTools: import.meta.env.MODE === 'development',
  reducer: {
    app: persistReducer<AppState>(persistConfig, appReducer),
    [apiService.reducerPath]: apiService.reducer
  },
  middleware: gdm =>
    gdm({
      serializableCheck: false
    }).concat(apiService.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
