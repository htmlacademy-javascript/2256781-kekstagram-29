import { findObject, createDOMFragment, debounce, addListener } from '../util.js';
import { DEBOUNCE_DELAY, COMMENTS_PORTION } from './constants.js';

const previewBoxElement = document.querySelector('.big-picture__preview');
const bigPictureElement = previewBoxElement.firstElementChild.children[0];
const likesCountElement = previewBoxElement.querySelector('.likes-count');
const commentsCountElement = previewBoxElement.querySelector('.comments-count');
const socialCaptionElement = previewBoxElement.querySelector('.social__caption');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = previewBoxElement.querySelector('.comments-loader');
const socialCommentsBoxElement = previewBoxElement.querySelector('.social__comments');
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

// контроль вывода порций комментариев
let requiredCountComments;

const renderComments = (comments) => {
  const commentListFragment = document.createDocumentFragment();
  const partOfComments = comments.slice(requiredCountComments, requiredCountComments + COMMENTS_PORTION);
  const getStringCountComments = (countComments) => (countComments === 0 ? 'без комментариев' : `${countComments} из `);

  partOfComments.forEach((comment) => {
    const newCommentElement = createDOMFragment(commentTemplateString);
    const imgEl = newCommentElement.querySelector('.social__picture');

    imgEl.src = comment.avatar;
    imgEl.alt = comment.message;

    newCommentElement.querySelector('.social__text').textContent = comment.message;
    commentListFragment.appendChild(newCommentElement);
  });

  socialCommentsBoxElement.append(commentListFragment);

  requiredCountComments += COMMENTS_PORTION;

  // кол-во комментариев
  socialCommentCountElement.childNodes[0].textContent = getStringCountComments(
    comments.length > 0 && comments.length < 5 ? comments.length : Math.min(requiredCountComments, comments.length),
  );
  commentsCountElement.textContent = comments.length;

  if (requiredCountComments >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const stuffBigPicture = ({ url, likes, comments, description }) => {
  socialCommentsBoxElement.innerHTML = '';

  bigPictureElement.src = url;
  likesCountElement.textContent = likes;
  socialCaptionElement.textContent = description;

  renderComments(comments);
};

const onCommentsLoaderClick = (objClicked) => {
  renderComments(objClicked.comments);
};

const renderFullSize = (data, idClicked) => {
  const objClicked = findObject(data, 'id', parseInt(idClicked, 10));

  requiredCountComments = 0;

  // заполню основное описание
  stuffBigPicture(objClicked);

  // !!! чтобы избежать дублирования обработчиков на кнопке
  // которое происходит после обычного вызова addEventlistener
  addListener('click', 'onClick', commentsLoaderElement, (evt) => {
    evt.preventDefault();
    //уменьшение дребезга кнопки
    debounce(onCommentsLoaderClick(objClicked), DEBOUNCE_DELAY);
  });
};

export { renderFullSize };
