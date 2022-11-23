import{drawFullPhoto} from './full-photo.js';
// import{getRandomPositiveInteger} from './util.js';
// const RANDOM_PHOTO_COUNT = 10;
const containerUsersPhoto = document.querySelector('.pictures');// контейнер для изображений др пользователей
const templateUsersPhoto = document.querySelector('#picture').content.querySelector('.picture');// шаблон
const buttonFilterDefault = document.querySelector('#filter-default');//кнопка по умолчанию
const buttonFilterRandom = document.querySelector('#filter-random');//кнопка случайные
const buttonFilterDiscussed = document.querySelector('#filter-discussed');//кнопка обсуждаемые

const comparePhotos = (a, b) => b.comments.length - a.comments.length;

// const renderThumbnails = (similarPhoto) => {
//   const similarPhotoFragment = document.createDocumentFragment ();// фрагмент

//   similarPhoto.forEach ((desc) => {
//     const photoElement = templateUsersPhoto.cloneNode(true);// клон шаблона
//     photoElement.querySelector('.picture__img').src = desc.url;// Адрес изображения url подставьте как атрибут src изображения.
//     photoElement.querySelector('.picture__likes').textContent = desc.likes;// Количество лайков likes выведите в блок .picture__likes.
//     photoElement.querySelector('.picture__comments').textContent = desc.comments.length; // Количество комментариев comments выведите в блок .picture__comments.
//     photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
//     similarPhotoFragment.append(photoElement);// добавляю клоннированный элемент во фрагмент
//   });

//   containerUsersPhoto.innerHTML = '';
//   containerUsersPhoto.append(similarPhotoFragment);// добавляю клоннированный элемент в контейнер .pictures
// };

// блок филтров фото
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

// обработчики изменения фильтров
const setDefaultClick = (cb) => {
  buttonFilterDefault.addEventListener (('click'), () => {
    buttonFilterDefault.classList.toggle('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
};

const setRandomClick = (cb) => {
  buttonFilterRandom.addEventListener (('click'), () => {
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.toggle('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
};

const setDiscussedClick = (cb) => {
  buttonFilterDiscussed.addEventListener (('click'), () => {
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.toggle('img-filters__button--active');
    cb();
  });
};

// Случайные — 10 случайных, не повторяющихся фотографий.

// Обсуждаемые фотографии
const renderThumbnails = (similarPhoto) => {
  const similarPhotoFragment = document.createDocumentFragment ();// фрагмент

  similarPhoto
    .slice()
    .sort(comparePhotos)
    .forEach ((desc) => {
      const photoElement = templateUsersPhoto.cloneNode(true);
      photoElement.querySelector('.picture__img').src = desc.url;
      photoElement.querySelector('.picture__likes').textContent = desc.likes;
      photoElement.querySelector('.picture__comments').textContent = desc.comments.length;
      photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
      similarPhotoFragment.append(photoElement);// добавляю клоннированный элемент во фрагмент
    });

  // containerUsersPhoto.innerHTML = '';
  containerUsersPhoto.append(similarPhotoFragment);
};

export {renderThumbnails, setDefaultClick, setRandomClick, setDiscussedClick};


