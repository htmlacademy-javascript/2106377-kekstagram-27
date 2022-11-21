// import{createSimilarComment} from './create-comments.js';
// import{createSimilarDescPhoto} from './create-photos.js';

// Реализовать сценарий просмотра фотографий в полноразмерном режиме.
const viewFullPhoto = document.querySelector('.big-picture');//окно просомотра

const viewPhotoNoScroll = document.querySelector('body');

// const thumbnailUsersPhoto = document.querySelectorAll('.picture__img');//миниатюры фото

//Адрес изображения url подставьте как src изображения в .big-picture__img
const fullPhotoImage = document.querySelector('.big-picture__img').querySelector('img');//полное изображение
// Количество лайков likes - текстовое содержание элемента
const likesCount = document.querySelector('.likes-count');
// Количество комментариев comments  - текстовое содержание элемент
const commentsCount = document.querySelector('.comments-count');

const commentCounter = document.querySelector('.social__comment-count');//счётчик комментариев срятать после открытия окна

const newCommentLoad = document.querySelector('.comments-loader');//загрузка иновых комментариев cрятать после открытия окна

// Описание фотографии description вставьте строкой в блок .social__caption.
const descFullPhoto = document.querySelector('.social__caption');//блок описания фото
// const descThumbnailsPhoto = createSimilarDescPhoto ();
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments

// контейнер
const commentList = document.querySelector('.social__comments');// ul блок для комментариев
// const commentListItem = commentList.querySelectorAll('.social__comment');//li
const commentListItem = commentList.children;
const buttonCommentsLoader = document.querySelector('.social__comments-loader');//кнопка «Загрузить ещё»

// все li с класслм hidden - первым 5  класс убираю
const getMoreComment = (evt) => {
  evt.preventDefault();
  //+ Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.
  commentCounter.textContent = `${parseInt(commentCounter.textContent, 10) + 5} из ${commentsCount.textContent} комментариев`;
  const hiddenComments = commentList.querySelectorAll('.hidden');//все li с классом hidden
  // console.log(hiddenComments);
  for (let i = 0; i < 5; i ++) {
    hiddenComments[i].classList.remove('hidden');
  }
  if(commentList.querySelector('.social__comment.hidden') === null) {
    commentCounter.textContent = `${parseInt(commentCounter.textContent, 10)} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  }
// если нет элементов с классом hidden - на кнопе disable
};

//используя объект desc отрисовываем комменты, количество лайков и так далее, количество комментов desc.comments.length
const drawFullPhoto = (desc, evt) => {
  evt.preventDefault();
  viewFullPhoto.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  fullPhotoImage.src = desc.url;
  likesCount.textContent = desc.likes;
  commentsCount.textContent = desc.comments.length;
  descFullPhoto.textContent = desc.description;
  // commentCounter.classList.add('hidden');
  // newCommentLoad.classList.add('hidden');
  // удаляю эллемент
  const similarCommentFragment = document.createDocumentFragment ();
  desc.comments.forEach ((content) => {
    // клонирую
    const itemElement = commentListItem[0].cloneNode(true);
    // элементы для подстановки значений из массива
    itemElement.querySelector('.social__picture').src = content.avatar;
    itemElement.querySelector('.social__picture').alt = content.name;
    itemElement.querySelector('.social__text').textContent = content.message;
    // добавляю клоннированный элемент во фрагмент
    similarCommentFragment.append(itemElement);
  });
  commentList.innerHTML = '';
  commentList.append(similarCommentFragment);

  for (let i = 5; i < commentListItem.length; i ++) {
    commentListItem[i].classList.add('hidden');
  }
  buttonCommentsLoader.addEventListener('click', () => getMoreComment(evt));
};

// Список комментариев под фотографией: в блок .social__comments.
// Разметка :
// {/* <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li> */}

//2. доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью,
// а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё».


// const hiddenComments = commentList.querySelector('.hidden');
// console.log(hiddenComments);

// buttonCommentsLoader.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   commentCounter.textContent = `${parseInt(commentCounter.textContent, 10) + 5} из ${commentsCount.textContent} комментариев`;
//   for (let i = 0; i < 5; i ++) {
//     hiddenComments[i].classList.remove('hidden');
//   }
// });

// Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев.
// + Количество показанных комментариев и общее число комментариев отображается в блоке .social__comment-count.
//+  Пример разметки списка комментариев приведён в блоке .social__comments.
// + Комментарий оформляется отдельным элементом списка li с классом social__comment.
// + Аватарка автора комментария отображается в блоке .social__picture.
// + Имя автора комментария отображается в атрибуте alt его аватарки.
// + Текст комментария выводится в блоке .social__text.

// код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия
const cancelFullPhoto = document.querySelector('.big-picture__cancel');
cancelFullPhoto.addEventListener ('click', () => {
  viewFullPhoto.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  newCommentLoad.classList.remove('hidden');
});

document.addEventListener ('keydown', (evt) => {
  if (evt.key === 'Escape') {
    viewFullPhoto.classList.add('hidden');
    viewPhotoNoScroll.classList.remove('modal-open');
    commentCounter.classList.remove('hidden');
    newCommentLoad.classList.remove('hidden');
  }
});

export{viewPhotoNoScroll};
export{drawFullPhoto};

// модуль 8 часть 2
//+ 1. Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.
