import { isEnterKey, isEscapeKey, addRemoveListener } from '../util.js';
import { uploadFormElementList } from './elements.js';

const closeModalWindow = (cb = () => {}) => {
  uploadFormElementList.overlay.classList.add('hidden');
  uploadFormElementList.bodyElement.classList.remove('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown, true);
  cb();
};

const isForbidden = () =>
  document.activeElement === uploadFormElementList.fieldHashtagElement ||
  document.activeElement === uploadFormElementList.commentFieldElement;

function onDocumentKeydown(cb = () => {}) {
  return function (evt) {
    if (isEscapeKey(evt) && !isForbidden()) {
      evt.preventDefault();
      closeModalWindow();
      cb();
    }
  };
}

const openModalWindow = (cb = () => {}) => {
  uploadFormElementList.overlay.classList.remove('hidden');
  uploadFormElementList.bodyElement.classList.add('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown(cb));
};

const closeUploadFormByEnterKey = (evt, cb = () => {}) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
    cb();
  }
};

export { closeModalWindow, onDocumentKeydown, openModalWindow, closeUploadFormByEnterKey };
