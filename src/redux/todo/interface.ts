export interface IToDos {
  todo: string;
}

export interface IUsersInitialState {
  toDos: IToDos[];
}

export interface RejectValue {
  rejectValue: {err: any};
}
