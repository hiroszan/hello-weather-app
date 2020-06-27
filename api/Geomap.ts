const NX = 149; // X축 격자점 수
const NY = 253; // Y축 격자점 수

const Re = 6371.00877; //  지도반경
const grid = 5.0; //  격자간격 (km)
let slat1 = 30.0; //  표준위도 1
let slat2 = 60.0; //  표준위도 2
let olon = 126.0; //  기준점 경도
let olat = 38.0; //  기준점 위도
const xo = 210 / grid; //  기준점 X좌표
const yo = 675 / grid; //  기준점 Y좌표

const PI = Math.asin(1.0) * 2.0;
const DEGRAD = PI / 180.0;
const RADDEG = 180.0 / PI;

const re = Re / grid;
slat1 = slat1 * DEGRAD;
slat2 = slat2 * DEGRAD;
olon = olon * DEGRAD;
olat = olat * DEGRAD;

let sn = Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
let ro = Math.tan(PI * 0.25 + olat * 0.5);
ro = (re * sf) / Math.pow(ro, sn);

export function mapToGrid(latitude: number, longitude: number): { x: number; y: number } {
  let ra = Math.tan(PI * 0.25 + latitude * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = longitude * DEGRAD - olon;
  if (theta > PI) theta -= 2.0 * PI;
  if (theta < -PI) theta += 2.0 * PI;
  theta *= sn;
  let x = ra * Math.sin(theta) + xo;
  let y = ro - ra * Math.cos(theta) + yo;
  x = Math.floor(x + 1.5);
  y = Math.floor(y + 1.5);
  return { x, y };
}

export function gridToMap(x: number, y: number): { latitude: number; longitude: number } {
  x = x - 1;
  y = y - 1;
  let xn = x - xo;
  let yn = ro - y + yo;
  let ra = Math.sqrt(xn * xn + yn * yn);
  if (sn < 0.0) ra = -ra;
  let alat = Math.pow((re * sf) / ra, 1.0 / sn);
  alat = 2.0 * Math.atan(alat) - PI * 0.5;
  let theta = 0.0;
  if (Math.abs(xn) <= 0.0) {
    theta = 0.0;
  } else {
    if (Math.abs(yn) <= 0.0) theta = PI * 0.5;
    if (xn < 0.0) theta = -theta;
    else theta = Math.atan2(xn, yn);
  }

  let alon = theta / sn + olon;
  let latitude = alat * RADDEG;
  let longitude = alon * RADDEG;

  return { latitude, longitude };
}

/*
- Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
- API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
*/
const kBaseTimeList: number[] = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];
export function basetime() {
  const m = new Date();
  const HHmm = ('0' + m.getHours()).slice(-2) + ('0' + m.getMinutes()).slice(-2);
  const tm = parseInt(HHmm);
  for (let i = 0; i < kBaseTimeList.length; i++) {
    let elem = kBaseTimeList[i];
    let uptm = elem + 20;
    if (tm <= uptm) {
      const bm = i == 0 ? kBaseTimeList[kBaseTimeList.length - 1] : elem;
      return ('0' + bm).slice(-2);
    }
  }
  return '0200';
}
