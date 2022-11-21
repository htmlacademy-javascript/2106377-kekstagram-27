import{getRandomPositiveInteger} from './util.js';
const COMMENT_COUNT = 15;
const AVATAR_COUNT = 6;

let c = 0;

const setId = (j) => {
  c += j;
  return c;
};

const AVATARS = [];

for (let j = 1; j <= AVATAR_COUNT; j++) {
  AVATARS.push(j);
}

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Рональд Уизли',
  'Гарри Поттер',
  'Гермиона Грейнджер',
  'Драко Малфой',
  'Минерва Макгонагалл',
  'Сиверус Снегг',
];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = (k) => ({
  id: setId(k),
  avatar: `img/avatar-${getRandomArrayElement(AVATARS)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(NAMES),}
);

const createSimilarComment = () => Array.from({length: COMMENT_COUNT}, () => createComment(1));

export{getRandomArrayElement};
export{createSimilarComment};
export{COMMENT_COUNT};
