import { findObject, createDOMFragment, addRemoveListener, clearContainer } from '../util.js';
import { COMMENT_PORTION, COMMENT_TEMPLATE } from './constants.js';
import { fullSizeElementList } from './elements.js';
import {
  openModalWindow,
  onCommentsLoaderClick,
  onCloseFullSizeByClick,
  onCloseFullSizeByEnterKey,
} from './handlers.js';

// контроль вывода порций комментариев
let requiredCountComments;

const renderComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();
  const partOfComments = comments.slice(requiredCountComments, requiredCountComments + COMMENT_PORTION);
  const getStringCountComments = (countComments) => (countComments === 0 ? 'без комментариев' : `${countComments} из `);

  partOfComments.forEach((comment) => {
    const newCommentElement = createDOMFragment(COMMENT_TEMPLATE);
    const imgEl = newCommentElement.querySelector('.social__picture');

    imgEl.src = comment.avatar;
    imgEl.alt = comment.message;

    newCommentElement.querySelector('.social__text').textContent = comment.message;
    commentListFragment.appendChild(newCommentElement);
  });

  fullSizeElementList.socialCommentsBoxElement.append(commentListFragment);

  requiredCountComments += COMMENT_PORTION;

  // кол-во комментариев
  fullSizeElementList.socialCommentCountElement.childNodes[0].textContent = getStringCountComments(
    comments.length > 0 && comments.length < 5 ? comments.length : Math.min(requiredCountComments, comments.length),
  );
  fullSizeElementList.commentsCountElement.textContent = comments.length;

  if (requiredCountComments >= comments.length) {
    fullSizeElementList.commentsLoaderElement.classList.add('hidden');
  } else {
    fullSizeElementList.commentsLoaderElement.classList.remove('hidden');
  }
};

const fillBigPicture = ({ url, likes, comments, description }) => {
  clearContainer(fullSizeElementList.socialCommentsBoxElement);

  fullSizeElementList.bigPictureElement.src = url;
  fullSizeElementList.likesCountElement.textContent = likes;
  fullSizeElementList.socialCaptionElement.textContent = description;

  renderComments(comments);
};

const renderFullSize = (data, idClicked) => {
  const objClicked = findObject(data, 'id', parseInt(idClicked, 10));
  requiredCountComments = 0;

  openModalWindow();

  // заполню основное описание
  fillBigPicture(objClicked);

  addRemoveListener('click', 'onClick', fullSizeElementList.bigPictureCloseElement, onCloseFullSizeByClick);
  addRemoveListener('keydown', 'onKeydown', fullSizeElementList.bigPictureCloseElement, onCloseFullSizeByEnterKey);
  addRemoveListener(
    'click',
    'onClick',
    fullSizeElementList.commentsLoaderElement,
    onCommentsLoaderClick(() => renderComments(objClicked.comments)),
  );
};

export { renderFullSize };
