import{isEscapeKey} from './util.js';

const viewFullPhoto = document.querySelector('.big-picture');//окно просомотра
const viewPhotoNoScroll = document.querySelector('body');
const fullPhotoImage = document.querySelector('.big-picture__img').querySelector('img');//полное изображение
const likesCount = document.querySelector('.likes-count');// Количество лайков likes
const commentsCount = document.querySelector('.comments-count');// Количество комментариев
const commentCounter = document.querySelector('.social__comment-count');//счётчик комментариев срятать после открытия окна
const newCommentLoad = document.querySelector('.comments-loader');//загрузка иновых комментариев cрятать после открытия окна
const descFullPhoto = document.querySelector('.social__caption');//блок описания фото
const commentList = document.querySelector('.social__comments');// контейнер Список комментариев ul
const commentListItem = commentList.children;//li
const buttonCommentsLoader = document.querySelector('.social__comments-loader');//кнопка «Загрузить ещё»
const cancelFullPhoto = document.querySelector('.big-picture__cancel');//кнопка закрытия окна

const onUploadingImageEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeFullPhoto();
  }
};

// const getMoreComment = (evt) => {
//   buttonCommentsLoader.disabled = true;
//   evt.preventDefault();
//   if(!buttonCommentsLoader.disabled) {
//     commentCounter.textContent = `${parseInt(commentCounter.textContent, 10) + 5} из ${commentsCount.textContent} комментариев`; //обновление числа показанных комментариев
//     const hiddenComments = commentList.querySelectorAll('.hidden');//все li с классом hidden
//     for (let i = 0; i < 5; i ++) {
//       hiddenComments[i].classList.remove('hidden');
//     }
//     if(commentList.querySelector('.social__comment.hidden') === null) {//если нет элементов с классом hidden кнопка загрузки не активна
//     // if(commentList.length === null) {//если нет элементов с классом hidden кнопка загрузки не активна
//       commentCounter.textContent = `${parseInt(commentCounter.textContent, 10)} из ${commentsCount.textContent} комментариев`;
//       buttonCommentsLoader.disabled = true;
//     }
//   }
// };
const getMoreComment = (evt) => {
  evt.preventDefault();
  if(commentList.querySelector('.social__comment.hidden') === null) {//если нет элементов с классом hidden кнопка загрузки не активна
    commentCounter.textContent = `${parseInt(commentCounter.textContent, 10)} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  } else {
    const hiddenComments = commentList.querySelectorAll('.hidden');//все li с классом hidden
    ////Посчитаем количество комментарие
    const numberComments = commentList.children.length;
    const currentComments = parseInt(commentCounter.textContent, 10) + 5;
    const insertCount = currentComments > numberComments ? numberComments : currentComments;
    //обновление числа показанных комментариев
    //// 5 нужно вынести в переменную и нельзя всегда прибавлять по 5 - так как число комментариев не всегда кратно 5
    commentCounter.textContent = `${insertCount} из ${commentsCount.textContent} комментариев`;
    //// Опять таки мы не можем удалить класс у пяти элементов если их осталось меньше, проверяем на этот случай
    const length = hiddenComments.length < 5 ? hiddenComments.length : 5;
    for (let i = 0; i < length; i ++) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
};

// проблема  с комментами. кнопка 'загрузить еще' блокируется, на действие при клике  продолжает
// происходить, счетчик комментариев, нужно проверять не задизейблена ли кнопка, и если задизаблена тогда прекращать грузить комменты

//отрисовка полноразмерного фото
const drawFullPhoto = (desc, evt) => {
  evt.preventDefault();
  viewFullPhoto.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  document.addEventListener ('keydown', onUploadingImageEscKeydown);

  fullPhotoImage.src = desc.url;
  likesCount.textContent = desc.likes;
  commentsCount.textContent = desc.comments.length;
  descFullPhoto.textContent = desc.description;

  const similarCommentFragment = document.createDocumentFragment ();

  desc.comments.forEach ((content) => {
    const itemElement = commentListItem[0].cloneNode(true);

    itemElement.querySelector('.social__picture').src = content.avatar;
    itemElement.querySelector('.social__picture').alt = content.name;
    itemElement.querySelector('.social__text').textContent = content.message;

    similarCommentFragment.append(itemElement);
  });

  commentList.innerHTML = '';
  commentList.append(similarCommentFragment);

  for (let i = 5; i < commentListItem.length; i ++) {
    commentListItem[i].classList.add('hidden');
  }

  buttonCommentsLoader.addEventListener('click', () => getMoreComment(evt));
};

// закрытие окна
function closeFullPhoto () {
  viewFullPhoto.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  newCommentLoad.classList.remove('hidden');
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}

cancelFullPhoto.addEventListener ('click', () => {
  closeFullPhoto();
});

export{viewPhotoNoScroll};
export{drawFullPhoto};
