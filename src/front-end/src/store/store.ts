import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'currency/loadData/fulfilled',
          'currency/loadCostData/fulfilled',
          'currency/fetchLiveRates/fulfilled'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.graph', 'payload.costManager'],
        // Ignore these paths in the state
        ignoredPaths: ['currency.graph', 'currency.costManager'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
