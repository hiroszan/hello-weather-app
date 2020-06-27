import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import OpenWeather, { WeatherData } from './api/OpenWeather';
import Weather from './Weather';

export default class App extends React.Component {
  state = {
    isLoading: false,
    weatherData: {},
  };

  async getWeather(location: GeoLocation) {
    const data = await OpenWeather.GetWeather(location);
    console.log(JSON.stringify(data));
    return data;
  }

  async getLocation(): Promise<GeoLocation | null> {
    try {
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      if (response.status != 'granted') {
        throw new Error('permission request deny');
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      console.log('coords', coords);

      return coords;
    } catch (error) {
      Alert.alert('Alert', error.message);
      return null;
    }
  }

  componentDidMount() {
    this.getLocation()
      .then((location) => {
        if (location) {
          return this.getWeather(location);
        }
        return null;
      })
      .then((weatherData: WeatherData | null) => {
        return this.setState({
          isLoading: true,
          weatherData,
        });
      });

    // this.setState({
    //   isLoading: true,
    //   weatherData: {
    //     temp: 23.06,
    //     feels_like: 24.76,
    //     temp_min: 22,
    //     temp_max: 24,
    //     humidity: 69,
    //     city: 'Banpobondong',
    //     wind_speed: 1,
    //     wind_deg: 270,
    //     country: 'KR',
    //     sunrise: '2020-06-26T20:12:58.000Z',
    //     sunset: '2020-06-27T10:57:01.000Z',
    //     desc: '튼구름',
    //     icon: 'weather-cloudy',
    //   },
    // });
  }

  render() {
    const { isLoading, weatherData } = this.state;
    return isLoading ? <Weather data={weatherData} /> : <Loading />;
  }
}
