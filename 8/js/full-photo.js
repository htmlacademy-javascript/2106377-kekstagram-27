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
const commentList = document.querySelector('.social__comments');//блок для комментариев
const commentListItem = commentList.querySelectorAll('.social__comment');//li

// удаляю эллемент
for (let i = 0; i < commentListItem.length; i++ ) {
  commentList.removeChild(commentListItem[i]);
}

//используя объект desc отрисовываем комменты, количество лайков и так далее, количество комментов desc.comments.length
const drawFullPhoto = (desc, evt) => {
  evt.preventDefault();
  viewFullPhoto.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  fullPhotoImage.src = desc.url;
  likesCount.textContent = desc.likes;
  commentsCount.textContent = desc.comments.length;
  descFullPhoto.textContent = desc.description;
  commentCounter.classList.add('hidden');
  newCommentLoad.classList.add('hidden');
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
  // for (let i = 0; i < commentsArr.length; i++) {
  //   // клонирую
  //   const itemElement = commentListItem[0].cloneNode(true);
  //   // элементы для подстановки значений из массива
  //   itemElement.querySelector('.social__picture').src = commentsArr[i].avatar;
  //   itemElement.querySelector('.social__picture').alt = commentsArr[i].name;
  //   itemElement.querySelector('.social__text').textContent = commentsArr[i].message;
  //   // добавляю клоннированный элемент во фрагмент
  //   similarCommentFragment.append(itemElement);
  // }
  // добавляю фрагмент в контейнер
  commentList.append(similarCommentFragment);
};

// Список комментариев под фотографией: в блок .social__comments.
// Разметка :
// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>


// в переменную выношу экспортированную функцию (массив из 15 элементов-комментов)
// const similarComment = createSimilarComment();

//используя объект desc отрисовываем комменты, количество лайков и так далее, количество комментов desc.comments.length
// const drawCommentsFullPhoto = (desc) => {
//   // evt.preventDefault();
//   const similarCommentFragment = document.createDocumentFragment ();
//   const itemElement = commentListItem[0].cloneNode(true);
//   itemElement.querySelector('.social__picture').src = desc.description;
//   itemElement.querySelector('.social__picture').alt = desc.description;
//   itemElement.querySelector('.social__text').textContent = desc.description;
//   similarCommentFragment.append(itemElement);
//   commentList.append(similarCommentFragment);
// };
// console.log(drawcommentsFullPhoto());

// // фрагмент
// const similarCommentFragment = document.createDocumentFragment ();
// // прохожу по каждому элементу в массиве
// similarComment.forEach ((desc) => {
//   // клонирую
//   const itemElement = commentListItem[0].cloneNode(true);
//   // элементы для подстановки значений из массива
//   itemElement.querySelector('.social__picture').src = desc.avatar;
//   itemElement.querySelector('.social__picture').alt = desc.name;
//   itemElement.querySelector('.social__text').textContent = desc.message;
//   // добавляю клоннированный элемент во фрагмент
//   similarCommentFragment.append(itemElement);
// });
// // добавляю фрагмент в контейнер
// commentList.append(similarCommentFragment);


//2. доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью,
// а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё».
const buttonCommentsLoader = document.querySelector('.social__comments-loader');//кнопка «Загрузить ещё»
const containerComments = document.querySelector('.social__comment-count');//блок числа коментаривиев
const newCommentListItem = commentList.querySelectorAll('.social__comment');

for (let i = 5; i < newCommentListItem.length; i ++) {
  newCommentListItem[i].classList.add('hidden');
}

buttonCommentsLoader.addEventListener('click', () => {
  containerComments.textContent = `${parseInt(containerComments.textContent, 10) + 5} из ${commentsCount.textContent} комментариев`;
});

//+ Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.
// !!!!внимание
//хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит. Просто показываются следующие 5 комментариев из списка

// Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев.
// + Количество показанных комментариев и общее число комментариев отображается в блоке .social__comment-count.
//+  Пример разметки списка комментариев приведён в блоке .social__comments.
// + Комментарий оформляется отдельным элементом списка li с классом social__comment.
// + Аватарка автора комментария отображается в блоке .social__picture.
// + Имя автора комментария отображается в атрибуте alt его аватарки.
// + Текст комментария выводится в блоке .social__text.
//.slice(0,6)

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

// Как связать модули миниатюр и полноразмерного режима?
// Задача не имеет одного верного решения, поэтому будет правильным:
// ++ использование третьего модуля для связки двух других,
// - импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом
//  этого модуля, addEventListener и замыканиями.


// модуль 8 часть 2
//+ 1. Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.

//2. В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев таким образом,
//чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё».
//Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

// !!!!внимание
//хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит. Просто показываются следующие 5 комментариев из списка
