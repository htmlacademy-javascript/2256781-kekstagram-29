import { renderFullSize } from '../full-size/full-size.js';
import { addRemoveListener } from '../util.js';
import { miniatureElementList } from './elements.js';

const createPictureElement = ({ id, url, description, likes, comments }) => {
  const pictureElement = miniatureElementList.pictureTemplate.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');

  img.dataset.id = id;
  img.src = url;
  img.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const render = (data) => {
  const pictureListFragment = document.createDocumentFragment();
  const openFullSizePicture = renderFullSize.bind(null, data);
  const onClickMiniature = (evt) => {
    if (evt.target.matches('img.picture__img')) {
      openFullSizePicture(evt.target.getAttribute('data-id'));
    }
  };

  data.forEach((photoDescriptionObj) => {
    pictureListFragment.appendChild(createPictureElement(photoDescriptionObj));
  });

  miniatureElementList.pictureListElement.appendChild(pictureListFragment);

  // delegating event to ancestor element
  addRemoveListener('click', 'onClick', miniatureElementList.picturesContainerElement, onClickMiniature);
};

export { render };
