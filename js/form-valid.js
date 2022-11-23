import { sendData } from './api.js';
import { showAlert } from './util.js';
import{isEscapeKey} from './util.js';

const ImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const hashtagsWrapper = ImageForm.querySelector ('.img-upload__field-wrapper');//div-родитель для поля хэштегов
const hashtagsField = ImageForm.querySelector('.text__hashtags');//поле загрузки хештега

const commentField = document.querySelector('.text__description');//поле ввода коммен-я
const buttonSubmit = document.querySelector('.img-upload__submit');//кнопка отправки данных на сервер

const regexp = /^#[a-zа-яё]{1,19}$/i;
const errorMessageHashtags = document.createElement('div');//элемент с сообщением о верном заполнении
const body = document.querySelector('body');

const onUploadingImageEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    closeSuccessMessage();
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
let hashtagsArr = [];

function validateHashtags (value) {
  hashtagsArr = hashtagsField.value.split([' ']);
  hashtagsWrapper.append(errorMessageHashtags);

  if (hashtagsArr.length > 5) {
    errorMessageHashtags.textContent = 'не более 5 хэштегов';
    buttonSubmit.disabled = true;
    return false;
  }

  if (new Set(hashtagsArr).size !== hashtagsArr.length) {
    errorMessageHashtags.textContent = 'хэштеги не должны повторяться';
    buttonSubmit.disabled = true;
    return false;
  } else {
    buttonSubmit.disabled = false;
  }
  for(let i = 0; i < hashtagsArr.length; i++) {
    if (regexp.test(hashtagsArr[i]) === false) {
      errorMessageHashtags.textContent = 'только буквы и числа, хэштеги разделяются пробелом';
      buttonSubmit.disabled = true;
      return false;
    } else {
      buttonSubmit.disabled = false;
    }
    if (hashtagsArr[i].length > 20) {
      errorMessageHashtags.textContent = 'хештег не более 20 символов';
      buttonSubmit.disabled = true;
      return false;
    } else {
      buttonSubmit.disabled = false;
    }
  }
  return (value.length >= 2);
}

//валидация поля хештегов
pristine.addValidator(
  hashtagsField,//поле проверки
  validateHashtags, //функция проверки
);

//комменты
function validateComments (value) {
  return value.length < 140;
}
//валидация поля коментов
pristine.addValidator(
  commentField,
  validateComments,
  'Не более 140 символов'
);

commentField.addEventListener ('input', () => {
  if (commentField.value.length === 140) {
    buttonSubmit.disabled = true;
    // buttonSubmit.setAttribute ('disabled',true)- или так
  } else {
    buttonSubmit.disabled = false;
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

function closeSuccessMessage () {
  document.querySelector('.success').classList.add('hidden');
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}
function closeErrorMessage () {
  document.querySelector('.error').classList.add('hidden');
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}
//показ блока успешной отправки
function showSuccessMessage () {
  const fragmentSuccessMessage = document.createDocumentFragment ();
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');

  const element = templateSuccessMessage.cloneNode(true);
  fragmentSuccessMessage.append(element);
  body.append(fragmentSuccessMessage);

  document.addEventListener ('keydown', onUploadingImageEscKeydown);

  document.addEventListener( 'click', (evt) => {
    const SuccessContainer = document.querySelector('.success__inner');
    if (!SuccessContainer.contains(evt.target)){
      SuccessContainer.classList.add('hidden');
    }
  });

  const buttonSuccess = document.querySelector('.success__button');//rryjпка закрытия сообщения

  //закрытие блока успешной отправки
  buttonSuccess.addEventListener ('click', () => {
    closeSuccessMessage();
  });
}

function showErrorMessage () {
  const fragmentErrorMessage = document.createDocumentFragment ();
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');

  const element = templateErrorMessage.cloneNode(true);
  fragmentErrorMessage.append(element);
  body.append(fragmentErrorMessage);

  document.addEventListener ('keydown', onUploadingImageEscKeydown);

  document.addEventListener( 'click', (evt) => {
    const ErrorContainer = document.querySelector('.error__inner');
    if (!ErrorContainer.contains(evt.target)){
      ErrorContainer.classList.add('hidden');
    }
  });

  const buttonError = document.querySelector('.error__button');

  //закрытие блока успешной отправки
  buttonError.addEventListener ('click', () => {
    closeErrorMessage();
  });
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
          showAlert('Форма не отправлена. Проверте правильность введенных данных');
          unblockButtonSubmit();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export{setImageFormSubmit};
