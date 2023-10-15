/* eslint-disable no-param-reassign */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleLoading, handleReject, useAppDispatch} from '../reduxUtils';
import {cloneDeep} from 'lodash';

import * as todoServices from '../../services/todo';
import {
  IDeleteTodoParams,
  IGetAllToDosParams,
  IGetAllToDosRes,
  IToDo,
  IToDosInitialState,
  RejectValue,
  Todo,
} from './interface';

const initialState: IToDosInitialState = {
  toDos: [],
  hasNext: true,
  toSkip: 0,
  loading: false,
};

const getAllToDos = createAsyncThunk<
  IGetAllToDosRes['data'],
  IGetAllToDosParams,
  RejectValue
>('/get-all-toDos', async params => {
  const {data} = await todoServices.getAllToDos(params);
  return data;
});

const deleteTodo = createAsyncThunk<IToDo, IDeleteTodoParams, RejectValue>(
  '/delete-toDo',
  async params => {
    const {data} = await todoServices.deleteTodo(params);
    return data;
  },
);

const addTodo = createAsyncThunk<IToDo, Todo, RejectValue>(
  '/add-toDo',
  async params => {
    const {data} = await todoServices.addTodo(params);
    return data;
  },
);

const editTodo = createAsyncThunk<IToDo, IToDo, RejectValue>(
  '/edit-toDo',
  async params => {
    const {data} = await todoServices.editTodo(params);
    return data;
  },
);

const modifyData = (newData: IToDo[], stateData: IToDo[]) => {
  newData.map(i => stateData.push(i));
  stateData.sort;
  return stateData;
};

const ToDos = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllToDos.pending, handleLoading);
    builder.addCase(getAllToDos.fulfilled, (state, {payload}) => {
      const {toDos, toSkip, hasNext} = payload;

      const newData = modifyData(toDos, state.toDos);

      state.toDos = newData;
      state.toSkip = toSkip;
      state.hasNext = hasNext;
      state.loading = false;
    });
    builder.addCase(getAllToDos.rejected, handleReject);

    builder.addCase(deleteTodo.pending, handleLoading);
    builder.addCase(deleteTodo.fulfilled, (state, {payload}) => {
      const {_id} = payload;
      const index = state.toDos.findIndex(i => i._id === _id);
      const cloneTodos = cloneDeep(state.toDos);
      cloneTodos.splice(index, 1);

      state.toDos = cloneTodos;
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, handleReject);

    builder.addCase(addTodo.pending, handleLoading);
    builder.addCase(addTodo.fulfilled, (state, {payload}) => {
      const _todoClone = cloneDeep(state.toDos);
      _todoClone.push(payload);

      state.toDos = _todoClone;
      state.loading = false;
    });
    builder.addCase(addTodo.rejected, handleReject);

    builder.addCase(editTodo.pending, handleLoading);
    builder.addCase(editTodo.fulfilled, (state, {payload}) => {
      const {_id} = payload;
      var index = state.toDos.findIndex(i => i._id === _id);
      const _todoClone = cloneDeep(state.toDos);

      _todoClone[index] = payload;

      state.toDos = _todoClone;
      state.loading = false;
    });
    builder.addCase(editTodo.rejected, handleReject);
  },
});

export const useToDosActions = () => {
  const dispatch = useAppDispatch();

  return {
    getAllToDos: (params: IGetAllToDosParams) => dispatch(getAllToDos(params)),
    deleteTodo: (params: IDeleteTodoParams) => dispatch(deleteTodo(params)),
    editTodo: (params: IToDo) => dispatch(editTodo(params)),
    addTodo: (params: Todo) => dispatch(addTodo(params)),
  };
};

export default ToDos.reducer;
