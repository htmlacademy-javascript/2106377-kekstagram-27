import { sendData } from './api.js';
import{isEscapeKey} from './util.js';
import {openFormImage} from './form.js';

const MAX_COUNT_HASHTAG = 5;//max кол-во
const MAX_CHARACTERS_HASHTAG = 20;//max символов
const MIN_CHARACTERS_VALUE_HASHTAG = 2;// min символов в поле хэштег
const MAX_CHARACTERS_VALUE_COMMENT = 2;// min символов в поле коммент

const ImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const hashtagsWrapper = ImageForm.querySelector ('.img-upload__field-wrapper');//div-родитель для поля хэштегов
const hashtagsField = ImageForm.querySelector('.text__hashtags');//поле загрузки хештега

const commentField = document.querySelector('.text__description');//поле ввода коммен-я
const buttonSubmit = document.querySelector('.img-upload__submit');//кнопка отправки данных на сервер

const regexp = /^#[a-zа-яё]{1,19}$/i;
const errorMessageHashtags = document.createElement('div');//элемент с сообщением о верном заполнении
const body = document.querySelector('body');

const onSuccesMessageSubmitEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeSuccessMessage();
  }
};
const onErrorMessageSubmitEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeErrorMessage();
    openFormImage();
  }
};

const onSuccesMessageSubmitClick = (evt) => {//закрытие по click вне модалки
  const SuccessContainer = body.querySelector('.success');
  const SuccessModal = SuccessContainer.querySelector('.success__inner');

  if (!SuccessModal.contains(evt.target)){
    closeSuccessMessage();
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

// валидация полей хэштегов и комментов
const pristine = new Pristine(ImageForm, {
  classTo: 'img-upload__error-hashtags',
  errorClass: 'img-upload__error-hashtags--invalid',
  successClass: 'img-upload__error-hashtags--valid',
  errorTextParent: 'img-upload__error-hashtags',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

//проверка поля хэштегов по регулярному выражению
let hashtags = [];

function validateHashtags (value) {
  hashtags = hashtagsField.value.split(' ');
  hashtagsWrapper.append(errorMessageHashtags);
  buttonSubmit.disabled = false;

  if (hashtags.length > MAX_COUNT_HASHTAG) {
    errorMessageHashtags.textContent = 'не более 5 хэштегов';
    return false;
  }

  if (new Set(hashtags).size !== hashtags.length) {
    errorMessageHashtags.textContent = 'хэштеги не должны повторяться';
    return false;
  }

  for(let i = 0; i < hashtags.length; i++) {
    if (regexp.test(hashtags[i]) === false) {
      errorMessageHashtags.textContent = 'только буквы и числа, хэштеги разделяются пробелом';
      return false;
    }
    if (hashtags[i].length > MAX_CHARACTERS_HASHTAG) {
      errorMessageHashtags.textContent = 'хештег не более 20 символов';
      return false;
    }
  }
  return (value.length >= MIN_CHARACTERS_VALUE_HASHTAG);
}

//валидация поля хештегов
pristine.addValidator(
  hashtagsField,//поле проверки
  validateHashtags, //функция проверки
);

//комменты
function validateComments (value) {
  return value.length < MAX_CHARACTERS_VALUE_COMMENT;
}
//валидация поля коментов
pristine.addValidator(
  commentField,
  validateComments,
  'Не более 140 символов'
);

commentField.addEventListener ('input', () => {
  if (commentField.value.length === MAX_CHARACTERS_VALUE_COMMENT) {
    buttonSubmit.disabled = true;
  }
});

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
function closeSuccessMessage () {
  document.querySelector('.success').classList.add('hidden');
  document.removeEventListener ('keydown', onSuccesMessageSubmitEscKeydown);
  document.removeEventListener( 'click', onSuccesMessageSubmitClick);
}

function showSuccessMessage () {
  const fragmentSuccessMessage = document.createDocumentFragment ();
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');

  const element = templateSuccessMessage.cloneNode(true);
  fragmentSuccessMessage.append(element);
  body.append(fragmentSuccessMessage);

  document.addEventListener ('keydown', onSuccesMessageSubmitEscKeydown);

  document.addEventListener( 'click', onSuccesMessageSubmitClick);

  const buttonSuccess = document.querySelector('.success__button');//rryjпка закрытия сообщения

  buttonSuccess.addEventListener ('click', closeSuccessMessage);//закрытие блока успешной отправки по [X]
}

//показ блока неуспешной отправки
function closeErrorMessage () {
  document.querySelector('.error').classList.add('hidden');
  document.removeEventListener ('keydown', onErrorMessageSubmitEscKeydown);
  document.removeEventListener( 'click', onErrorMessageSubmitClick);
}


function showErrorMessage () {
  const fragmentErrorMessage = document.createDocumentFragment ();
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');

  const element = templateErrorMessage.cloneNode(true);
  fragmentErrorMessage.append(element);
  body.append(fragmentErrorMessage);

  document.addEventListener ('keydown', onErrorMessageSubmitEscKeydown);

  document.addEventListener( 'click', onErrorMessageSubmitClick);

  const buttonError = document.querySelector('.error__button');

  buttonError.addEventListener ('click', closeErrorMessage);//закрытие блока неуспешной отправки
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
    // ImageForm.reset();
    buttonSubmit.disabled = true;
  });
};

export{setImageFormSubmit};
