import pointGrid from '@turf/point-grid';
import {
  Position,
  Feature, Geometry,
} from '@turf/helpers/lib/geojson';

export default function buildGrid(extent: [number, number, number, number], cellSide: number): Position[] {
  return pointGrid(extent, cellSide).features.map((feature: Feature<Geometry>) => {
    return feature.geometry.coordinates;
  });
}
