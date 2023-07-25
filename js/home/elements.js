const miniatureElementList = {
  pictureTemplate: document.querySelector('#picture').content.querySelector('.picture'),
  pictureListElement: document.querySelector('.pictures'),
  picturesContainerElement: document.querySelector('.pictures.container'),
  imageFilterBox: document.querySelector('.img-filters'),
  formFilter: document.querySelector('.img-filters__form'),
  defaultFilter: document.querySelector('#filter-default'),
  randomFilter: document.querySelector('#filter-random'),
  discussedFilter: document.querySelector('#filter-discussed'),
  filterButtons: document.querySelectorAll('.img-filters__button'),
};

export { miniatureElementList };
