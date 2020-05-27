import {Position} from '@turf/helpers/lib/geojson';
import destination from '@turf/destination';

export default function buildExtent(center: Position, radius: number): [number, number, number, number] {
  const rightCenterPoint = destination({
    type: 'Point',
    coordinates: center,
  }, radius, 0).geometry.coordinates;
  const topCenterPoint = destination({
    type: 'Point',
    coordinates: center,
  }, radius, -90).geometry.coordinates;
  const latDiff = center[0] - topCenterPoint[0];
  const lngDiff = rightCenterPoint[1] - center[1];

  // [minX, minY, maxX, maxY]
  return [
    center[0] - latDiff,
    center[1] - lngDiff,
    center[0] + latDiff,
    center[1] + lngDiff,
  ];
}
