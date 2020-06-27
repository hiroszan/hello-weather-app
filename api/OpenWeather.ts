import axios from 'axios';
import env from '../env';

export interface WeatherData {
  condition: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  city: string;
  wind_speed: number;
  wind_deg: number;
  country: string;
  sunrise: Date;
  sunset: Date;
  desc: string;
  icon: string;
}

export default class OpenWeather {
  static async GetWeather(location: GeoLocation): Promise<WeatherData> {
    const { latitude, longitude } = location;

    const url =
      'https://api.openweathermap.org/data/2.5/weather' +
      `?lat=${latitude}&lon=${longitude}&appid=${env.OPEN_WEATHER_API_KEY}&units=metric&lang=kr`;

    const resp = await axios.get(url);
    const result: OpenWeatherResult = resp.data;

    //console.log(url);
    //console.log(JSON.stringify(result));

    return this._ToWeatherData(result);
  }

  private static _ToWeatherData(result: OpenWeatherResult): WeatherData {
    return {
      condition: result.weather[0].main,
      temp: result.main.temp,
      feels_like: result.main.feels_like,
      temp_min: result.main.temp_min,
      temp_max: result.main.temp_max,
      humidity: result.main.humidity,
      city: result.name,
      wind_speed: result.wind?.speed,
      wind_deg: result.wind?.deg,
      country: result.sys.country,
      sunrise: new Date(result.sys.sunrise * 1000),
      sunset: new Date(result.sys.sunset * 1000),
      desc: result.weather[0].description,
      icon: `https://openweathermap.org/img/w/${result.weather[0].icon}.png`,
    };
  }
}

// https://openweathermap.org/current#data
interface OpenWeatherResult {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Clouds {
  all: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}
