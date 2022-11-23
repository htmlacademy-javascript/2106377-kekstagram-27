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

const getMoreComment = (evt) => {
  evt.preventDefault();
  if(commentList.querySelector('.social__comment.hidden') === null) {//если нет элементов с классом hidden кнопка загрузки не активна
    commentCounter.textContent = `${parseInt(commentsCount.textContent, 10)} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  } else {
    const hiddenComments = commentList.querySelectorAll('.hidden');//все li с классом hidden
    const numberComments = commentList.children.length;
    const currentComments = parseInt(commentCounter.textContent, 10) + 5;
    const insertCount = currentComments > numberComments ? numberComments : currentComments;
    commentCounter.textContent = `${insertCount} из ${commentsCount.textContent} комментариев`;
    const length = hiddenComments.length < 5 ? hiddenComments.length : 5;
    for (let i = 0; i < length; i ++) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
};

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

  if(commentsCount.textContent > 5 ){
    commentCounter.textContent = `5 из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = false;
  } else {
    commentCounter.textContent = `${commentsCount.textContent} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  }

  commentList.innerHTML = '';
  commentList.append(similarCommentFragment);

  for (let i = 5; i < commentListItem.length; i ++) {
    commentListItem[i].classList.add('hidden');
  }

  buttonCommentsLoader.addEventListener('click', getMoreComment);
};

// закрытие окна
function closeFullPhoto () {
  viewFullPhoto.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  newCommentLoad.classList.remove('hidden');
  buttonCommentsLoader.removeEventListener('click', getMoreComment);
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}

cancelFullPhoto.addEventListener ('click', () => {
  closeFullPhoto();
});

export{viewPhotoNoScroll};
export{drawFullPhoto};
