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

const App = () => {
  return (
    <NativeBaseProvider>
      <Todo />
    </NativeBaseProvider>
  );
};

export default App;
