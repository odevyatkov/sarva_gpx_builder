import {
  Position,
} from '@turf/helpers/lib/geojson';
import parsePositionFromString from '../parsers/parsePositionFromString';
import buildExtent from './buildExtent';

interface RowData {
  center?: string;
  radius?: number;
  cell?: number;
  leftBottom?: string;
  rightTop?: string;
}

export function getExtent(data: RowData): [number,number,number,number] {
  if (data.center && data.radius) {
    const centerPosition: Position = parsePositionFromString(data.center);

    return  buildExtent(centerPosition, data.radius);
  } else if (data.leftBottom && data.rightTop) {
    const leftBottomPosition: Position = parsePositionFromString(data.leftBottom);
    const rightTopPosition: Position = parsePositionFromString(data.rightTop);

    return [
      leftBottomPosition[0],
      leftBottomPosition[1],
      rightTopPosition[0],
      rightTopPosition[1],
    ];
  } else {
    throw new Error('Invalid params');
  }
}

export function getDefaultFileName(data: RowData): string {
  if (data.center && data.radius && data.cell) {
    const centerPosition: Position = parsePositionFromString(data.center);

    return `${centerPosition[0]}_${centerPosition[1]}_${data.radius}x${data.radius}_${data.cell}.gpx`;
  } else if (data.leftBottom && data.rightTop) {
    const leftBottomPosition: Position = parsePositionFromString(data.leftBottom);
    const rightTopPosition: Position = parsePositionFromString(data.rightTop);

    return `${leftBottomPosition[0]}_${leftBottomPosition[1]}_${rightTopPosition[0]}_${rightTopPosition[1]}_${data.cell}.gpx`;
  } else {
    throw new Error('Invalid params');
  }
}
