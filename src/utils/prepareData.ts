import {
  Position,
} from '@turf/helpers/lib/geojson';
import distance from '@turf/distance';
import parsePositionFromString from '../parsers/parsePositionFromString';
import buildExtent from './buildExtent';
import destination from "@turf/destination";

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

    return buildExtent(centerPosition, data.radius);
  } else if (data.fromPoint && data.fromPoint && data.cell) {
    const {
      minPoint,
      maxPoint,
    } = minMaxPoint(data.fromPoint, data.toPoint, data.cell);

    return [
      minPoint[0],
      minPoint[1],
      maxPoint[0],
      maxPoint[1],
    ];
  } else {
    throw new Error('Invalid params');
  }
}

export function getDefaultFileName(data: RowData): string {
  if (data.center && data.radius && data.cell) {
    const centerPosition: Position = parsePositionFromString(data.center);

    return `${centerPosition[1]}_${centerPosition[0]}_${data.radius}x${data.radius}_${data.cell}`;
  } else if (data.fromPoint && data.toPoint && data.cell) {
    const {
      minPoint,
      maxPoint,
    } = minMaxPoint(data.fromPoint, data.toPoint, data.cell);

    return `${minPoint[1]}_${minPoint[0]}_${maxPoint[1]}_${maxPoint[0]}_${data.cell}`;
  } else {
    throw new Error('Invalid params');
  }
}

function minMaxPoint(firstPoint: string, secondPoint: string, cellSize: number): {minPoint: [number, number], maxPoint: [number, number]} {
  const firstPosition: Position = parsePositionFromString(firstPoint);
  const secondPosition: Position = parsePositionFromString(secondPoint);
  const minPoint: [number, number] = [
    Math.min(firstPosition[0], secondPosition[0]),
    Math.min(firstPosition[1], secondPosition[1]),
  ];

  const pointFirstCoordDistance = distance({
      type: 'Point',
      coordinates: minPoint,
    },
    {
      type: 'Point',
      coordinates: [
        minPoint[0],
        Math.max(firstPosition[1], secondPosition[1]),
      ],
    }
  );
  const pointSecondCoordDistance = distance({
      type: 'Point',
      coordinates: minPoint,
    },
    {
      type: 'Point',
      coordinates: [
        Math.max(firstPosition[0], secondPosition[0]),
        minPoint[1],
      ],
    }
  );

  const firsCoordDistance = Math.ceil(pointFirstCoordDistance / cellSize) * cellSize;
  const secondCoordDistance = Math.ceil(pointSecondCoordDistance / cellSize) * cellSize;
  const maxPointFirstCoord = destination({
    type: 'Point',
    coordinates: minPoint,
  }, firsCoordDistance, 90).geometry.coordinates;
  const maxPointSecondCoord = destination({
    type: 'Point',
    coordinates: minPoint,
  }, secondCoordDistance, 0).geometry.coordinates;

  return {
    minPoint,
    maxPoint: [
      maxPointFirstCoord[0],
      maxPointSecondCoord[1],
    ],
  };
}
