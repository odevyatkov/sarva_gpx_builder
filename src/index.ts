#!/usr/bin/env node
import {
  Position,
} from '@turf/helpers/lib/geojson';
import * as fs from 'fs';

import parsePositionFromString from './parsers/parsePositionFromString';
import buildGrid from './utils/buildGrid';
import buildGpx from './utils/buildGpx';
import buildExtent from './utils/buildExtent';
import buildNamesDict from './utils/buildNamesDict';

const argv = require('yargs').argv;

const center = argv.center;
const radius = parseFloat(argv.radius);
const cell = parseFloat(argv.cell);
if (!center || !radius || !cell) {
  console.warn('use command: npm run start -- --center=lat,lng --radius=number --cell=number');
  process.exit(0);
}

const centerPosition: Position = parsePositionFromString(center);
const extent = buildExtent(centerPosition, radius);
const grid = buildGrid(extent, cell);
const nameDict: Record<'numeric'|'alphabet', Record<number, string>> = buildNamesDict(grid);
const xml = buildGpx(extent, grid, nameDict);
const fileName = `${centerPosition[0]}_${centerPosition[1]}_${radius}x${radius}_${cell}.gpx`;
fs.writeFile(fileName, xml, function (err) {
  if (err) return console.log(err);
  console.log(`Look at ${fileName}`);
});
