import {View, Text, Box, FlatList, Spinner} from 'native-base';
import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, RefreshControl} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyCommonComponent from '../../components/emptyComponent';
import {useToDosActions} from '../../redux/todo';
import {useAppSelector} from '../../redux/reduxUtils';
import {IToDo} from '../../redux/todo/interface';

const limit = 15;

interface ITodoList {
  onDeleteTodo: (_id: string) => void;
  onEditTodo: (_id: string) => void;
}

interface ICard extends ITodoList {
  data: IToDo;
}

function Card(props: ICard) {
  const {onEditTodo, data, onDeleteTodo} = props;
  const {todo, _id, completed} = data;
  const {editTodo} = useToDosActions();

  const onTaskStatusChange = () => {
    editTodo({_id, completed: true});
  };

  return (
    <Box
      style={[
        styles.cardContainer,
        {backgroundColor: completed ? '#32CD32' : 'white'},
      ]}>
      <View backgroundColor="red" style={styles.container}>
        <TouchableOpacity style={styles.sectionContainer}>
          <View>
            <Text style={styles.text} numberOfLines={2}>
              {todo}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          {!completed ? (
            <>
              <MaterialIcons
                onPress={onTaskStatusChange}
                style={styles.editIconStyle}
                name="check"
                size={20}
              />
              <MaterialIcons
                onPress={() => onEditTodo(_id)}
                style={styles.editIconStyle}
                name="edit"
                size={20}
              />
            </>
          ) : null}

          <MaterialIcons
            style={styles.deleteIconStyle}
            name="delete"
            size={20}
            onPress={() => onDeleteTodo(_id)}
          />
        </View>
      </View>
    </Box>
  );
}

function TodoList(props: ITodoList) {
  const {getAllToDos} = useToDosActions();

  useEffect(() => {
    getAllToDos(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {toDos, loading, hasNext, toSkip} = useAppSelector(s => s.todo);
  const params = {skip: toSkip, limit};

  const onRefetch = () => {
    if (hasNext) {
      getAllToDos(params);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      style={{flex: 1}}
      data={toDos}
      extraData={toDos}
      ListEmptyComponent={
        loading ? (
          <View flexGrow={1} justifyContent="center">
            <Spinner color="primary.500" size="lg" />
          </View>
        ) : (
          <EmptyCommonComponent text="Add Tasks" />
        )
      }
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefetch} />
      }
      renderItem={({item}) => <Card {...props} data={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={onRefetch}
      ListFooterComponent={loading ? <Spinner /> : null}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    fontSize: 14,
    alignItems: 'center',
    maxWidth: 170,
  },
  sectionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
  deleteIconStyle: {
    color: 'red',
  },
  editIconStyle: {
    color: 'blue',
    marginHorizontal: 10,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  cardContainer: {
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
  },
});

export default TodoList;
