const OBJECT_COUNT = 25;
import{getRandomArrayElement} from './create-comments.js';
import{createSimilarComment} from './create-comments.js';

let d = 0;

const setIdObj = (j) => {
  d += j;
  return d;
};

const DESCRIPTIONS = [
  'Пляж в бухте',
  'Дорога к пляжу',
  'Идеальный мир без Homo sapiens',
  'Умопомрочительное море, горизонт немного заввален',
  'Эстетика местной гастрономии',
  'Простолюдины в Сан-Тропе',
  'Сытный завтрак',
  'Отличные столовые -первое второе и компот!',
  'Попытка релокации',
  'Идея для хранения обуви',
  'Путь к пляжу',
  'Возвращение из отпуска',
  'Не сфотографировал значит не ел',
  'Котосуши',
  'Зима близко',
  'Попытка релокации №2',
  'Хор в Карнеги-Холл',
  'Ретро',
  'Лайфхак для дома',
  'Снова в отпуск',
  'Обед по расписанию',
  'Идеальный закат, ну почти идеальный',
  'Внезапно',
  'Долгожданный концерт',
  'Случай в Африке'
];

function getRandomLikes (min = 15, max = 200) {
  if (min < 0 && max < 0) {
    return NaN;
  }
  const firstNum = Math.ceil(min);
  const lastNum = Math.floor(max);
  const result = Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum;
  return result;
}

const createDescPhoto = (k) => ({
  id: setIdObj(k),
  url: `photos/${setIdObj(k - 1)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomLikes(),
  comments: createSimilarComment(),
});

const createSimilarDescPhoto = () => Array.from({length: OBJECT_COUNT}, () => createDescPhoto(1));

export{createSimilarDescPhoto};
