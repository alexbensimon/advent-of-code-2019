const fs = require('fs');

const buffer = fs.readFileSync('./input.txt');
const list = buffer
  .toString()
  .split(',')
  .map(val => Number(val));

const add = (list, position) => {
  const newList = [...list];
  newList[list[position + 3]] =
    list[list[position + 1]] + list[list[position + 2]];
  return newList;
};

const multiply = (list, position) => {
  const newList = [...list];
  newList[list[position + 3]] =
    list[list[position + 1]] * list[list[position + 2]];
  return newList;
};

const opcodeToOperationMap = {
  1: add,
  2: multiply,
};

const execute = (list, position) => {
  const opcode = list[position];
  if (opcode === 99) return list;
  const newList = opcodeToOperationMap[opcode](list, position);
  return execute(newList, position + 4);
};

const initList = (noun, verb) => {
  const newList = [...list];
  newList[1] = noun;
  newList[2] = verb;
  return newList;
};

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    const testList = initList(noun, verb);
    const res = execute(testList, 0);
    if (res[0] === 19690720) {
      console.log('TCL: noun', noun);
      console.log('TCL: verb', verb);
      console.log('RES', 100 * noun + verb);
      return;
    }
  }
}

// 6534 --> wrong
