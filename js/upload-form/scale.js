import { Scale } from './constants.js';
import { scaleElementList } from './elements.js';
import { addRemoveListener } from '../util.js';

const scaleImage = (value) => {
  const valueInsideElement = parseInt(scaleElementList.scaleControlElement.value, 10);
  const currentScale =
    valueInsideElement + value > Scale.RANGE.max || valueInsideElement + value < Scale.RANGE.min
      ? valueInsideElement
      : valueInsideElement + value;

  scaleElementList.scaleControlElement.value = `${currentScale}%`;
  scaleElementList.picturePreviewElement.style.transform = `scale(${currentScale / 100})`;
};

const onMinusClick = () => {
  scaleImage(-Scale.STEP);
};

const onPlusClick = () => {
  scaleImage(Scale.STEP);
};

const resetScale = () => scaleImage(Scale.DEFAULT);

// добавлю обработчики onMinusClick, onPlusClick
addRemoveListener('click', 'onClick', scaleElementList.smallerControlElement, onMinusClick);
addRemoveListener('click', 'onClick', scaleElementList.largerControlElement, onPlusClick);

export { resetScale };
