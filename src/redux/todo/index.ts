/* eslint-disable no-param-reassign */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleLoading, handleReject, useAppDispatch} from 'store/reduxUtils';

import * as todoServices from '../../services/todo';
import {IUsersInitialState, RejectValue} from './interface';

const initialState: IUsersInitialState = {
  toDos: [],
};

const getAllToDos = createAsyncThunk<any, any, RejectValue>(
  '/get-all-toDos',
  async () => {
    try {
      const {data} = await todoServices.getAllToDos();
      return data;
    } catch (err) {
      console.log(' err ===========>', err);
      return err;
    }
  },
);

const ToDos = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllToDos.pending, handleLoading);
    builder.addCase(getAllToDos.fulfilled, (state, {payload}) => {
      console.log(' payload ===========>', payload);
    });
    builder.addCase(getAllToDos.rejected, handleReject);
  },
});

export const useUsersActions = () => {
  const dispatch = useAppDispatch();

  return {
    getAllToDos: (query: any) => dispatch(getAllToDos(query)),
  };
};

export default ToDos.reducer;
