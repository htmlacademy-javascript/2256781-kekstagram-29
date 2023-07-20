import { addRemoveListener, isNormalLength } from '../util.js';
import { HashTag, COMMENT_COUNT, PrestineErrorText, SubmitButtonText } from './constants.js';
import { uploadFormElementList } from './elements.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';
import { sendData } from '../api/api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { openModalWindow, closeModalWindow, closeUploadFormByEnterKey } from './handlers.js';

const pristine = new Pristine(
  uploadFormElementList.formUploadElement,
  {
    // class of the parent element where the error/success class is added
    classTo: 'img-upload__field-wrapper',
    // class of the parent element where error text element is appended
    errorTextParent: 'img-upload__field-wrapper',
    // class of the error text element
    errorTextClass: 'img-upload__field-wrapper--error',
  },
  false,
);

// валидация комментарий
const validateComment = (value) => isNormalLength(value, COMMENT_COUNT);

const getCommentErrorMessage = () => `Комментарий не может быть больше ${COMMENT_COUNT} символов`;

pristine.addValidator(uploadFormElementList.commentFieldElement, validateComment, getCommentErrorMessage);

// валидация хэштэг
const validateLengthHashTag = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

  const res = isNormalLength(tags, HashTag.COUNT);

  return res;
};

const validateContentHashTag = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

  const isNormalTags = (tag) => HashTag.CHARACTERS.test(tag);

  return tags.every(isNormalTags);
};

const validateUniqueHashTag = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

  const isUniqueTags = () => tags.length === new Set(tags).size;

  return isUniqueTags();
};

const getHashTagLengthErrorMessage = () => PrestineErrorText.INVALID_COUNT;
const getHashTagContentErrorMessage = () => PrestineErrorText.INVALID_CONTENT;
const getHashTagUniqueErrorMessage = () => PrestineErrorText.NOT_UNIQUE;

pristine.addValidator(uploadFormElementList.fieldHashtagElement, validateLengthHashTag, getHashTagLengthErrorMessage);
pristine.addValidator(uploadFormElementList.fieldHashtagElement, validateContentHashTag, getHashTagContentErrorMessage);
pristine.addValidator(uploadFormElementList.fieldHashtagElement, validateUniqueHashTag, getHashTagUniqueErrorMessage);

const resetAllSettings = () => {
  pristine.reset();
  resetScale();
  resetEffect();
  uploadFormElementList.formUploadElement.reset();
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
