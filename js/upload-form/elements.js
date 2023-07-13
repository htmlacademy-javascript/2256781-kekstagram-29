const formUploadElement = document.querySelector('.img-upload__form');
const uploadFormCloseElement = document.querySelector('.img-upload__cancel');
const fieldHashtagElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const uploadSubmitElement = document.querySelector('.img-upload__submit');
const sendSuccessElement = document.querySelector('#success').content.querySelector('.success');
const sendErrorElement = document.querySelector('#error').content.querySelector('.error');

export {
  formUploadElement,
  fieldHashtagElement,
  commentFieldElement,
  uploadSubmitElement,
  sendSuccessElement,
  sendErrorElement,
  uploadFormCloseElement,
};
