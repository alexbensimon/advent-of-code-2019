const fs = require('fs');

const buffer = fs.readFileSync('./input.txt');
const data = buffer.toString();

const WIDTH = 25;
const HEIGHT = 6;
const SIZE_OF_LAYER = WIDTH * HEIGHT;
const numberOfLayers = data.length / SIZE_OF_LAYER;

const layers = [];
for (let i = 0; i < numberOfLayers - 1; i++) {
  layers.push(data.slice(i * SIZE_OF_LAYER, (i + 1) * SIZE_OF_LAYER));
}

/*

const computeNumberOfChars = (text, char) => {
  return text.split(char).length - 1;
};

const numberOfZeros = [];
layers.forEach(layer => {
  numberOfZeros.push(computeNumberOfChars(layer, '0'));
});

const { index: layerWithMinNumberOfZeros } = numberOfZeros.reduce(
  (prev, curr, i) => {
    return curr < prev.minNumberOfZeros
      ? { minNumberOfZeros: curr, index: i }
      : prev;
  },
  { minNumberOfZeros: 1000, index: -1 },
);

const res =
  computeNumberOfChars(layers[layerWithMinNumberOfZeros], '1') *
  computeNumberOfChars(layers[layerWithMinNumberOfZeros], '2');

console.log('TCL: res', res);

*/

// on a le nombre de pixels de chaque layer
// on parcourt en for le pixel de chaque layer jusqu'à trouver le pixel visible

const image1d = [];

for (let i = 0; i < SIZE_OF_LAYER; i++) {
  for (let j = 0; j < numberOfLayers; j++) {
    if (layers[j][i] !== '2') {
      image1d.push(layers[j][i] === '0' ? 'X' : ' ');
      break;
    }
  }
}

for (let i = 0; i < HEIGHT; i++) {
  console.log(image1d.slice(i * WIDTH, (i + 1) * WIDTH).join(''));
}
