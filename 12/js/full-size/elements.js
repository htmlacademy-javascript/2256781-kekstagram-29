const previewBoxElement = document.querySelector('.big-picture__preview');
const bigPictureElement = previewBoxElement.firstElementChild.children[0];

const fullSizeElementList = {
  previewBoxElement,
  bigPictureElement,
  likesCountElement: previewBoxElement.querySelector('.likes-count'),
  commentsCountElement: previewBoxElement.querySelector('.comments-count'),
  socialCaptionElement: previewBoxElement.querySelector('.social__caption'),
  socialCommentCountElement: document.querySelector('.social__comment-count'),
  commentsLoaderElement: previewBoxElement.querySelector('.comments-loader'),
  socialCommentsBoxElement: previewBoxElement.querySelector('.social__comments'),
  bigPictureOverlay: document.querySelector('.overlay'),
  bigPictureCloseElement: document.querySelector('.big-picture__cancel'),
  bodyElement: document.querySelector('body'),
};

export { fullSizeElementList };
