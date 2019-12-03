const fs = require('fs');

const buffer = fs.readFileSync('./input.txt');
const [path1, path2] = buffer
  .toString()
  .split('\n')
  .map(path => path.split(','));

const executeInstructions = (pos, instructions, index, trace) => {
  const instruction = instructions[index];
  const direction = instruction.slice(0, 1);
  const length = Number(instruction.slice(1));
  const { newPos } = {
    R: goRight,
    L: goLeft,
    U: goUp,
    D: goDown,
  }[direction](pos, length, trace);
  if (index + 1 < instructions.length) {
    executeInstructions(newPos, instructions, index + 1, trace);
  } else {
    return;
  }
};

const goRight = (pos, length, trace) => {
  for (let i = 1; i <= length; i++) {
    trace.push([pos[0] + i, pos[1]]);
  }
  return { newPos: [pos[0] + length, pos[1]] };
};

const goLeft = (pos, length, trace) => {
  for (let i = 1; i <= length; i++) {
    trace.push([pos[0] - i, pos[1]]);
  }
  return { newPos: [pos[0] - length, pos[1]] };
};

const goUp = (pos, length, trace) => {
  for (let i = 1; i <= length; i++) {
    trace.push([pos[0], pos[1] + i]);
  }
  return { newPos: [pos[0], pos[1] + length] };
};

const goDown = (pos, length, trace) => {
  for (let i = 1; i <= length; i++) {
    trace.push([pos[0], pos[1] - i]);
  }
  return { newPos: [pos[0], pos[1] - length] };
};

const testPath1 = ['R8', 'U5', 'L5', 'D3'];
const testPath2 = ['U7', 'R6', 'D4', 'L4'];

// const testPath1 = [
//   'R75',
//   'D30',
//   'R83',
//   'U83',
//   'L12',
//   'D49',
//   'R71',
//   'U7',
//   'L72',
// ];
// const testPath2 = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'];

// const testPath1 = [
//   'R98',
//   'U47',
//   'R26',
//   'D63',
//   'R33',
//   'U87',
//   'L62',
//   'D20',
//   'R33',
//   'U53',
//   'R51',
// ];
// const testPath2 = [
//   'U98',
//   'R91',
//   'D20',
//   'R16',
//   'D67',
//   'R40',
//   'U7',
//   'R15',
//   'U6',
//   'R7',
// ];

const trace1 = [];
executeInstructions([0, 0], path1, 0, trace1);
const trace2 = [];
executeInstructions([0, 0], path2, 0, trace2);

// const sameCoords = [];
// trace1.forEach(coords1 => {
//   trace2.forEach(coords2 => {
//     if (coords1[0] === coords2[0] && coords1[1] === coords2[1])
//       sameCoords.push(coords1);
//   });
// });

// const manDistance = sameCoords.reduce((prev, curr) => {
//   if ((curr[0] !== 0 || curr[1] !== 0) && curr[0] + curr[1] < prev) {
//     return curr[0] + curr[1];
//   }
//   return prev;
// }, 10000000);

let sameCoords = [];

// while(i < 300) {
//   while(j < 300) {}
// }

for (let i = -200; i < 0; i++) {
  for (let j = -200; j < 0; j++) {
    console.log(i, j);
    let isSame1 = false;
    trace1.forEach(coords => {
      if (coords[0] === i && coords[1] === j) {
        console.log('TCL: trace1 coords', coords);
        isSame1 = true;
      }
    });
    if (isSame1) {
      let isSame2 = false;
      trace2.forEach(coords => {
        if (coords[0] === i && coords[1] === j) {
          console.log('TCL: trace2 coords', coords);
          isSame2 = true;
        }
      });

      if (isSame1 && isSame2) {
        sameCoords.push(Math.abs(i) + Math.abs(j));
      }
    }
  }
}

console.log('TCL: sameCoords', sameCoords);
console.log('MANHATTAN', Math.min(...sameCoords));
