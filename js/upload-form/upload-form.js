import { addRemoveListener, isNormalLength } from '../util.js';
import { HashTag, COMMENT_COUNT, PrestineErrorText } from './constants.js';
import { uploadFormElementList } from './elements.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effect.js';

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

uploadFormElementList.formUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const disallowClosingUploadForm = () =>
  document.activeElement === uploadFormElementList.fieldHashtagElement ||
  document.activeElement === uploadFormElementList.commentFieldElement;

const resetAll = () => {
  pristine.reset();
  resetScale();
  resetEffect();
  uploadFormElementList.formUploadElement.reset();
};

const onCloseModalWindow = (evt) => {
  if (evt.detail) {
    resetAll();
  }
};

// подписка на закрытие модального окна загрузки нового изображения
addRemoveListener(
  'сlosingWindowEvent',
  'onClosingWindowEvent',
  uploadFormElementList.uploadFormCloseElement,
  onCloseModalWindow,
);

export { disallowClosingUploadForm };
