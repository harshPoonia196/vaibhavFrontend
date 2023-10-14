/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Todo from './Todo';
import {NativeBaseProvider} from 'native-base';
import {persistor, store} from './redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Todo />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
