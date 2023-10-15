import {Button, FormControl, Input, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/reduxUtils';
import {useToDosActions} from '../../redux/todo';
import {Alert} from 'react-native';

type TodoForm = {
  editId?: string;
  setEditId: (_id: string) => void;
};

function TodoForm(props: TodoForm) {
  const {editId, setEditId} = props;

  const {toDos} = useAppSelector(s => s.todo);
  const [value, setValue] = useState<string>('');
  const {addTodo, editTodo} = useToDosActions();

  const setInitalValue = () => {
    const textValue = toDos.filter(i => i._id === editId);
    setValue(textValue[0].todo);
  };
  const edit = Boolean(editId);

  useEffect(() => {
    if (edit) {
      setInitalValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  const handelSubmit = () => {
    if (value.length <= 5) {
      return Alert.alert('Minim five character required');
    }
    setValue('');
    if (edit) {
      setEditId('');
      return editTodo({_id: editId, todo: value});
    }
    addTodo({todo: value});
  };

  return (
    <View justifyContent="center" marginTop={10} marginBottom={5}>
      <Text marginBottom={2} fontWeight="bold" fontSize={20}>
        My Task
      </Text>
      <FormControl>
        <Input
          value={value}
          onChange={v => {
            setValue(v.nativeEvent.text);
          }}
          placeholder="Enter To do"
          InputRightElement={
            <Button
              size="md"
              rounded="none"
              w="1/6"
              h="full"
              onPress={handelSubmit}>
              {edit ? 'Edit' : 'Add'}
            </Button>
          }
        />
        <FormControl.ErrorMessage>Please write a task</FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
}

export default TodoForm;
