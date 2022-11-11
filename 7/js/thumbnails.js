// Отобразить фотографии других пользователей.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными
// временные данные - массив из 25 элементов -create-photos
//* ШАБЛОН:
//  <template id="picture">
// <a href="#" class="picture">
//   <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//   <p class="picture__info">
//     <span class="picture__comments"></span>
//     <span class="picture__likes"></span>
//   </p>
// </a>
// </template> */

import{createsimilarDescPhoto} from './create-photos.js';
import{COMMENT_COUNT} from './create-comments.js';
// контейнер для изображений др пользователей
const containerUsersPhoto = document.querySelector('.pictures');
// нахожу шаблон
const templateUsersPhoto = document.querySelector('#picture').content.querySelector('.picture');

// в переменную выношу экспортированную функцию
const similarPhoto = createsimilarDescPhoto();
// фрагмент
const similarPhotoFragment = document.createDocumentFragment ();
// прохожу по каждому элементу в массиве
similarPhoto.forEach ((desc) => {
  // клонирую шаблон
  const photoElement = templateUsersPhoto.cloneNode(true);
  // элементы шаблона для подстановки значений из массива
  photoElement.querySelector('.picture__img').src = desc.url;// Адрес изображения url подставьте как атрибут src изображения.
  photoElement.querySelector('.picture__likes').textContent = desc.likes;// Количество лайков likes выведите в блок .picture__likes.
  photoElement.querySelector('.picture__comments').textContent = COMMENT_COUNT;// Количество комментариев comments выведите в блок .picture__comments.
  // добавляю клоннированный элемент во фрагмент
  similarPhotoFragment.append(photoElement);
});
// добавляю клоннированный элемент в контейнер .pictures
containerUsersPhoto.append(similarPhotoFragment);
// Подключите модуль в проект +
