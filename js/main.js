const CountPhotos = {
  START: 1,
  END: 25,
};

const CountLikes = {
  START: 15,
  END: 200,
};

const CountComments = {
  START: 0,
  END: 3,
};

const CountForAvatar = {
  START: 1,
  END: 6,
};

const CountMessages = {
  START: 1,
  END: 2,
};

const DESCRIPTIONS = [
  'Передо мной интересная фотография',
  'Давайте рассмотрим изображение внимательно',
  'Мне кажется фотографию сделал настоящий профессионал своего дела',
  'Прекрасный вид',
  'Снимок получился прекрасно',
  'Удачная фотография',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHORS = [
  'Михаил Загоскин',
  'Сергей Аксаков',
  'Иван Лажечников',
  'Александр Пушкин',
  'Владимир Одоевский',
  'Николай Гоголь',
  'Александр Герцен',
  'Иван Гончаров',
  'Михаил Лермонтов',
  'Пётр Ершов',
  'Алексей Толстой',
  'Иван Тургенев',
  'Фёдор Достоевский',
  'Дмитрий Григорович',
  'Александр Островский',
  'Михаил Салтыков-Щедрин',
  'Николай Чернышевский',
  'Лев Толстой',
  'Григорий Данилевский',
  'Николай Лесков',
  'Николай Помяловский',
  'Иван Суриков',
  'Глеб Успенский',
  'Константин Станюкович',
  'Дмитрий Мамин-Сибиряк',
  'Всеволод Гаршин',
  'Антон Чехов',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomNumberFromRange = (startNumber, endNumber, isUnique = true) => {
  const previousValues = [];

  if (
    !isFinite(startNumber) ||
    !isFinite(endNumber) ||
    !Number.isInteger(startNumber) ||
    !Number.isInteger(endNumber)
  ) {
    return NaN;
  }

  return function () {
    let currentValue = getRandomInteger(startNumber, endNumber);

    if (isUnique) {
      if (previousValues.length >= endNumber - startNumber + 1) {
        return null;
      }

      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(startNumber, endNumber);
      }
      previousValues.push(currentValue);
    }

    return currentValue;
  };
};

const getArrayElementByIndex = (elements, index) => elements[index];

const photoIdGenerator = createRandomNumberFromRange(CountPhotos.START, CountPhotos.END, true);
const descIndexGenerator = createRandomNumberFromRange(0, DESCRIPTIONS.length - 1, false);
const likesCountGenerator = createRandomNumberFromRange(CountLikes.START, CountLikes.END, false);
const commentsCountGenerator = createRandomNumberFromRange(CountComments.START, CountComments.END, false);
const avatarIdGenerator = createRandomNumberFromRange(CountForAvatar.START, CountForAvatar.END, false);
const authorIndexGenerator = createRandomNumberFromRange(0, AUTHORS.length - 1, false);
const messageCountGenerator = createRandomNumberFromRange(CountMessages.START, CountMessages.END, false);

const createStringMessage = (countMessages) => {
  const messages = [];
  const messageIndexGenerator = createRandomNumberFromRange(0, MESSAGES.length - 1, true);

  while (countMessages > 0) {
    const indexMessages = messageIndexGenerator();
    messages.push(getArrayElementByIndex(MESSAGES, indexMessages));
    countMessages--;
  }

  return messages.join(' ');
};

const createCommentForPhoto = (index) => {
  const nameIndex = authorIndexGenerator();
  const countMessages = messageCountGenerator();

  const message = createStringMessage(countMessages);

  return {
    id: ++index,
    avatar: `img/avatar-${avatarIdGenerator()}.svg`,
    message,
    name: getArrayElementByIndex(AUTHORS, nameIndex),
  };
};

const createPhotoDescription = () => {
  const id = photoIdGenerator();
  const descIndex = descIndexGenerator();
  const countLikes = likesCountGenerator();
  const countComments = commentsCountGenerator();

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getArrayElementByIndex(DESCRIPTIONS, descIndex),
    likes: countLikes,
    comments: Array.from({ length: countComments }, (_, index) => createCommentForPhoto(index)),
  };
};


const Photos = Array.from({ length: CountPhotos.END }, createPhotoDescription);
// console.dir(Photos, { depth: null });
