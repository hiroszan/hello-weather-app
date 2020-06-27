import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeatherData } from './api/OpenWeather';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class Weather extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor(prop: object) {
    super(prop);
  }

  render() {
    const data: WeatherData = (this.props as any).data;
    return (
      <LinearGradient colors={data.gradients} style={styles.background}>
        <View style={styles.half}>
          <MaterialCommunityIcons name={data.icon} size={128} color="white" />
          <Text style={styles.h2}>{data.city}</Text>
          <Text style={styles.h1}>{Math.round(data.temp)}°</Text>
        </View>
        <View style={styles.half}>
          <Text style={styles.h1}>{data.desc}</Text>
          <Text style={styles.h3}>체감 온도 {Math.round(data.feels_like)}°</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    borderRadius: 5,
  },

  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  h1: {
    padding: 12,
    fontSize: 36,
    color: 'white',
  },

  h2: {
    padding: 8,
    fontSize: 21,
    color: 'white',
  },

  h3: {
    padding: 4,
    fontSize: 18,
    color: 'white',
  },
});
