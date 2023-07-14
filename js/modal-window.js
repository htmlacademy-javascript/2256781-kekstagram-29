import { isEscapeKey, isEnterKey, addRemoveListener } from './util.js';
import { renderFullSize } from './full-size/full-size.js';
import { disallowClosingUploadForm } from './upload-form/upload-form.js';

const bodyElement = document.querySelector('body');

const onDocumentKeydown = (overlay) => (evt) => {
  if (isEscapeKey(evt) && !disallowClosingUploadForm()) {
    evt.preventDefault();
    closeModalWindow(overlay);
  }
};

const onCloseWindowByClick = (overlay) => () => {
  closeModalWindow(overlay);
};

const onCloseWindowByEnterKey = (overlay) => (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow(overlay);
  }
};

function openModalWindow(overlay) {
  overlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown(overlay));
}

function closeModalWindow(overlay) {
  overlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown(overlay), true);
  const сlosingWindowEvent = new CustomEvent('сlosingWindowEvent', {
    detail: overlay.classList.contains('img-upload__overlay'),
    bubbles: false,
    cancelable: false,
    composed: false,
  });
  document.querySelector('.img-upload__cancel').dispatchEvent(сlosingWindowEvent);
}

const setBigPictureHandlers = (data) => {
  const bigPictureOverlay = document.querySelector('.overlay');
  const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
  const picturesContainerElement = document.querySelector('.pictures.container');
  const openFullSizePicture = renderFullSize.bind(null, data);
  const onClickMiniature = (evt) => {
    if (evt.target.matches('img.picture__img')) {
      openModalWindow(bigPictureOverlay);
      openFullSizePicture(evt.target.getAttribute('data-id'));
    }
  };

  // delegating event to ancestor element
  addRemoveListener('click', 'onClick', picturesContainerElement, onClickMiniature);

  addRemoveListener('click', 'onClick', bigPictureCloseElement, onCloseWindowByClick(bigPictureOverlay));
  addRemoveListener('keydown', 'onKeydown', bigPictureCloseElement, onCloseWindowByEnterKey(bigPictureOverlay));
};

const setUploadFormHandlers = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const parentElement = document.querySelector('.img-upload__start');
  const formCloseElement = document.querySelector('.img-upload__cancel');
  const onOpenModalWindow = () => {
    openModalWindow(overlay);
  };

  // delegating event to ancestor element
  addRemoveListener('change', 'onChange', parentElement, onOpenModalWindow);

  addRemoveListener('click', 'onClick', formCloseElement, onCloseWindowByClick(overlay));
  addRemoveListener('keydown', 'onKeydown', formCloseElement, onCloseWindowByEnterKey(overlay));
};

const setModalWindowHandlers = (data) => {
  setBigPictureHandlers(data);
  setUploadFormHandlers();
};

export { setModalWindowHandlers };
