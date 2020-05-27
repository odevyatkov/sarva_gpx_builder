import {Position} from '@turf/helpers/lib/geojson';

export default function buildNamesDict(positions: Position[]): Record<'numeric'|'alphabet', Record<number, string>> {
  let numericCoords = [];
  let alphabetCoords = [];
  positions.forEach((position: Position) => {
    if (!numericCoords.includes(position[0])) {
      numericCoords.push(position[0]);
    }
    if (!alphabetCoords.includes(position[1])) {
      alphabetCoords.push(position[1]);
    }
  });
  numericCoords = numericCoords.sort(function(a, b){return a-b});
  alphabetCoords = alphabetCoords.sort(function(a, b){return b-a});

  const alphabet = getAlphabet();
  const alphabetCount = alphabet.length;
  const numbers = getNumericList(numericCoords.length);
  const numbersCount = numbers.length;

  const dict: Record<'numeric'|'alphabet', Record<number, string>> = {
    numeric: {},
    alphabet: {},
  };

  numericCoords.forEach((curCoord, curCoordIndex) => {
    dict.numeric[curCoord] = getIndex(curCoordIndex, numbersCount - 1, numbers);
  });
  alphabetCoords.forEach((curCoord, curCoordIndex) => {
    dict.alphabet[curCoord] = getIndex(curCoordIndex, alphabetCount - 1, alphabet);
  });
  return dict;
}

function getIndex(index: number, maxCount: number, list: string[]): string {
  if (index <= maxCount) {
    return list[index];
  } else {
    const nextIndex = index % maxCount;
    if (nextIndex) {
      return `${list[Math.floor(index / maxCount)]}${getIndex(nextIndex, maxCount, list)}`;
    } else  {
      return list[Math.floor(index / maxCount)];
    }
  }
}

function getAlphabet(): string[] {
  const abc = [];
  for (let i = 65; i < 91; i++) {
    abc.push(String.fromCharCode(i));
  }
  return abc;
}

function getNumericList(count: number): string[] {
  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push(`${i}`);
  }
  return list;
}
