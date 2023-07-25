const ALERT_STYLE = `
  padding: 10px 3px;
  font-size: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  color: white;
  text-align: center;
  line-height: normal;
  background-color: #ff4c4c;
`;

const ALERT_OPTIONS = {
  style: ALERT_STYLE,
  id: 'alert-message',
};

const ALERT_SHOW_TIME = 3000;

const isNormalLength = (string, length) => string.length <= length;

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const filterObject = (arr, key, value) => arr.filter((obj) => obj[key] === value);

const findObject = (arr, key, value) => arr.find((obj) => obj[key] === value);

// функция принимает название тега и объект с
// настройками
const createDOMElement = (tag, opts) => {
  const el = document.createElement(tag);
  // перебираем ключи объекта и записывает соответствующие свойства в элемент
  for (const key in opts) {
    el[key] = opts[key];
  }
  // возвращаем готовый элемент
  return el;
};

// функция генерирует DocumentFragment содержащий
// DOM-элементы полученные из шаблонной строки
const createDOMFragment = (str) => new Range().createContextualFragment(str);

const showAlert = (domContainer, message = 'encountered an error') => {
  if (!domContainer) {
    return;
  }

  const alertContainer = createDOMElement('div', ALERT_OPTIONS);
  alertContainer.textContent = message;

  domContainer.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const hideElements = (domElements) => {
  domElements.forEach((element) => {
    element.classList.add('hidden');
  });
};

const showElements = (domElements) => {
  domElements.forEach((element) => {
    element.classList.remove('hidden');
  });
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
function throttle(callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

// обёртка которая позволяет пользоваться функциями (в том числе стрелочными)
// расположенными внутри ф-ии родителя как "ручками" на события
// без засорения вкадки Event Listeners (утечки памяти)
const addRemoveListener = (
  event = 'click',
  userMethodName = 'onClick',
  domElement = document,
  handler,
  onlyRemove = false,
) => {
  domElement.removeEventListener(event, domElement[userMethodName]);
  if (onlyRemove) {
    return;
  }

  domElement[userMethodName] = handler;

  domElement.addEventListener(event, domElement[userMethodName]);
};

const clearContainer = (сontainerElement) => (сontainerElement.innerHTML = '');

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export {
  isNormalLength,
  isEscapeKey,
  isEnterKey,
  filterObject,
  findObject,
  createDOMElement,
  createDOMFragment,
  showAlert,
  hideElements,
  showElements,
  debounce,
  throttle,
  addRemoveListener,
  clearContainer,
  shuffle,
};
