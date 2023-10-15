import {
  Todo,
  ITodoRes,
  IGetAllToDosParams,
  IGetAllToDosRes,
  IDeleteTodoParams,
  IToDo,
} from '../redux/todo/interface';
import client from './client';

export async function getAllToDos(
  params: IGetAllToDosParams,
): Promise<IGetAllToDosRes> {
  const {data} = await client.post('/get-all-todos', params);
  return data;
}

export async function deleteTodo(params: IDeleteTodoParams): Promise<ITodoRes> {
  const {data} = await client.delete(`/delete-todo/${params._id}`);
  return data;
}

export async function addTodo(params: Todo): Promise<ITodoRes> {
  const {data} = await client.post('/create-todo/', params);
  return data;
}

export async function editTodo(params: IToDo): Promise<ITodoRes> {
  const {data} = await client.post('/update-todo', {...params});
  return data;
}
