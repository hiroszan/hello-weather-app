import axios from 'axios';
import env from '../env';

const kWeatherMap: { [key: string]: WeatherDesc } = {
  '200': {
    id: 200,
    main: 'Thunderstorm',
    description: 'thunderstorm with light rain',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '201': {
    id: 201,
    main: 'Thunderstorm',
    description: 'thunderstorm with rain',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '202': {
    id: 202,
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy rain',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '210': {
    id: 210,
    main: 'Thunderstorm',
    description: 'light thunderstorm',
    icon: 'weather-lightning',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '211': {
    id: 211,
    main: 'Thunderstorm',
    description: 'thunderstorm',
    icon: 'weather-lightning',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '212': {
    id: 212,
    main: 'Thunderstorm',
    description: 'heavy thunderstorm',
    icon: 'weather-lightning',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '221': {
    id: 221,
    main: 'Thunderstorm',
    description: 'ragged thunderstorm',
    icon: 'weather-lightning',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '230': {
    id: 230,
    main: 'Thunderstorm',
    description: 'thunderstorm with light drizzle',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '231': {
    id: 231,
    main: 'Thunderstorm',
    description: 'thunderstorm with drizzle',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '232': {
    id: 232,
    main: 'Thunderstorm',
    description: 'thunderstorm with heavy drizzle',
    icon: 'weather-lightning-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '300': {
    id: 300,
    main: 'Drizzle',
    description: 'light intensity drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '301': {
    id: 301,
    main: 'Drizzle',
    description: 'drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '302': {
    id: 302,
    main: 'Drizzle',
    description: 'heavy intensity drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '310': {
    id: 310,
    main: 'Drizzle',
    description: 'light intensity drizzle rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '311': {
    id: 311,
    main: 'Drizzle',
    description: 'drizzle rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '312': {
    id: 312,
    main: 'Drizzle',
    description: 'heavy intensity drizzle rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '313': {
    id: 313,
    main: 'Drizzle',
    description: 'shower rain and drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '314': {
    id: 314,
    main: 'Drizzle',
    description: 'heavy shower rain and drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '321': {
    id: 321,
    main: 'Drizzle',
    description: 'shower drizzle',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '500': {
    id: 500,
    main: 'Rain',
    description: 'light rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '501': {
    id: 501,
    main: 'Rain',
    description: 'moderate rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '502': {
    id: 502,
    main: 'Rain',
    description: 'heavy intensity rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '503': {
    id: 503,
    main: 'Rain',
    description: 'very heavy rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '504': {
    id: 504,
    main: 'Rain',
    description: 'extreme rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '511': {
    id: 511,
    main: 'Rain',
    description: 'freezing rain',
    icon: 'weather-pouring',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '520': {
    id: 520,
    main: 'Rain',
    description: 'light intensity shower rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '521': {
    id: 521,
    main: 'Rain',
    description: 'shower rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '522': {
    id: 522,
    main: 'Rain',
    description: 'heavy intensity shower rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '531': {
    id: 531,
    main: 'Rain',
    description: 'ragged shower rain',
    icon: 'weather-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '600': {
    id: 600,
    main: 'Snow',
    description: 'light snow',
    icon: 'weather-hail',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '601': {
    id: 601,
    main: 'Snow',
    description: 'Snow',
    icon: 'weather-snowy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '602': {
    id: 602,
    main: 'Snow',
    description: 'Heavy snow',
    icon: 'weather-snowy-heavy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '611': {
    id: 611,
    main: 'Snow',
    description: 'Sleet',
    icon: 'weather-partly-snowy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '612': {
    id: 612,
    main: 'Snow',
    description: 'Light shower sleet',
    icon: 'weather-partly-snowy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '613': {
    id: 613,
    main: 'Snow',
    description: 'Shower sleet',
    icon: 'weather-partly-snowy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '615': {
    id: 615,
    main: 'Snow',
    description: 'Light rain and snow',
    icon: 'weather-partly-snowy-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '616': {
    id: 616,
    main: 'Snow',
    description: 'Rain and snow',
    icon: 'weather-snowy-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '620': {
    id: 620,
    main: 'Snow',
    description: 'Light shower snow',
    icon: 'weather-snowy-heavy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '621': {
    id: 621,
    main: 'Snow',
    description: 'Shower snow',
    icon: 'weather-snowy-heavy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '622': {
    id: 622,
    main: 'Snow',
    description: 'Heavy shower snow',
    icon: 'weather-snowy-heavy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '701': {
    id: 701,
    main: 'Mist',
    description: 'mist',
    icon: 'weather-fog',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '711': {
    id: 711,
    main: 'Smoke',
    description: 'Smoke',
    icon: 'weather-fog',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '721': {
    id: 721,
    main: 'Haze',
    description: 'Haze',
    icon: 'weather-hazy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '731': {
    id: 731,
    main: 'Dust',
    description: 'sand/ dust whirls',
    icon: 'weather-fog',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '741': {
    id: 741,
    main: 'Fog',
    description: 'fog',
    icon: 'weather-fog',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '751': {
    id: 751,
    main: 'Sand',
    description: 'sand',
    icon: 'weather-windy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '761': {
    id: 761,
    main: 'Dust',
    description: 'dust',
    icon: 'weather-windy-variant',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '762': {
    id: 762,
    main: 'Ash',
    description: 'volcanic ash',
    icon: 'weather-windy-variant',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '771': {
    id: 771,
    main: 'Squall',
    description: 'squalls',
    icon: 'weather-partly-rainy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '781': {
    id: 781,
    main: 'Tornado',
    description: 'tornado',
    icon: 'weather-tornado',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '800': {
    id: 800,
    main: 'Clear',
    description: 'clear sky',
    icon: 'weather-sunny',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '801': {
    id: 801,
    main: 'Clouds',
    description: 'few clouds: 11-25%',
    icon: 'weather-cloudy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '802': {
    id: 802,
    main: 'Clouds',
    description: 'scattered clouds: 25-50%',
    icon: 'weather-cloudy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '803': {
    id: 803,
    main: 'Clouds',
    description: 'broken clouds: 51-84%',
    icon: 'weather-cloudy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
  '804': {
    id: 804,
    main: 'Clouds',
    description: 'overcast clouds: 85-100%',
    icon: 'weather-cloudy',
    gradients: ['#6dd5ed', '#6DD5FA', '#2980B9'],
  },
};

// TODO:
// clear icons
/**
  weather-sunny
  weather-sunset
  weather-night
 */

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
  gradients: string[];
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
    const idStr = result.weather[0].id.toString();
    const weather: WeatherDesc = kWeatherMap[idStr];
    return {
      condition: weather.main,
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
      desc: weather.description,
      icon: weather.icon,
      gradients: weather.gradients,
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

interface WeatherDesc extends Weather {
  gradients: string[];
}

interface WeatherWrap {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}
