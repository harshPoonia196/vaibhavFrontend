import {Text, View} from 'native-base';
import React from 'react';

function EmptyCommonComponent(props: {text: string}) {
  const {text} = props;
  return (
    <View height="100%" justifyContent="center" marginBottom={600}>
      <Text fontSize={20} textAlign="center">
        {text}
      </Text>
    </View>
  );
}

export default EmptyCommonComponent;
