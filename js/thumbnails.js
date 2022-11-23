import{drawFullPhoto} from './full-photo.js';
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
        const photoElement = templateUsersPhoto.cloneNode(true);
        photoElement.querySelector('.picture__img').src = desc.url;
        photoElement.querySelector('.picture__likes').textContent = desc.likes;
        photoElement.querySelector('.picture__comments').textContent = desc.comments.length;
        photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
        similarPhotoFragment.append(photoElement);
      });

      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);
      break;
    case 'filter-random':
      similarPhoto
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_PHOTO_COUNT)
        .forEach ((desc) => {
          const photoElement = templateUsersPhoto.cloneNode(true);
          photoElement.querySelector('.picture__img').src = desc.url;
          photoElement.querySelector('.picture__likes').textContent = desc.likes;
          photoElement.querySelector('.picture__comments').textContent = desc.comments.length;
          photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
          similarPhotoFragment.append(photoElement);
        });

      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);
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
          photoElement.addEventListener('click', (evt) => drawFullPhoto(desc, evt));
          similarPhotoFragment.append(photoElement);
        });
      document.querySelectorAll('.picture').forEach((elem) => elem.remove());
      containerUsersPhoto.append(similarPhotoFragment);
      break;
  }
};

// блок филтров фото
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

//обработчики
const setFilterClick = (cb) => {
  filtersForm.querySelector('#filter-default').classList.remove('img-filters__button--active');
  filtersForm.addEventListener (('click'), (evt) => {

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

