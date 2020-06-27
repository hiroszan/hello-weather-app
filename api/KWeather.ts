import env from '../env';
import { mapToGrid, basetime } from './Geomap';
import axios from 'axios';

export async function getWeather(location: GeoLocation) {
  const { latitude, longitude } = location;

  const m = new Date();
  const YYMMDD =
    m.getFullYear() + ('0' + (m.getMonth() + 1)).slice(-2) + ('0' + m.getDate()).slice(-2);

  const grid = mapToGrid(latitude, longitude);

  const url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst' +
    `?serviceKey=${
      env.K_WEATHER_API_KEY
    }&dataType=JSON&base_date=${YYMMDD}&base_time=${basetime()}&nx=${grid.x}&ny=${grid.y}`;

  console.log(url);

  const resp = await axios.get(url);
  const items = resp.data;
  console.log(items);

  return items;
}
