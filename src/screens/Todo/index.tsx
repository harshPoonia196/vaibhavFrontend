import React, {useState} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import {View} from 'native-base';
import {useToDosActions} from '../../redux/todo';

function Todo() {
  const {deleteTodo} = useToDosActions();

  const [editId, setEditId] = useState('');

  const onDeleteTodo = (_id: string) => {
    deleteTodo({_id});
  };

  return (
    <View flex={1} px={5}>
      <TodoForm editId={editId} setEditId={setEditId} />
      <TodoList onEditTodo={setEditId} onDeleteTodo={onDeleteTodo} />
    </View>
  );
}

export default Todo;
