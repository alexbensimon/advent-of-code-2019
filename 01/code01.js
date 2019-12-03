const fs = require('fs');

const computeFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel >= 0 ? fuel + computeFuel(fuel) : 0;
};

const buffer = fs.readFileSync('./input.txt');
const massList = buffer
  .toString()
  .split('\n')
  .map(mass => Number(mass));

const res = massList.reduce((prev, curr) => prev + computeFuel(curr), 0);
console.log('TCL: res', res);

// 3320226
