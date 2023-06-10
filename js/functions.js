const isNormalLength = function (string, length) {
  return string.length <= length;
};

isNormalLength('проверяемая строка', 20); // true

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
  const normalizedString = typeof rowData === 'string' ? rowData : rowData.toString();
  let tmpString = '';

  for (let i = 0; i <= normalizedString.length - 1; i++) {
    if (!isNaN(parseInt(normalizedString[i], 10))) {
      tmpString += normalizedString[i];
    }
  }

  return tmpString.length > 0 ? tmpString : NaN;
};

getNumber('2023 год'); // 2023
