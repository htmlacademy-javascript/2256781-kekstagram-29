import { findObject, createDOMFragment, hideElements } from './util.js';

const previewBoxElement = document.querySelector('.big-picture__preview');
const bigPictureElement = previewBoxElement.firstElementChild.children[0];
const likesCountElement = previewBoxElement.querySelector('.likes-count');
const commentsCountElement = previewBoxElement.querySelector('.comments-count');
const socialCaptionElement = previewBoxElement.querySelector('.social__caption');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = previewBoxElement.querySelector('.comments-loader');
const commentTemplateString = `
  <li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
  </li>
`;

const addComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newCommentElement = createDOMFragment(commentTemplateString);
    const imgEl = newCommentElement.querySelector('.social__picture');
    imgEl.src = comment.avatar;
    imgEl.alt = comment.message;

    newCommentElement.querySelector('.social__text').textContent = comment.message;
    commentListFragment.appendChild(newCommentElement);
  });

  return commentListFragment;
};

const stuffBigPicture = ({ url, likes, comments, description }) => {
  const socialCommentsBoxElement = previewBoxElement.querySelector('.social__comments');
  socialCommentsBoxElement.innerHTML = '';

  bigPictureElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;

  const commentListFragment = addComments(comments);
  socialCommentsBoxElement.append(commentListFragment);

  socialCaptionElement.textContent = description;
};

const renderFullSize = (data, idClicked) => {
  const objClicked = findObject(data, 'id', parseInt(idClicked, 10));
  const atTheTimeHideElements = [socialCommentCountElement, commentsLoaderElement];

  // заполню основное описание
  stuffBigPicture(objClicked);

  // прячу блоки счётчика комментариев .social__comment-count
  // и загрузки новых комментариев .comments-loader
  hideElements(atTheTimeHideElements);
};

export { renderFullSize };
