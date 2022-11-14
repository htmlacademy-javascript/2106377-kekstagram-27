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

// Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.
const newImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const hashtagsField = newImageForm.querySelector('.text__hashtags');//поле загрузки хештега

const commentField = document.querySelector('.text__description');//поле ввода коммен-я
const buttonSubmit = document.querySelector('.img-upload__submit');//кнопка отправки данных на сервер

// валидация полей хэштегов и комментов
const pristine = new Pristine(newImageForm, {
  classTo: 'img-upload__error-hashtags',
  errorClass: 'img-upload__error-hashtags--invalid',
  successClass: 'img-upload__error-hashtags--valid',
  errorTextParent: 'img-upload__error-hashtags',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error-text',
});

function validateHashtags (value) {
  return value.length >= 2 && value.length <= 20;
}

pristine.addValidator(//валидация поля хештегов
  hashtagsField,
  validateHashtags,
  // 'От 2 до 20 символов'
);


newImageForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  // const isValid = pristin.validate ();
  // if (isValid) {
  //   console.log('Форма заполнена верно');
  // } else {
  //   console.log('Форма заполнена не верно');
  // }
});

function validateComments (value) {
  return value.length < 140;
}

pristine.addValidator(//валидация поля коментов
  commentField,
  validateComments,
  // 'Не более 140 символов'
);


newImageForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  // const isValid = pristin.validate ();
  // if (isValid) {
  //   console.log('Форма заполнена верно');
  // } else {
  //   console.log('Форма заполнена не верно');
  // }
});

// блокировка кнопки отправки
hashtagsField.addEventListener ('input', () => {
  if (hashtagsField.value.length >= 20) {
    buttonSubmit.disabled = true;
    // buttonSubmit.setAttribute ('disabled',true)- или так
  }
});

commentField.addEventListener ('input', () => {
  if (commentField.value.length >= 140) {
    buttonSubmit.disabled = true;
    // buttonSubmit.setAttribute ('disabled',true)- или так
  }
});

// if (hashtagsField.value = /^#[a-zа-яё]{1,19}\s$/i)

// // console.log(hashtag.test ('#hello'));
// console.log(hashtag.test (hashtags.value));
// слушатель input - функция проверки хэштегов и комментов
