import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

import admin from './admin';
import advertisements from './advertisement';
import documents from './documents';
import procedures from './procedures';
import users from './todo';

const combinedReducer = combineReducers({
  admin,
  users,
  documents,
  advertisements,
  procedures,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
