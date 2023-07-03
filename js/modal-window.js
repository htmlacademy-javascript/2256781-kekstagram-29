import { isEscapeKey, isEnterKey } from './util.js';

const modalElement = document.querySelector('.overlay');
const bodyElement = document.querySelector('body');
const closeElement = document.querySelector('.big-picture__cancel');
const picturesContainerElement = document.querySelector('.pictures.container');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

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

function onClickMiniature(evt) {
  if (evt.target.matches('img.picture__img')) {
    openModalWindow();
  }
}

const setMiniatureClick = (cb) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    onClickMiniature(evt);
    // делаю рендер полноразмерной картинки
    // передаю второй обязательный аргумент в коллбэк
    cb(evt.target.getAttribute('data-id'));
  });
};

closeElement.addEventListener('click', () => {
  closeModalWindow();
});

closeElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
});

export { setMiniatureClick };
