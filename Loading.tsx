import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Getting the weather information...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FDF6AA',
    paddingBottom: 100,
    paddingLeft: 20,
  },
  text: {
    fontSize: 36,
    color: '#5D5D55',
  },
});
