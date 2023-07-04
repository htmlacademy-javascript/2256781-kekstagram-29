import { filterObject, createDomFragment } from './util.js';

const previewBoxElement = document.querySelector('.big-picture__preview');
const bigPictureElement = previewBoxElement.firstElementChild.children[0];
const likesCountElement = previewBoxElement.querySelector('.likes-count');
const commentsCountElement = previewBoxElement.querySelector('.comments-count');
const socialCaptionElement = previewBoxElement.querySelector('.social__caption');
const socialCommentsBoxElement = previewBoxElement.querySelector('.social__comments');
const commentTemplateString = `
  <li class="social__comment">
    <img
      class="social__picture"
      src=""
      alt=""
      width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
  </li>
`;

const renderFullSize = (data, idClicked) => {
  const objClicked = filterObject(data, 'id', +idClicked)[0];

  if (!objClicked) {
    return;
  }

  bigPictureElement.src = objClicked.url;
  likesCountElement.textContent = objClicked.likes;
  commentsCountElement.textContent = objClicked.comments;
  socialCaptionElement.textContent = objClicked.description;

  socialCommentsBoxElement.append(createDomFragment(commentTemplateString));
};

export { renderFullSize };
