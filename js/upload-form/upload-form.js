import { addRemoveListener, isNormalLength } from '../util.js';
import { HashTag, COMMENT_COUNT, PrestineErrorText, SubmitButtonText } from './constants.js';
import { uploadFormElementList } from './elements.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';
import { sendData } from '../api/api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { openModalWindow, closeModalWindow, closeUploadFormByEnterKey } from './handlers.js';

const getNormalizeString = (str) =>
  str
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

const pristine = new Pristine(
  uploadFormElementList.formUploadElement,
  {
    // class of the parent element where the error/success class is added
    classTo: 'img-upload__field-wrapper',
    // class of the parent element where error text element is appended
    errorTextParent: 'img-upload__field-wrapper',
    // class of the error text element
    // errorTextClass: 'img-upload__field-wrapper--error',
  },
  false,
);

// валидация комментарий
const validateComment = (value) => isNormalLength(value, COMMENT_COUNT);

const getCommentErrorMessage = () => `Комментарий не может быть больше ${COMMENT_COUNT} символов`;

pristine.addValidator(uploadFormElementList.commentFieldElement, validateComment, getCommentErrorMessage);

// валидация хэштэг
const validateUniqueHashTag = (value) => {
  const tags = getNormalizeString(value);
  const isUnique = () => tags.length === new Set(tags).size;
  return isUnique();
};

const validateContentHashTag = (value) => {
  const tags = getNormalizeString(value);
  const isNormalContent = (tag) => HashTag.CHARACTERS.test(tag);
  return tags.every(isNormalContent);
};

const validateCountHashTag = (value) => {
  const tags = getNormalizeString(value);
  return isNormalLength(tags, HashTag.COUNT);
};

const validateMaxLengthHashTag = (value) => {
  const tags = getNormalizeString(value);
  const isNormal = (tag) => tag.length <= HashTag.MAX_LENGTH_TAG;
  return tags.every(isNormal);
};

const getHashTagUniqueErrorMessage = () => PrestineErrorText.NOT_UNIQUE;
const getHashTagContentErrorMessage = () => PrestineErrorText.INVALID_CONTENT;
const getHashTagCountErrorMessage = () => PrestineErrorText.INVALID_COUNT;
const getHashTagMaxLengthErrorMessage = () => PrestineErrorText.INVALID_LENGTH;

pristine.addValidator(
  uploadFormElementList.fieldHashtagElement,
  validateUniqueHashTag,
  getHashTagUniqueErrorMessage,
  1,
  true,
);
pristine.addValidator(
  uploadFormElementList.fieldHashtagElement,
  validateContentHashTag,
  getHashTagContentErrorMessage,
  2,
  true,
);
pristine.addValidator(
  uploadFormElementList.fieldHashtagElement,
  validateCountHashTag,
  getHashTagCountErrorMessage,
  3,
  true,
);
pristine.addValidator(
  uploadFormElementList.fieldHashtagElement,
  validateMaxLengthHashTag,
  getHashTagMaxLengthErrorMessage,
  4,
  true,
);

const resetAllSettings = () => {
  pristine.reset();
  resetScale();
  resetEffect();
  uploadFormElementList.formUploadElement.reset();
  uploadFormElementList.bodyElement.classList.remove('modal-open');
};

// Отправка данных формы
const disableSubmit = () => {
  uploadFormElementList.uploadSubmitElement.textContent = SubmitButtonText.SUBMITTING;
  uploadFormElementList.uploadSubmitElement.disabled = true;
  uploadFormElementList.uploadSubmitElement.style.opacity = 0.5;
};

const enableSubmit = () => {
  uploadFormElementList.uploadSubmitElement.textContent = SubmitButtonText.DEFAULT;
  uploadFormElementList.uploadSubmitElement.disabled = false;
  uploadFormElementList.uploadSubmitElement.style.opacity = 1;
};

const closeFormWithReset = () => {
  closeModalWindow(resetAllSettings);
};

const onSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  disableSubmit();

  sendData(new FormData(evt.target))
    .then(() => {
      resetAllSettings();
      showSuccessMessage(closeFormWithReset);
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      enableSubmit();
    });
};

const onOpenWindow = () => {
  openModalWindow(resetAllSettings);
};

const onCloseByClick = () => {
  closeFormWithReset();
};

const onCloseByEnterKey = (evt) => {
  closeUploadFormByEnterKey(evt, resetAllSettings);
};

// delegating event to ancestor element
addRemoveListener('change', 'onChange', uploadFormElementList.parentElement, onOpenWindow);

addRemoveListener('click', 'onClick', uploadFormElementList.formCloseElement, onCloseByClick);
addRemoveListener('keydown', 'onKeydown', uploadFormElementList.formCloseElement, onCloseByEnterKey);

addRemoveListener('submit', 'onSubmit', uploadFormElementList.formUploadElement, onSubmit);
