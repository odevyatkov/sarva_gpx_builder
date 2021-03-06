import {
  Position,
} from '@turf/helpers/lib/geojson';
import {
  buildGPX,
  GarminBuilder,
} from 'gpx-builder';
import Bounds from 'gpx-builder/dist/builder/BaseBuilder/models/Bounds';
import Copyright from 'gpx-builder/dist/builder/BaseBuilder/models/Copyright';
import packageInfo from '../../package.json';

const {
  Point,
  Metadata,
} = GarminBuilder.MODELS;

export default function buildGpx(
  extent: [number, number, number, number],
  positions: Position[],
  nameDict: Record<'numeric'|'alphabet', Record<number, string>>
): string {
  const gpxData = new GarminBuilder();

  const points = positions.map((position: Position) => {
    return new Point(position[1], position[0], {
      name: `${nameDict.alphabet[position[1]]}${nameDict.numeric[position[0]]}`,
      time: new Date(),
    });
  });
  const copyright = new Copyright(`${packageInfo.name} v${packageInfo.version}`, {});
  const meta = new Metadata({
    copyright,
    time: new Date(),
    bounds: new Bounds(extent[1], extent[0], extent[3], extent[2]),
  });
  gpxData
    .setMetadata(meta)
    .setWayPoints(points);
  return buildGPX(gpxData.toObject());
}
