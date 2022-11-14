//+  1. Заведите модуль, который будет отвечать за работу с формой.

//+ 2. Пропишите тегу <form> правильные значения атрибутов method и адрес action для отправки формы на сервер.
// !! Обратите внимание.
// пока достаточно правильных атрибутов у тега <form>.

//- Если форма заполнена верно, то после отправки покажется страница сервера (по адресу из атрибута action тега form) с успешно
// отправленными данными.
//-  Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками.
//- В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.

// + 3. Проверьте разметку вашего проекта и добавьте недостающие атрибуты.
// Например, всем обязательным полям нужно добавить атрибут required.
// Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.

// + 4. Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения.
// Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.
// В работе вы можете опираться на код показа окна с полноразмерной фотографией
// !! Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа.В данном задании этот пункт реализовывать не нужно.
// У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

import{viewPhotoNoScroll} from './full-photo.js';
const uploadingImage = document.querySelector('.img-upload__overlay');//форма редактирования изображения
uploadingImage.classList.remove('hidden');
viewPhotoNoScroll.classList.add('modal-open');

// Масштаб:
// +  При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// + При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться
// соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.
// Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

const buttonSmaller = document.querySelector('.scale__control--smaller');// кнопка регулирования -
const buttonBigger = document.querySelector('.scale__control--bigger');// кнопка регулирования +
const inputScaleValue = document.querySelector('.scale__control--value');//размер изображения

const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreviewImg = uploadPreviewContainer.querySelector('img'); //картинка внутри .img-upload__preview

buttonSmaller.addEventListener ('click', () => {
  inputScaleValue.value = `${parseInt(inputScaleValue.value, 10) - 25}%`;
  uploadPreviewImg.style = `transform: scale(${parseInt(inputScaleValue.value, 10) / 100})`;
});

buttonBigger.addEventListener ('click', () => {
  inputScaleValue.value = `${parseInt(inputScaleValue.value, 10) + 25}%`;
  uploadPreviewImg.style = `transform: scale(${parseInt(inputScaleValue.value, 10) / 100})`;
});

// + Эффект:
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview
// CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
const effectsFieldset = document.querySelector('.effects');// fieldset

function onEffectChange (evt) {
  if (evt.target.matches('input[type="radio"]')){
    uploadPreviewImg.classList = `effects__preview--${evt.target.value}`;
  }
}

effectsFieldset.addEventListener ('change', onEffectChange);

// + 5. После реализуйте закрытие формы.
// !! Обратите внимание
//+- при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload-file.
// В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.
// НЕПОНЯТНО!!!!!!!!     Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой
// не отобразится, что будет нарушением техзадания. Значение других полей формы также нужно сбрасывать.

// Закрытие формы редактирования:
//+  либо нажатием на кнопку #upload-cancel,
//+  либо нажатием клавиши Esc.
//+  Элементу .img-upload__overlay возвращается  hidden. У элемента body удаляется  modal-open.

const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка [Х] для закрытия формы
buttonUploadingCancel.addEventListener (('click'), () => {
  uploadingImage.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  const inputUploadFile = document.querySelector('#upload-file');//поле загрузки изображения
  inputUploadFile.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
  inputScaleValue.value = '100%';// сброс размер изображения
});

// + Как отменить обработчик Esc при фокусе?
// Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия
// клавиш в поле при фокусе.

document.addEventListener ('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (document.querySelector('.text__hashtags') === document.activeElement || document.querySelector('.text__description') === document.activeElement) {
      evt.stopPropagation();
    } else {
      uploadingImage.classList.add('hidden');
      viewPhotoNoScroll.classList.remove('modal-open');
    }
  }
});
