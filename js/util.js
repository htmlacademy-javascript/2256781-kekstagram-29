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

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

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
  addRemoveListener,
  clearContainer,
};
