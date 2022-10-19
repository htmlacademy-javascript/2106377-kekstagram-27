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
// message — для формирования текста комментария —  вам необходимо взять одно или два случайных предложения из представленных ниже:
// Всё отлично!
// В целом всё неплохо. Но не всё.

const MAX_ID_NUMBER = 200;

const getRandomIdComment = (min = 1 , max = MAX_ID_NUMBER) => {
  const MINIMALVALUE = Math.ceil(min);
  const MAXIMALVALUE = Math.floor(max);
  if (min >= 1 && max <= 200) {
    const result = Math.random() * (MAXIMALVALUE - MINIMALVALUE + 1) + MINIMALVALUE;
    // console.log(Math.floor (result));
    return Math.floor(result);
  } return NaN;
};

const AVATAR = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

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

const SIMILAR_COMMENT_COUNT = 6;

// функция для получения рандомного числа из интревала положительных чисел

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

const createComment = () => ({
  id: getRandomIdComment(),
  avatar: getRandomArrayElement(AVATAR),
  message: `${getRandomArrayElement(MESSAGE)} + ${getRandomArrayElement(MESSAGE)}`,
  name: getRandomArrayElement(NAME),}
);

// Создание массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
// Структура каждого объекта должна быть следующей:
// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение

const getRandomId = (min = 1 , max = 25) => {
  const MINIMALVALUE = Math.ceil(min);
  const MAXIMALVALUE = Math.floor(max);
  if (min >= 1 && max <= 25) {
    const result = Math.random() * (MAXIMALVALUE - MINIMALVALUE + 1) + MINIMALVALUE;
    // console.log(Math.floor (result));
    return Math.floor(result);
  } return NaN;
};

const ADDRESS_URL = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg'
];

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
    // console.log(Math.floor (result));
    return Math.floor(result);
  } return NaN;
};

const SIMILAR_DESCPHOTO_COUNT = 25;

//методом from создаем массив (комментарии) длиной 6 элементов, элементы создаются вызовом функции для создания обекта

const similarComment = Array.from({length: SIMILAR_COMMENT_COUNT}, createComment);

const createDescPhoto = () => ({
  id: getRandomId(),
  url: getRandomArrayElement(ADDRESS_URL),
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomLikes (),
  comments: similarComment,}
);

const similarDescPhoto = Array.from({length: SIMILAR_DESCPHOTO_COUNT}, createDescPhoto);

similarDescPhoto();
