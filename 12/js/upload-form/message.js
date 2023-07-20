import { addRemoveListener, isEscapeKey } from '../util.js';
import { messageElementList } from './elements.js';

const onSuccessDocumentClick = (boxElement) => (cb) => (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.success__inner')) {
    boxElement.remove();
    cb();

    addRemoveListener('click', 'onClick', messageElementList.successButtonElement, () => {}, true);
    addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
    addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
  }
};

const onSuccessButtonClick = (boxElement) => (cb) => () => {
  boxElement.remove();
  cb();

  addRemoveListener('click', 'onClick', messageElementList.successButtonElement, () => {}, true);
  addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
  addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
};

const onSuccessKeyDown = (boxElement) => (cb) => (evt) => {
  evt.preventDefault();

  if (isEscapeKey(evt)) {
    boxElement.remove();
    cb();

    addRemoveListener('click', 'onClick', messageElementList.successButtonElement, () => {}, true);
    addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
    addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
  }
};

const showSuccessMessage = (cb = () => {}) => {
  messageElementList.bodyElement.append(messageElementList.successMessageBoxElement);

  addRemoveListener(
    'click',
    'onClick',
    messageElementList.successButtonElement,
    onSuccessButtonClick(messageElementList.successMessageBoxElement)(cb),
  );
  addRemoveListener(
    'click',
    'onClick',
    messageElementList.bodyElement,
    onSuccessDocumentClick(messageElementList.successMessageBoxElement)(cb),
  );
  addRemoveListener(
    'keydown',
    'onKeyDown',
    messageElementList.bodyElement,
    onSuccessKeyDown(messageElementList.successMessageBoxElement)(cb),
  );
};

const onErrorDocumentClick = (boxElement) => (evt) => {
  evt.preventDefault();

  if (!evt.target.closest('.error__inner')) {
    boxElement.remove();

    addRemoveListener('click', 'onClick', messageElementList.errorButtonElement, () => {}, true);
    addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
    addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
  }
};

const onErrorButtonClick = (boxElement) => () => {
  boxElement.remove();

  addRemoveListener('click', 'onClick', messageElementList.errorButtonElement, () => {}, true);
  addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
  addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
};

const onErrorKeyDown = (boxElement) => (evt) => {
  evt.preventDefault();

  if (isEscapeKey(evt)) {
    boxElement.remove();

    addRemoveListener('click', 'onClick', messageElementList.errorButtonElement, () => {}, true);
    addRemoveListener('click', 'onClick', messageElementList.bodyElement, () => {}, true);
    addRemoveListener('keydown', 'onKeyDown', messageElementList.bodyElement, () => {}, true);
  }
};

const showErrorMessage = () => {
  messageElementList.bodyElement.append(messageElementList.errorMessageBoxElement);

  addRemoveListener(
    'click',
    'onClick',
    messageElementList.errorButtonElement,
    onErrorButtonClick(messageElementList.errorMessageBoxElement),
  );
  addRemoveListener(
    'click',
    'onClick',
    messageElementList.bodyElement,
    onErrorDocumentClick(messageElementList.errorMessageBoxElement),
  );
  addRemoveListener(
    'keydown',
    'onKeyDown',
    messageElementList.bodyElement,
    onErrorKeyDown(messageElementList.errorMessageBoxElement),
  );
};

export { showSuccessMessage, showErrorMessage };
