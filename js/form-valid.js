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

const regexp = /^#[a-zа-яё0-9]{1,20}$/i;


// const isTextFieldFocused = () =>
//   document.activeElement === hashtagsField ||
//   document.activeElement === commentField;

// // function onEscapeDown(evt) {
// //   if (isEscapeKey (evt) && !isTextFieldFocused()) {
// //    evt.stopPropagation();
// //   }
// // };

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
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    // console.log(hashtags.length);
    return (regexp.test(hashtags[i]) === true);
  }
};

const validateMinLengthHashtags = () => {
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    return (hashtags[i].length >= MIN_CHARACTERS_HASHTAG);
  }
};

const validateMaxLengthHashtags = () => {
  splitHashtagString();
  for(let i = 0; i < hashtags.length; i++) {
    return (hashtags[i].length <= MAX_CHARACTERS_HASHTAG);
  }
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
  'только буквы и числа, хэштеги разделяются пробелом'
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
const resetPristine = () => {
  const a = document.querySelector('.img-upload__text__error-text');
  a.textContent = '';
};

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
// const showModal = () => {
//   overlay.classList.remove('hidden');
//   body.classList.add('modal-open');
//   document.addEventListener('keydown', onEscapeDown);
// };
// const hideModal = () => {
//   Form.reset();
//   resetScale();
//   resetEffects();
//   pristine.reset();
//   overlay.classList.add('hidden');
//   body.classList.remove('modal-open');
//   document.removeEventListener('keydown', onEscapeDown);
// };

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

export{setImageFormSubmit, resetPristine};
