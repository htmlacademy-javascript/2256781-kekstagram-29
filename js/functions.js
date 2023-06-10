"use strict";

//================================================================
// Валидация
// {
let isGood = true;

const isNormalLength = function (string, length) {
  return string.length <= length ? true : false;
};

// Cтрока короче 20 символов
isGood = isNormalLength("проверяемая строка", 20); // true
console.log(`"проверяемая строка", ` + "Cтрока короче 20 символов -> " + isGood);

// Длина строки ровно 18 символов
isGood = isNormalLength("проверяемая строка", 18); // true
console.log(
  `"проверяемая строка", ` + "Длина строки ровно 18 символов -> " + isGood
);

// Строка длиннее 10 символов
isGood = isNormalLength("проверяемая строка", 10); // false
console.log(
  `"проверяемая строка", ` + "Строка длиннее 10 символов -> " + isGood
);
// }
//================================================================

//================================================================
// Палиндром
// {
console.log("--------");
let isTrue = true;

const isPalindrome = function (string) {
  const normString = string.toUpperCase().replace(/ /g, "");
  // const normString = string.toUpperCase().replaceAll(' ', ''); // or
  let reverseString = "";

  for (let i = normString.length - 1; i >= 0; i--) {
    reverseString += normString[i];
  }

  return normString === reverseString ? true : false;
};

// Строка является палиндромом
isTrue = isPalindrome("топот"); // true
console.log(`"топот" -> ` + isTrue);

// Несмотря на разный регистр, тоже палиндром
isTrue = isPalindrome("ДовОд"); // true
console.log(`"ДовОд" -> ` + isTrue);

// Это не палиндром
isTrue = isPalindrome("Кекс"); // false
console.log(`"Кекс" -> ` + isTrue);

// Это палиндром
isTrue = isPalindrome("Лёша на полке клопа нашёл "); // true
console.log(`"Лёша на полке клопа нашёл" -> ` + isTrue);
// }
//================================================================

//================================================================
// Получить число из строки
// {
console.log("--------");
let numberOrNaN;

const getNumber = function (rowData) {
  const normalizedString = typeof rowData === "string" ? rowData : rowData.toString();
  let tmpString = "";

  for (let i = 0; i <= normalizedString.length - 1; i++) {
    if (!isNaN(parseInt(normalizedString[i]))) {
      tmpString += normalizedString[i];
    }
  }

  return tmpString.length > 0 ? tmpString : NaN;
};

numberOrNaN = getNumber("2023 год"); // 2023
console.log(`"2023 год" -> ` + numberOrNaN);

numberOrNaN = getNumber("ECMAScript 2022"); // 2022
console.log(`"ECMAScript 2022" -> ` + numberOrNaN);

numberOrNaN = getNumber("1 кефир, 0.5 батона"); // 105
console.log(`"1 кефир, 0.5 батона" -> ` + numberOrNaN);

numberOrNaN = getNumber("агент 007"); // 7
console.log(`"агент 007" -> ` + numberOrNaN);

numberOrNaN = getNumber("а я томат"); // NaN
console.log(`"а я томат" -> ` + numberOrNaN);

numberOrNaN = getNumber(2023); // 2023
console.log(`2023 -> ` + numberOrNaN);

numberOrNaN = getNumber(-1); // 1
console.log(`-1 -> ` + numberOrNaN);

numberOrNaN = getNumber(1.5); // 15
console.log(`1.5 -> ` + numberOrNaN);
// }
//================================================================
