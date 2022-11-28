import{isEscapeKey} from './util.js';

const COUNT_UPLOADING_COMMENTS = 5;

const viewFullPhoto = document.querySelector('.big-picture');//окно просомотра
const viewPhotoNoScroll = document.querySelector('body');
const fullPhotoImage = document.querySelector('.big-picture__img').querySelector('img');//полное изображение
const likesCount = document.querySelector('.likes-count');// Количество лайков likes
const commentsCount = document.querySelector('.comments-count');// Количество комментариев
const commentCounter = document.querySelector('.social__comment-count');//счётчик комментариев срятать после открытия окна
const buttonCommentsLoader = document.querySelector('.social__comments-loader');//кнопка «Загрузить ещё»
const descFullPhoto = document.querySelector('.social__caption');//блок описания фото
const commentList = document.querySelector('.social__comments');// контейнер Список комментариев ul
const commentListItem = commentList.children;//li

const cancelFullPhoto = document.querySelector('.big-picture__cancel');//кнопка закрытия окна

const onUploadingImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    closeFullPhoto();
  }
};

const onButtonCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  if(commentList.querySelector('.social__comment.hidden') === null) {
    buttonCommentsLoader.classList.add('hidden');
    commentCounter.textContent = `${parseInt(commentsCount.textContent, 10)} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  } else {
    const hiddenComments = commentList.querySelectorAll('.hidden');//все li с классом hidden
    const numberComments = commentList.children.length;
    const currentComments = parseInt(commentCounter.textContent, 10) + COUNT_UPLOADING_COMMENTS;
    const insertCount = currentComments > numberComments ? numberComments : currentComments;
    commentCounter.textContent = `${insertCount} из ${commentsCount.textContent} комментариев`;
    const length = hiddenComments.length < COUNT_UPLOADING_COMMENTS ? hiddenComments.length : COUNT_UPLOADING_COMMENTS;
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

  if(commentsCount.textContent > COUNT_UPLOADING_COMMENTS ){
    commentCounter.textContent = `5 из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = false;
  } else {
    commentCounter.textContent = `${commentsCount.textContent} из ${commentsCount.textContent} комментариев`;
    buttonCommentsLoader.disabled = true;
  }

  commentList.innerHTML = '';
  commentList.append(similarCommentFragment);

  for (let i = COUNT_UPLOADING_COMMENTS; i < commentListItem.length; i ++) {
    commentListItem[i].classList.add('hidden');
  }

  buttonCommentsLoader.addEventListener('click', onButtonCommentsLoaderClick);
};

// закрытие окна
function closeFullPhoto () {
  viewFullPhoto.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  buttonCommentsLoader.classList.remove('hidden');
  buttonCommentsLoader.removeEventListener('click', onButtonCommentsLoaderClick);
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}

cancelFullPhoto.addEventListener ('click', () => {
  closeFullPhoto();
});

export{viewPhotoNoScroll};
export{drawFullPhoto};
