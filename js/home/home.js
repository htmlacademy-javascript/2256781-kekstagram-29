import { renderFullSize } from '../full-size/full-size.js';
import { addRemoveListener, debounce, shuffle } from '../util.js';
import { miniatureElementList } from './elements.js';
import { DEBOUNCE_TIMEOUT, RANDOM_MINIATURES_COUNT, Filter } from './constants.js';

let currentFilter = Filter.DEFAULT;

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

const removeMiniatures = () => document.querySelectorAll('.picture').forEach((miniature) => miniature.remove());

const sortByComments = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const getFilteredPictures = (miniatures) => (filter) => {
  switch (filter) {
    case Filter.RANDOM:
      return shuffle([...miniatures]).slice(0, RANDOM_MINIATURES_COUNT);
    case Filter.DISCUSSED:
      return [...miniatures].sort(sortByComments);
    default:
      return [...miniatures];
  }
};

const render = (data, returnMiniatures) => {
  const pictureListFragment = document.createDocumentFragment();
  const openFullSizePicture = renderFullSize.bind(null, data);
  const showFilters = () => miniatureElementList.imageFilterBox.classList.remove('img-filters--inactive');
  const onClickMiniature = (evt) => {
    if (evt.target.matches('img.picture__img')) {
      openFullSizePicture(evt.target.getAttribute('data-id'));
    }
  };
  const removeClassActiveFilter = () => {
    miniatureElementList.filterButtons.forEach((el) => {
      el.classList.remove('img-filters__button--active');
    });
  };
  const debounceRender = debounce(() => {
    removeMiniatures();
    render(returnMiniatures(currentFilter), returnMiniatures);
  }, DEBOUNCE_TIMEOUT);

  const onClickFilter = (evt) => {
    if (!evt.target.matches('.img-filters__button')) {
      return;
    }
    if (evt.target.id === currentFilter) {
      return;
    }

    currentFilter = evt.target.id;

    removeClassActiveFilter();
    evt.target.classList.add('img-filters__button--active');

    debounceRender();
  };

  showFilters();

  returnMiniatures(currentFilter).forEach((photoDescriptionObj) => {
    pictureListFragment.appendChild(createPictureElement(photoDescriptionObj));
  });

  miniatureElementList.pictureListElement.appendChild(pictureListFragment);

  // delegating event to ancestor element
  addRemoveListener('click', 'onClick', miniatureElementList.picturesContainerElement, onClickMiniature);
  addRemoveListener('click', 'onClick', miniatureElementList.imageFilterBox, onClickFilter);
};

export { render, getFilteredPictures };
