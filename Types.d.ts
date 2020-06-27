declare interface GeoLocation {
  latitude: number;
  longitude: number;
}

declare interface KWResult {
  response: KWResponse;
}

declare interface KWResponse {
  header: KWHeader;
  body: KWBody;
}

declare interface KWHeader {
  resultCode: string;
  resultMsg: string;
}

declare interface KWBody {
  dataType: string;
  items: KWItems;
  pageNo: number;
  numOfRows: number;
  totalCount: number;
}

declare interface KWItems {
  item: KWItem[];
}

declare interface KWItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}
