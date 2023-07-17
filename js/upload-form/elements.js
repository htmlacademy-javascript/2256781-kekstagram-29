const uploadFormElementList = {
  formUploadElement: document.querySelector('.img-upload__form'),
  uploadFormCloseElement: document.querySelector('.img-upload__cancel'),
  fieldHashtagElement: document.querySelector('.text__hashtags'),
  commentFieldElement: document.querySelector('.text__description'),
  uploadSubmitElement: document.querySelector('.img-upload__submit'),
  sendSuccessElement: document.querySelector('#success').content.querySelector('.success'),
  sendErrorElement: document.querySelector('#error').content.querySelector('.error'),
};

const scaleElementList = {
  picturePreviewElement: document.querySelector('.img-upload__preview img'),
  smallerControlElement: document.querySelector('.scale__control--smaller'),
  largerControlElement: document.querySelector('.scale__control--bigger'),
  scaleControlElement: document.querySelector('.scale__control--value'),
};

const effectElementList = {
  picturePreviewElement: document.querySelector('.img-upload__preview img'),
  effectElement: document.querySelector('.effects__list'),
  sliderElement: document.querySelector('.effect-level__slider'),
  sliderContainerElement: document.querySelector('.img-upload__effect-level'),
  effectLevelElement: document.querySelector('.effect-level__value'),
};

export { uploadFormElementList, scaleElementList, effectElementList };
