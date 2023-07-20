const COMMENT_COUNT = 140;

const HashTag = {
  CHARACTERS: /^#[a-zа-яё0-9]{1,19}$/i,
  COUNT: 5,
};

const Scale = {
  RANGE: { min: 25, max: 100 },
  DEFAULT: 100,
  STEP: 25,
};

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const PrestineErrorText = {
  INVALID_COUNT: `Количество хэштэгов должно быть не более ${HashTag.COUNT}`,
  NOT_UNIQUE: 'Хэштэги повторяются',
  INVALID_CONTENT: 'Вы использовали недопустимые символы в хэштэге',
};

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

export { HashTag, Scale, COMMENT_COUNT, EFFECTS, PrestineErrorText, SubmitButtonText };
