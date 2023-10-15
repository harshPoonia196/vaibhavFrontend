import React from 'react';
import Todo from './screens/Todo';
import {NativeBaseProvider} from 'native-base';
import {store} from './redux';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaView style={{flexGrow: 1}}>
          <Todo />
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
