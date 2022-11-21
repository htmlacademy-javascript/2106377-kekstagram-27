function getRandomPositiveInteger(min, max) {
  if (min < 0 && max < 0) {
    return NaN;
  }
  const firstNum = Math.ceil(min);
  const lastNum = Math.floor(max);
  const result = Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum;
  return result;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export{getRandomPositiveInteger, isEscapeKey};
