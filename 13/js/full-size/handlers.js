import { isEnterKey, isEscapeKey, addRemoveListener } from '../util.js';
import { fullSizeElementList } from './elements.js';

const closeModalWindow = () => {
  fullSizeElementList.bigPictureOverlay.classList.add('hidden');
  fullSizeElementList.bodyElement.classList.remove('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown, true);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
}

const openModalWindow = () => {
  fullSizeElementList.bigPictureOverlay.classList.remove('hidden');
  fullSizeElementList.bodyElement.classList.add('modal-open');
  addRemoveListener('keydown', 'onKeydown', document, onDocumentKeydown);
};

const onCommentsLoaderClick = (cb) => (evt) => {
  evt.preventDefault();
  cb();
};

const onCloseFullSizeByClick = () => {
  closeModalWindow();
};

const onCloseFullSizeByEnterKey = (evt) => {
  if (isEnterKey(evt)) {
    closeModalWindow();
  }
};

export {
  closeModalWindow,
  onDocumentKeydown,
  openModalWindow,
  onCommentsLoaderClick,
  onCloseFullSizeByClick,
  onCloseFullSizeByEnterKey,
};
