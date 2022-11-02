/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
источник -MDN

function getRandomIntegerNumber(min, max) {
  const firstNum = Math.ceil(min);
  const lastNum = Math.floor(max);
  if (min >= 0 && max >= 0 && min < max) {
    // console.log(Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum);
    return (Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum);
  } else {
    return (NaN);
  }
}

getRandomIntegerNumber(100, 1000);

Функция для проверки максимальной длины строки (тз - длинна комментария небольше 140 символов)

function checkStringLength(string, maxlength) {
  if (string.length <= maxlength) {
    return true;
  }
  return false;
}

checkStringLength(50, 140);*/


// Создание объекта для комментария. Структура:
// идентификатор — id — случайное число. Идентификаторы не должны повторяться.
// Поле avatar — строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
// message — для формирования текста комментария —  вам необходимо взять одно или два случайных предложения из представленных
const COMMENT_COUNT = 5;
const AVATAR_COUNT = 6;
const OBJECT_COUNT = 25;

let c = 0;

const setId = (j) => {
  c += j;
  return c;
};

const AVATAR = [];

for (let j = 1; j <= AVATAR_COUNT; j++) {
  AVATAR.push(j);
}

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Рональд Уизли',
  'Гарри Поттер',
  'Гермиона Грейнджер',
  'Драко Малфой',
  'Минерва Макгонагалл',
  'Сиверус Снегг',
];

// ф-я для получения рандомного числа из интревала положительных чисел
const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция для получения рандомного числа из индексов массива на основе предидущей функции
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// функция -получение объекта
const createComment = (k) => ({
  id: setId(k),
  avatar: `img/avatar-${getRandomArrayElement(AVATAR)}.svg`,
  message: `${getRandomArrayElement(MESSAGE)} + ${getRandomArrayElement(MESSAGE)}`,
  name: getRandomArrayElement(NAME),}
);

//методом from создаем массив комментариев длиной 10 элементов, элементы создаются вызовом функции для создания обекта
const similarComment = Array.from({length: COMMENT_COUNT}, () => createComment(1));

// Создание массива из 25 сгенерированных объектов(описание фотографии)
// Структура: id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение
let d = 0;

const setIdObj = (j) => {
  d += j;
  return d;
};

const DESCRIPTION = [
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

const getRandomLikes = (min = 15 , max = 200) => {
  const MINIMALVALUE = Math.ceil(min);
  const MAXIMALVALUE = Math.floor(max);
  if (min >= 15 && max <= 200) {
    const result = Math.random() * (MAXIMALVALUE - MINIMALVALUE + 1) + MINIMALVALUE;
    return Math.floor(result);
  } return NaN;
};

// создаем объект— описание фотографии
const createDescPhoto = (k) => ({
  id: setIdObj(k),
  url: `photos/${setIdObj(k - 1)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomLikes(),
  comments: similarComment,
});

// создаем массив из 25 сгенерированных объектов- описаний фото

// eslint-disable-next-line no-unused-vars
const similarDescPhoto = Array.from({length: OBJECT_COUNT}, () => createDescPhoto(1));

// console.log(similarDescPhoto);
