import {
  Position,
} from '@turf/helpers/lib/geojson';

export default function parsePositionFromString(positionString: string): Position {
  const point = positionString.split(',');
  if (point.length !== 2) {
    throw new Error(`Invalid position coordinates format. Use "lat,lng" instead of "${positionString}"`);
  }
  return [
    parseFloat(point[1]),
    parseFloat(point[0]),
  ];
}
