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
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
        <View style={styles.half}>
          <MaterialCommunityIcons name="weather-cloudy" size={128} color="white" />
          <Text style={styles.text}>{data.city}</Text>
          <Text style={styles.text}>{data.temp}°</Text>
          <Text style={styles.text}>{data.feels_like}°</Text>
        </View>
        <View style={styles.half}>
          <Text style={styles.text}>{data.desc}</Text>
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

  text: {
    fontSize: 36,
    color: 'white',
  },
});
