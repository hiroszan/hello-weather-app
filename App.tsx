import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainView from './MainView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <MainView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
