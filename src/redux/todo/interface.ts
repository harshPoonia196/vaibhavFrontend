export interface IToDo {
  todo?: string;
  _id: string;
  completed: boolean;
}

export type Todo = {
  todo: string;
};

export interface IToDosInitialState {
  toDos: IToDo[];
  hasNext: boolean;
  toSkip: number;
  loading: boolean;
}

export interface RejectValue {
  rejectValue: {err: any};
}

export interface IGetAllToDosParams {
  skip: number;
  limit: number;
}

export interface IGetAllToDosRes {
  data: {
    toSkip: number;
    hasNext: boolean;
    toDos: IToDo[];
  };
}

export interface IDeleteTodoParams {
  _id: string;
}

export interface ITodoRes {
  data: IToDo;
}
