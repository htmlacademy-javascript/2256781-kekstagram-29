import { effectElementList } from './elements.js';
import { EFFECTS } from './constants.js';
import { findObject, addRemoveListener } from '../util.js';

const ORIGINAL_EFFECT = findObject(EFFECTS, 'name', 'none');
let selectedEffect = ORIGINAL_EFFECT;

const isDefaultEffect = () => selectedEffect === ORIGINAL_EFFECT;

const showSlider = () => {
  effectElementList.sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  effectElementList.sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  effectElementList.sliderElement.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.max,
    step: selectedEffect.step,
    connect: 'lower',
  });
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const currentEffectName = evt.target.value;
  selectedEffect = findObject(EFFECTS, 'name', currentEffectName);

  updateSlider();

  if (isDefaultEffect()) {
    hideSlider();
  } else {
    showSlider();
  }

  effectElementList.picturePreviewElement.className = `effects__preview--${currentEffectName}`;
};

const onSliderUpdate = () => {
  const currentSliderValue = effectElementList.sliderElement.noUiSlider.get();

  effectElementList.picturePreviewElement.style.filter = isDefaultEffect()
    ? `${selectedEffect.style}`
    : `${selectedEffect.style}(${currentSliderValue}${selectedEffect.unit})`;

  effectElementList.effectLevelElement.value = currentSliderValue;
};

const resetEffect = () => {
  selectedEffect = ORIGINAL_EFFECT;
  updateSlider();
  effectElementList.effectLevelElement.value = ORIGINAL_EFFECT.max;
  effectElementList.picturePreviewElement.className = '';
};

hideSlider();

noUiSlider.create(effectElementList.sliderElement, {
  range: {
    min: ORIGINAL_EFFECT.min,
    max: ORIGINAL_EFFECT.max,
  },
  start: ORIGINAL_EFFECT.max,
  step: ORIGINAL_EFFECT.step,
  connect: 'lower',
});

effectElementList.sliderElement.noUiSlider.on('update', onSliderUpdate);
addRemoveListener('click', 'onClick', effectElementList.effectElement, onEffectChange);

export { resetEffect };
