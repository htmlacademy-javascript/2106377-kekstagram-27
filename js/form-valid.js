import { sendData } from './api.js';
import{isEscapeKey} from './util.js';
import {openFormImage} from './form.js';


const MAX_COUNT_HASHTAG = 5;//max кол-во
const MAX_CHARACTERS_HASHTAG = 20;//max символов
const MIN_CHARACTERS_HASHTAG = 2;// min символов в поле хэштег
const MAX_CHARACTERS_COMMENT = 140;// max символов в поле коммент

const body = document.querySelector('body');
const ImageForm = document.querySelector('.img-upload__form');//форма загрузки фото

const hashtagsField = ImageForm.querySelector('.text__hashtags');//поле загрузки хештега
const commentField = document.querySelector('.text__description');//поле ввода коммен-я

const buttonSubmit = document.querySelector('.img-upload__submit');//кнопка отправки данных на сервер

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;


// валидация полей хэштегов и комментов
const pristine = new Pristine(ImageForm, {
  classTo: 'img-upload__text',//'img-upload__field-wrapper'
  errorClass: 'img-upload__text--invalid',//нет
  successClass: 'img-upload__text--valid',//нет
  errorTextParent: 'img-upload__text',//'img-upload__field-wrapper'
  errorTextTag: 'div',//нет
  errorTextClass: 'img-upload__text__error-text',//'img-upload__field-wrapper__error'
},
true
);

//проверка поля хэштегов по регулярному выражению
let hashtags = [];

function splitHashtagString () {
  hashtags = hashtagsField.value.split(' ');
}

const validateCountHashtags = () => {
  splitHashtagString();
  return hashtags.length <= MAX_COUNT_HASHTAG;
};

const validateLengthHashtags = () => new Set(hashtags).size === hashtags.length;

const validateTextHashtags = () => {
  hashtags = hashtagsField.value.trim().split(' ');
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    if (!regexp.test(hashtags[i]) === true && hashtags[i] !== '') {
      return false;
    }
  }
  return true;
};

const validateMinLengthHashtags = () => {
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length < MIN_CHARACTERS_HASHTAG && hashtags[i] === '#') {
      return false;
    }
  }
  return true;
};

const validateMaxLengthHashtags = () => {
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    if (hashtags[i].length >= MAX_CHARACTERS_HASHTAG){
      return false;
    }
  }
  return true;
};

//валидация поля хештегов
pristine.addValidator(
  hashtagsField,
  validateCountHashtags,
  'не более 5 хэштегов'
);
pristine.addValidator(
  hashtagsField,
  validateLengthHashtags,
  'хэштеги не должны повторяться'
);
pristine.addValidator(
  hashtagsField,
  validateTextHashtags,
  //// поправила текст, а то будет выводится ошибка если первая буква, и не понятно что не так
  'хэштеги начинаются с решетки и состоят только из букв и чисел, хэштеги разделяются пробелом'
);
pristine.addValidator(
  hashtagsField,
  validateMaxLengthHashtags,
  'хештег не более 20 символов'
);
pristine.addValidator(
  hashtagsField,
  validateMinLengthHashtags,
  'не может состоять только из одной решётки'
);

//комменты
function validateComments (value) {
  return value.length < MAX_CHARACTERS_COMMENT;
}
//валидация поля коментов
pristine.addValidator(
  commentField,
  validateComments,
  'Не более 140 символов'
);

//блокировка кнопки во время отправки и разблокировние после
const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};


//показ блока успешной отправки

const onSuccesMessageSubmitEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeErrorMessage();
  }
};
const onSuccesMessageSubmitClick = (evt) => {//закрытие по click вне модалки
  const SuccessContainer = body.querySelector('.success');
  const SuccessModal = SuccessContainer.querySelector('.success__inner');

  if (!SuccessModal.contains(evt.target)){
    closeSuccessMessage();
  }
};
const showSuccessMessage = () => {
  const fragmentSuccessMessage = document.createDocumentFragment ();
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');

  const element = templateSuccessMessage.cloneNode(true);
  fragmentSuccessMessage.append(element);
  body.append(fragmentSuccessMessage);

  const buttonSuccess = document.querySelector('.success__button');//rryjпка закрытия сообщения

  document.addEventListener ('keydown', onSuccesMessageSubmitEscKeydown);
  document.addEventListener('click', onSuccesMessageSubmitClick);
  buttonSuccess.addEventListener ('click', closeSuccessMessage);//закрытие блока успешной отправки по [X]
};

function closeSuccessMessage () {
  document.querySelector('.success').classList.add('hidden');
  document.removeEventListener ('keydown', onSuccesMessageSubmitEscKeydown);
  document.removeEventListener( 'click', onSuccesMessageSubmitClick);
}

//показ блока успешной отправки
const onErrorMessageSubmitEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeErrorMessage();
    openFormImage();
  }
};

const onErrorMessageSubmitClick = (evt) => {//закрытие по click вне модалки
  const ErrorContainer = document.querySelector('.error');
  const ErrorModal = ErrorContainer.querySelector('.error__inner');

  if (!ErrorModal.contains(evt.target)){
    closeErrorMessage();
    openFormImage();
  }
};

const showErrorMessage = () => {
  const fragmentErrorMessage = document.createDocumentFragment ();
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');

  const element = templateErrorMessage.cloneNode(true);
  fragmentErrorMessage.append(element);
  body.append(fragmentErrorMessage);

  const buttonError = document.querySelector('.error__button');
  // const modalConainer = document.querySelector('.error');
  // modalConainer.classList.add('modal');

  document.addEventListener ('keydown', onErrorMessageSubmitEscKeydown);
  document.addEventListener( 'click', onErrorMessageSubmitClick);
  buttonError.addEventListener ('click', closeErrorMessage);//закрытие блока неуспешной отправки
};

function closeErrorMessage () {
  document.querySelector('.error').classList.add('hidden');
  document.removeEventListener ('keydown', onErrorMessageSubmitEscKeydown);
  document.removeEventListener( 'click', onErrorMessageSubmitClick);
}


//обработчик отправки с параметром-клбэком (в случае успешной отправки)
const setImageFormSubmit = (onSuccess) => {
  ImageForm.addEventListener ('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockButtonSubmit();
      sendData(
        () => {
          onSuccess();
          unblockButtonSubmit();
          hashtagsField.value = '';
          commentField.value = '';
          showSuccessMessage();
        },
        () => {
          unblockButtonSubmit();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export{setImageFormSubmit, pristine};
