const fs = require('fs');

const buffer = fs.readFileSync('./input.txt');
const [path1, path2] = buffer
  .toString()
  .split('\n')
  .map(path => path.split(','));

const executeInstructions = (pos, instructions, index, matrix, pathNumber) => {
  const instruction = instructions[index];
  const direction = instruction.slice(0, 1);
  const length = Number(instruction.slice(1));
  const { newPos } = {
    R: goRight,
    L: goLeft,
    U: goUp,
    D: goDown,
  }[direction](pos, length, matrix, pathNumber);
  if (index + 1 < instructions.length) {
    executeInstructions(newPos, instructions, index + 1, matrix, pathNumber);
  } else {
    return;
  }
};

const goRight = (pos, length, matrix, pathNumber) => {
  for (let i = 1; i <= length; i++) {
    if (matrix[pos[0] + i] !== undefined) {
      matrix[pos[0] + i][pos[1]] = {
        ...matrix[pos[0] + i][pos[1]],
        [pathNumber]: true,
      };
    }
  }
  return { newPos: [pos[0] + length, pos[1]] };
};

const goLeft = (pos, length, trace, pathNumber) => {
  for (let i = 1; i <= length; i++) {
    if (matrix[pos[0] - i] !== undefined) {
      matrix[pos[0] - i][pos[1]] = {
        ...matrix[pos[0] - i][pos[1]],
        [pathNumber]: true,
      };
    }
  }
  return { newPos: [pos[0] - length, pos[1]] };
};

const goUp = (pos, length, trace, pathNumber) => {
  for (let i = 1; i <= length; i++) {
    if (matrix[pos[0]] !== undefined) {
      matrix[pos[0]][pos[1] + i] = {
        ...matrix[pos[0]][pos[1] + i],
        [pathNumber]: true,
      };
    }
  }
  return { newPos: [pos[0], pos[1] + length] };
};

const goDown = (pos, length, trace, pathNumber) => {
  for (let i = 1; i <= length; i++) {
    if (matrix[pos[0]] !== undefined) {
      matrix[pos[0]][pos[1] - i] = {
        ...matrix[pos[0]][pos[1] - i],
        [pathNumber]: true,
      };
    }
  }
  return { newPos: [pos[0], pos[1] - length] };
};

// const testPath1 = ['R8', 'U5', 'L5', 'D3'];
// const testPath2 = ['U7', 'R6', 'D4', 'L4'];

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

const size = 6000;
const matrix = new Array(size).fill({}).map(() => new Array(size).fill({}));
executeInstructions([size / 2, size / 2], path1, 0, matrix, 'a');
executeInstructions([size / 2, size / 2], path2, 0, matrix, 'b');

const distances = [];
for (i = 0; i < size; i++) {
  for (j = 0; j < size; j++) {
    if (matrix[i][j]['a'] && matrix[i][j]['b']) {
      distances.push(i - size / 2 + j - size / 2);
      console.log(i, j);
    }
  }
}

console.log('TCL: distances', distances);
console.log(Math.min(...distances.map(distance => Math.abs(distance))));

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

// let sameCoords = [];

// for (let i = 0; i < 2000; i++) {
//   for (let j = 0; j < 2000; j++) {
//     console.log(i, j);
//     let isSame1 = false;
//     trace1.forEach(coords => {
//       if (coords[0] === i && coords[1] === j) {
//         console.log('TCL: trace1 coords', coords);
//         isSame1 = true;
//       }
//     });
//     if (isSame1) {
//       let isSame2 = false;
//       trace2.forEach(coords => {
//         if (coords[0] === i && coords[1] === j) {
//           console.log('TCL: trace2 coords', coords);
//           isSame2 = true;
//         }
//       });

//       if (isSame1 && isSame2) {
//         sameCoords.push(i + j);
//       }
//     }
//   }
// }

// console.log('TCL: sameCoords', sameCoords);
// console.log('MANHATTAN', Math.min(...sameCoords));

// const lookForCoordsAtDistance = (distance) => {

// }
