const isNormalLength = (string, length) => string.length <= length;
// isNormalLength('проверяемая строка', 20); // true

const isPalindrome = function (string) {
  const normString = string.toUpperCase().replace(/ /g, '');
  // const normString = string.toUpperCase().replaceAll(' ', ''); // or
  let reverseString = '';

  for (let i = normString.length - 1; i >= 0; i--) {
    reverseString += normString[i];
  }

  return normString === reverseString;
};

isPalindrome('топот'); // true

const getNumber = function (rowData) {
  const normalizedString = rowData.toString();
  let tmpString = '';

  for (let i = 0; i <= normalizedString.length - 1; i++) {
    if (!isNaN(parseInt(normalizedString[i], 10))) {
      tmpString += normalizedString[i];
    }
  }

  return parseInt(tmpString, 10);
};

// getNumber('2023 год'); // 2023
//getNumber(1.5); // 15

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getArrayElementByIndex = (elements, index) => elements[index];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomNumberFromRange = (startNumber, endNumber, isUnique = true) => {
  const previousValues = [];

  if (
    !isFinite(startNumber) ||
    !isFinite(endNumber) ||
    !Number.isInteger(startNumber) ||
    !Number.isInteger(endNumber)
  ) {
    return NaN;
  }

  return function () {
    let currentValue = getRandomInteger(startNumber, endNumber);

    if (isUnique) {
      if (previousValues.length >= endNumber - startNumber + 1) {
        return null;
      }

      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(startNumber, endNumber);
      }
      previousValues.push(currentValue);
    }

    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {
  getNumber,
  isPalindrome,
  isNormalLength,
  getRandomInteger,
  getArrayElementByIndex,
  getRandomArrayElement,
  createRandomNumberFromRange,
  isEscapeKey,
  isEnterKey,
};
