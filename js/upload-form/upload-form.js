import { addRemoveListener, isNormalLength } from '../util.js';
import { HASHTAG_CHARACTERS, HASHTAG_COUNT, COMMENT_COUNT } from './constants.js';
import { formUploadElement, fieldHashtagElement, commentFieldElement, uploadFormCloseElement } from './elements.js';

const pristine = new Pristine(
  formUploadElement,
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

pristine.addValidator(commentFieldElement, validateComment, getCommentErrorMessage);

// валидация хэштэг
const validateLengthHashTag = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

  const res = isNormalLength(tags, HASHTAG_COUNT);

  return res;
};

const validateContentHashTag = (value) => {
  const tags = value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((tag) => tag.trim().length);

  const isNormalTags = (tag) => HASHTAG_CHARACTERS.test(tag);

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

const getHashTagLengthErrorMessage = () => `Количество хэштэгов должно быть не более ${HASHTAG_COUNT}`;
const getHashTagContentErrorMessage = () => 'Вы использовали недопустимые символы';
const getHashTagUniqueErrorMessage = () => 'Хэштэги повторяются';

pristine.addValidator(fieldHashtagElement, validateLengthHashTag, getHashTagLengthErrorMessage);
pristine.addValidator(fieldHashtagElement, validateContentHashTag, getHashTagContentErrorMessage);
pristine.addValidator(fieldHashtagElement, validateUniqueHashTag, getHashTagUniqueErrorMessage);

formUploadElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const disallowClosingUploadForm = () =>
  document.activeElement === fieldHashtagElement || document.activeElement === commentFieldElement;

const reset = () => {
  pristine.reset();
  formUploadElement.reset();
};

const onCloseModalWindow = (evt) => {
  if (evt.detail) {
    reset();
  }
};

// подписка на закрытие модального окна загрузки нового изображения
addRemoveListener('сlosingWindowEvent', 'onClosingWindowEvent', uploadFormCloseElement, onCloseModalWindow);

export { disallowClosingUploadForm };
