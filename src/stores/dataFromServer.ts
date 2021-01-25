import { Bounds } from '../models/Bounds';

export interface DataFromClient {
  current_health: number;
  screen_location_y: number;
  screen_location_x: number;
  screen_width: number;
  screen_height: number;
  overload_is_active: boolean;
  absorption_points: number;
  guzzle_bounds: Bounds | null;
  absorption_bounds: Bounds | null;
  overload_bounds: Bounds | null;
  markers: Marker[];
}

export interface Marker {
  name: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export function parseDataFromClient(data: any): DataFromClient {
  let out = {
    markers: [],
  } as any;

  let screen_location_x = data.screen_location_x.split('|')[1];
  let screen_location_y = data.screen_location_y.split('|')[1];

  Object.keys(data).forEach((serverKey) => {
    // splits from server `number|123` or `boolean|false`

    let pair = data[serverKey].split('|');
    let key = pair[0];
    let value = pair[1];

    switch (key) {
      case 'bounds':
        out[serverKey] = getBoundsFromString(
          value,
          screen_location_x,
          screen_location_y
        );
        break;
      case 'number':
        out[serverKey] = value * 1;
        break;

      case 'boolean':
        out[serverKey] = value == 'true';
        break;
      case 'marker':
        let index = out.markers.findIndex((x) => x.name == serverKey);
        let split = value.split(',');
        let left = parseInt(split[0]);
        let right = parseInt(split[1]);
        let top = parseInt(split[2]);
        let bottom = parseInt(split[3]);

        if (index == -1) {
          out.markers.push({
            name: serverKey,
            left,
            right,
            top,
            bottom,
          });
        } else {
          out.markers[index] = {
            name: serverKey,
            left,
            right,
            top,
            bottom,
          };
        }

        break;
      default:
        throw Error('undetermined type from server');
    }
  });

  return out as DataFromClient;
}

export function getBoundsFromString(
  str: string,
  screen_location_x: number,
  screen_location_y: number
): Bounds | null {
  const SCREEN_RATIO = 1.5;

  if (str == 'null') {
    return null;
  }

  let split = str.split(',');

  return {
    x: parseInt(screen_location_x + '') + parseInt(split[0]) * SCREEN_RATIO,
    y: parseInt(screen_location_y + '') + parseInt(split[1]) * SCREEN_RATIO,
    width: parseInt(split[2]),
    height: parseInt(split[3]),
  } as Bounds;
}
