import{drawFullPhoto} from './full-photo.js';
// import{getRandomPositiveInteger} from './util.js';
const RANDOM_PHOTO_COUNT = 10;
const containerUsersPhoto = document.querySelector('.pictures');// контейнер для изображений др пользователей
const templateUsersPhoto = document.querySelector('#picture').content.querySelector('.picture');// шаблон
const filtersForm = document.querySelector('.img-filters__form');//форма с кнопкками филтров

const comparePhotos = (a, b) => b.comments.length - a.comments.length;

const renderThumbnails = (similarPhoto, button = 'filter-default') => {
  const similarPhotoFragment = document.createDocumentFragment ();// фрагмент
  switch (button) {
    case 'filter-default':
      similarPhoto.forEach ((desc) => {
        const photoElement = templateUsersPhoto.cloneNode(true);// клон шаблона
        photoElement.querySelector('.picture__img').src = desc.url;// Адрес изображения url подставьте как атрибут src изображения.
        photoElement.querySelector('.picture__likes').textContent = desc.likes;// Количество лайков likes выведите в блок .picture__likes.
        photoElement.querySelector('.picture__comments').textContent = desc.comments.length; // Количество комментариев comments выведите в блок .picture__comments.
        photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
        similarPhotoFragment.append(photoElement);// добавляю клоннированный элемент во фрагмент
      });
      // containerUsersPhoto.innerHTML = '';
      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);// добавляю клоннированный элемент в контейнер .picture
      break;
    case 'filter-random':
      similarPhoto
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_PHOTO_COUNT)
        .forEach ((desc) => {
          const photoElement = templateUsersPhoto.cloneNode(true);// клон шаблона
          photoElement.querySelector('.picture__img').src = desc.url;// Адрес изображения url подставьте как атрибут src изображения.
          photoElement.querySelector('.picture__likes').textContent = desc.likes;// Количество лайков likes выведите в блок .picture__likes.
          photoElement.querySelector('.picture__comments').textContent = desc.comments.length; // Количество комментариев comments выведите в блок .picture__comments.
          photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
          similarPhotoFragment.append(photoElement);// добавляю клоннированный элемент во фрагмент
        });
      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);// добавляю клоннированный элемент в контейнер .pictures
      break;
    case 'filter-discussed':
      similarPhoto
        .slice()
        .sort(comparePhotos)
        .forEach ((desc) => {
          const photoElement = templateUsersPhoto.cloneNode(true);
          photoElement.querySelector('.picture__img').src = desc.url;
          photoElement.querySelector('.picture__likes').textContent = desc.likes;
          photoElement.querySelector('.picture__comments').textContent = desc.comments.length;
          similarPhotoFragment.append(photoElement);// добавляю клоннированный элемент во фрагмент
        });
      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);
      break;
  }
};

// const pic = document.queryeSelectorAll('.picture');
// console.log(pic);
// // pic.forEach((elem) => elem.remove());

// блок филтров фото
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filtersForm.querySelector('#filter-default').classList.remove('img-filters__button--active');
  filtersForm.addEventListener (('click'), (evt) => {
    // ты тут удаляй класс, если он есть на кнопках. Например

    filtersForm.querySelectorAll('.img-filters__button').forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    if(evt.target.classList.contains('img-filters__button')){
      const button = evt.target;
      button.classList.toggle('img-filters__button--active');
      cb(button.id);
    }
  });
};

export {renderThumbnails, setFilterClick};

