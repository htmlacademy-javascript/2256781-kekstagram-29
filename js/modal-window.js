import { isEscapeKey, isEnterKey } from './util.js';

// DOM elements
const modalElement = document.querySelector('.overlay');
const bodyElement = document.querySelector('body');
const closeElement = document.querySelector('.big-picture__cancel');
const picturesContainerElement = document.querySelector('.pictures.container');

// handlers
closeElement.addEventListener('click', () => {
  closeModalWindow();
});

closeElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

// show/hide overlay
function openModalWindow() {
  modalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeModalWindow() {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// delegating event to ancestor element
function onClickMiniature(evt) {
  if (evt.target.matches('img.picture__img')) {
    openModalWindow();
  }
}

// a main function
const setMiniatureContainerClick = (cb) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    onClickMiniature(evt);
    // делаю рендер полноразмерной картинки
    // передаю второй обязательный аргумент в коллбэк
    cb(evt.target.getAttribute('data-id'));
  });
};

export { setMiniatureContainerClick };
