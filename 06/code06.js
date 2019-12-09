const fs = require('fs');

const buffer = fs.readFileSync('./input.txt');
const input = buffer.toString();

// const input = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN`;

const orbits = input.split('\n').map(item => item.split(')'));

const map = {};
let orbitsCount = 0;

const buildMap = () => {
  orbits.forEach(orbit => {
    map[orbit[1]] = { dest: orbit[0], isTail: true };
    if (map[orbit[0]]) {
      map[orbit[0]] = { ...map[orbit[0]], isTail: false };
    }
  });
};

const computeOrbits = key => {
  if (map[key] && map[key].dest) {
    orbitsCount++;
    computeOrbits(map[key].dest);
  }
};

const computeAllOrbits = () => {
  buildMap();
  for (let [key, value] of Object.entries(map)) {
    // if (value.isTail) {
    computeOrbits(key);
    // }
  }
};

// computeAllOrbits();
// console.log('TCL: orbitsCount', orbitsCount);

const computeMinimum = () => {
  buildMap();
  const youDirectOrbit = map['YOU'].dest;
  const sanDirectOrbit = map['SAN'].dest;

  const youOrbits = [];
  buildAllOrbits(youDirectOrbit, youOrbits);
  const sanOrbits = [];
  buildAllOrbits(sanDirectOrbit, sanOrbits);

  const commonOrbits = youOrbits.filter(value => sanOrbits.includes(value));
  const bestOrbit = commonOrbits[0];

  const youCount = computeOrbitCount(youDirectOrbit, bestOrbit);

  const sanCount = computeOrbitCount(sanDirectOrbit, bestOrbit);

  console.log(youCount + sanCount);
};

const buildAllOrbits = (key, orbits) => {
  if (map[key] && map[key].dest) {
    orbits.push(map[key].dest);
    buildAllOrbits(map[key].dest, orbits);
  }
};

const computeOrbitCount = (key, dest) => {
  let count = 0;

  const compute = key => {
    if (map[key] && map[key].dest) {
      count++;
      if (map[key].dest.localeCompare(dest) !== 0) {
        compute(map[key].dest);
      }
    }
  };

  compute(key);

  return count;
};

computeMinimum();
