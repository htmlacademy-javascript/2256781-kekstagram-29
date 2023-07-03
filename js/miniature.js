const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListElement = document.querySelector('.pictures');

const createPictureElement = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');

  img.src = url;
  img.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderMiniatureList = (data) => {
  const pictureListFragment = document.createDocumentFragment();

  data.forEach((photoDescriptionObj) => {
    pictureListFragment.appendChild(createPictureElement(photoDescriptionObj));
  });

  pictureListElement.appendChild(pictureListFragment);
};

export { renderMiniatureList };
