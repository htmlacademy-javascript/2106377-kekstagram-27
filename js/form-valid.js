//  +-  6. Напишите код для валидации формы добавления изображения, используя библиотеку Pristine (/vendor/pristine).
// Список полей для валидации:
// +- Хэш-теги Pristine  - выводит только одно сообщение - о длине хештега менее 2 символов
// +  Комментарий
// + - 7. Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать,
//  если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.

// - Валидация хеш-тегов?
// Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами. Набор хэш-тегов можно превратить в массив,
// воспользовавшись методом .split(). Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить
// по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям.
// Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.


const newImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const hashtagsWrapper = newImageForm.querySelector ('.img-upload__field-wrapper');//div-родитель для поля хэштегов
const hashtagsField = newImageForm.querySelector('.text__hashtags');//поле загрузки хештега

const commentField = document.querySelector('.text__description');//поле ввода коммен-я
const buttonSubmit = document.querySelector('.img-upload__submit');//кнопка отправки данных на сервер

// валидация полей хэштегов и комментов
const pristine = new Pristine(newImageForm, {
  classTo: 'img-upload__error-hashtags',
  errorClass: 'img-upload__error-hashtags--invalid',
  successClass: 'img-upload__error-hashtags--valid',
  errorTextParent: 'img-upload__error-hashtags',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

//проверка поля хэштегов по регулярному выражению
let hashtagsArr = [];

const regexp = /^#[a-zа-яё]{1,19}$/i;
const errorMessageHashtags = document.createElement('div');//элемент с сообщением о верном заполнении

function validateHashtags (value) {
  hashtagsArr = hashtagsField.value.split([' '],);
  hashtagsWrapper.append(errorMessageHashtags);
  if (hashtagsArr.length > 5) {
    errorMessageHashtags.textContent = 'не более 5 хэштегов';
    buttonSubmit.disabled = true;
    return false;
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

newImageForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  if (!pristine.validate()){
    // eslint-disable-next-line no-alert
    alert('Форма заполненна не верно');
    return false;
  }
  evt.target.submit();
});

commentField.addEventListener ('input', () => {
  if (commentField.value.length === 140) {
    buttonSubmit.disabled = true;
    // buttonSubmit.setAttribute ('disabled',true)- или так
  } else {
    buttonSubmit.disabled = false;
  }
});
