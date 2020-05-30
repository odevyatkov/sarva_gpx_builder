import {
  Position,
} from '@turf/helpers/lib/geojson';
import parsePositionFromString from '../parsers/parsePositionFromString';
import buildExtent from './buildExtent';

export interface RowData {
  center?: string;
  radius?: number;
  cell?: number;
  fromPoint?: string;
  toPoint?: string;
}

export function getExtent(data: RowData): [number,number,number,number] {
  if (data.center && data.radius) {
    const centerPosition: Position = parsePositionFromString(data.center);

    return  buildExtent(centerPosition, data.radius);
  } else if (data.fromPoint && data.fromPoint) {
    const {
      minPoint,
      maxPoint,
    } = minMaxPoint(data.fromPoint, data.toPoint);

    return [
      maxPoint[0],
      maxPoint[1],
      minPoint[0],
      minPoint[1],
    ];
  } else {
    throw new Error('Invalid params');
  }
}

export function getDefaultFileName(data: RowData): string {
  if (data.center && data.radius && data.cell) {
    const centerPosition: Position = parsePositionFromString(data.center);

    return `${centerPosition[0]}_${centerPosition[1]}_${data.radius}x${data.radius}_${data.cell}.gpx`;
  } else if (data.fromPoint && data.toPoint) {
    const {
      minPoint,
      maxPoint,
    } = minMaxPoint(data.fromPoint, data.toPoint);

    return `${minPoint[0]}_${minPoint[1]}_${maxPoint[0]}_${maxPoint[1]}_${data.cell}.gpx`;
  } else {
    throw new Error('Invalid params');
  }
}

function minMaxPoint(firstPoint: string, secondPoint: string): {minPoint: [number, number], maxPoint: [number, number]} {
  const firstPosition: Position = parsePositionFromString(firstPoint);
  const secondPosition: Position = parsePositionFromString(secondPoint);

  return {
    minPoint: [
      Math.max(firstPosition[0], secondPosition[0]),
      Math.max(firstPosition[1], secondPosition[1]),
    ],
    maxPoint: [
      Math.min(firstPosition[0], secondPosition[0]),
      Math.min(firstPosition[1], secondPosition[1]),
    ],
  };
}
