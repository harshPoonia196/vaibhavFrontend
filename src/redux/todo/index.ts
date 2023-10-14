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
  async query => {
    try {
      const {data} = await todoServices.getAllToDos(query);
      return data;
    } catch (err) {
      console.log(' err ===========>', err);
      return err;
    }
  },
);

const Users = createSlice({
  name: 'users',
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

export default Users.reducer;
