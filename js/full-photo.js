import{createSimilarComment} from './create-comments.js';
import{createSimilarDescPhoto} from './create-photos.js';
// import{COMMENT_COUNT} from './create-comments.js';

// Реализовать сценарий просмотра фотографий в полноразмерном режиме.
// и каждый раз заполнять его данными о конкретной фотографии:
// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img. +
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count. +
// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

// Для отображения окна нужно удалять класс hidden у элемента .big-picture
const viewFullPhoto = document.querySelector('.big-picture');//окно просомотра

const viewPhotoNoScroll = document.querySelector('body');

const thumbnailUsersPhoto = document.querySelectorAll('.picture__img');//миниатюры фото
const fullPhotoImage = document.querySelector('.big-picture__img').querySelector('img');//'полное изображение

const likesUsersPhoto = document.querySelectorAll('.picture__likes');
const likesCount = document.querySelector('.likes-count');

const commentsUsersPhoto = document.querySelectorAll('.picture__comments');
const commentsCount = document.querySelector('.comments-count');

const commentCounter = document.querySelector('.social__comment-count');//счётчик комментариев
const newCommentLoad = document.querySelector('.comments-loader');//загрузка иновых комментариев

// Описание фотографии description вставьте строкой в блок .social__caption.
const descFullPhoto = document.querySelector('.social__caption');//блок описания фото
const descThumbnailsPhoto = createSimilarDescPhoto ();

const thumbnailsLink = document.querySelectorAll('.picture'); //набор ссылок -минифото
for (let i = 0; i < thumbnailsLink.length; i++) {
  thumbnailsLink[i].addEventListener ('click', (evt) => {
    evt.preventDefault();
    viewFullPhoto.classList.remove('hidden');
    viewPhotoNoScroll.classList.add('modal-open');
    fullPhotoImage.src = thumbnailUsersPhoto[i].src;
    likesCount.textContent = likesUsersPhoto[i].textContent;
    commentsCount.textContent = commentsUsersPhoto[i].textContent;
    descFullPhoto.textContent = descThumbnailsPhoto[i].description;
    commentCounter.classList.add('hidden');
    newCommentLoad.classList.add('hidden');
  });
}

// Список комментариев под фотографией: комментарии должны вставляться
// в блок .social__comments. +
// Разметка каждого комментария должна выглядеть так:
// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>

// контейнер
const commentList = document.querySelector('.social__comments');
const commentListItem = commentList.querySelectorAll('.social__comment');

// удаляю эллемент
for (let i = 0; i < commentListItem.length; i++ ) {
  commentList.removeChild(commentListItem[i]);
}

// в переменную выношу экспортированную функцию (массив из 5 элементов-комментов)
const similarComment = createSimilarComment();
// фрагмент
const similarCommentFragment = document.createDocumentFragment ();
// прохожу по каждому элементу в массиве
similarComment.forEach ((desc) => {
  // клонирую
  const itemElement = commentListItem[0].cloneNode(true);
  // элементы для подстановки значений из массива
  itemElement.querySelector('.social__picture').src = desc.avatar;
  itemElement.querySelector('.social__picture').alt = desc.name;
  itemElement.querySelector('.social__text').textContent = desc.message;
  // добавляю клоннированный элемент во фрагмент
  similarCommentFragment.append(itemElement);
});
// добавляю фрагмент в контейнер
commentList.append(similarCommentFragment);

// После открытия окна спрячьте блоки +
// -счётчика комментариев .social__comment-count
// -загрузки иновых комментариев .comments-loader, добавив им класс hidden

// После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями +
//    позади не прокручивался при скролле.
// При закрытии окна не забудьте удалить этот класс. +
viewPhotoNoScroll.classList.remove('modal-open');
// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия(big-picture__cancel  cancel)
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


// Как связать модули миниатюр и полноразмерного режима?
// Задача не имеет одного верного решения, поэтому будет правильным:
// ++ использование третьего модуля для связки двух других,
// - импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом
//  этого модуля, addEventListener и замыканиями.

// Последнее решение похоже на демонстрацию по учебному проекту.
// А первое — с третьим модулем — более сложное из-за отсутствия примера, но самостоятельное.
// В качестве третьего модуля можно выбрать точку входа, а можно завести отдельный модуль,
// например «Галерея». Решение за вами.
