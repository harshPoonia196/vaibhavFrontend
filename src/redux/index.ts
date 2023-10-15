import {combineReducers, configureStore} from '@reduxjs/toolkit';
import todo from './todo';

const combinedReducer = combineReducers({
  todo,
});

export const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
