const start = 271973;
const end = 785961;

const isSameString = (i, j) => {
  return i.localeCompare(j) === 0;
};

const existsAndDifferentOrTrue = (i, j) => {
  if (!i || !j) {
    return true;
  }
  return !isSameString(i, j);
};

const twoAdjacentSame = value => {
  const valueString = String(value);
  for (let i = 1; i < valueString.length; i++) {
    if (
      isSameString(valueString[i], valueString[i - 1]) &&
      existsAndDifferentOrTrue(valueString[i], valueString[i - 2]) &&
      existsAndDifferentOrTrue(valueString[i], valueString[i + 1])
    ) {
      return true;
    }
  }
  return false;
};

const neverDecrease = value => {
  const valueString = String(value);
  for (let i = 1; i < valueString.length; i++) {
    if (Number(valueString[i] < Number(valueString[i - 1]))) {
      return false;
    }
  }
  return true;
};

let differentPasswordNumber = 0;

for (let i = start; i < end; i++) {
  if (twoAdjacentSame(i) && neverDecrease(i)) {
    differentPasswordNumber++;
  }
}

console.log(differentPasswordNumber);
