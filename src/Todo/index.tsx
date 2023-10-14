import {Box, View, Text} from 'native-base';
import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Todo() {
  return (
    <SafeAreaView>
      <Box padding={10}>
        <View style={styles.recentFiles}>
          <TouchableOpacity style={styles.sectionContainer}>
            {/* <Image source={FileIcon} style={styles.fileIcon} /> */}
            <View>
              <Text
                style={(styles.verticalFlex, styles.text)}
                numberOfLines={2}>
                Hii there
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <View>
              <Text>
                {/* {dayjs(created).format('DD MMM YYYY')} */}
                hii 2
              </Text>
            </View>
            <View>
              <MaterialIcons name="star" size={20} />
            </View>
          </View>
        </View>
      </Box>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  Subheading: {
    fontSize: 20,
    color: '#080707',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
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
  recentFiles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalFlex: {
    flexDirection: 'column',
  },
});

export default Todo;
