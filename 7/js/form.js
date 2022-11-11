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

// 4. Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения.
// Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.
// В работе вы можете опираться на код показа окна с полноразмерной фотографией
// !! Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа.
// В данном задании этот пункт реализовывать не нужно.

// У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

// import{viewPhotoNoScroll} from './full-photo.js';
// const uploadingImage = document.querySelector('.img-upload__overlay');//форма редактирования изображения
// uploadingImage.classList.remove('hidden');
// viewPhotoNoScroll.classList.add('modal-open');

// Масштаб:
//+  При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// +- При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться
// соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.
// Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

// const buttonSmaller = document.querySelector('.scale__control--smaller');
// const buttonBigger = document.querySelector('.scale__control--bigger');
// const inputScaleValue = document.querySelector('.scale__control--value');//размер изображения
// buttonSmaller.addEventListener ('click', () => {
//   inputScaleValue.value = (parseInt(inputScaleValue.value, 10) - 25) + '%';
// });

// buttonBigger.addEventListener ('click', () => {
//   inputScaleValue.value = (parseInt(inputScaleValue.value, 10) + 25) + '%';
});
// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться
// // соответствующий стиль CSS
// const uploadPreview = document.querySelector('.img-upload__preview');
// const uploadPreviewImg = uploadPreview.querySelector('img'); //картинка внутри .img-upload__preview

// uploadPreviewImg.style.transform.scale = (0.75); !!не понятно
// uploadPreviewImg.style.transform = scale (0.75); !!не понятно

// Эффект:
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview
// CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// .effects__preview--sepia
// .effects__preview--marvin
// .effects__preview--phobos
// .effects__preview--heat

// const effectsList = document.querySelector('.effects__list');//список
// const effectsListItem = effectsList.querySelectorAll('.effects__item'); //li все

// const addCheckHandler = function (item) {
//   const radio = item.querySelector('.effects__radio');
//   radio.addEventListener('change', () => {
//     // console.log('получилось');
//     uploadPreviewImg.classList.add('effects__preview--chrome');
//   });
// };

// for (let i = 0; i < effectsListItem.length; i++) {
//   addCheckHandler(effectsListItem[i]);
// }

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

// const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка для закрытия формы
// buttonUploadingCancel.addEventListener (('click'), () => {
//   uploadingImage.classList.add('hidden');
//   viewPhotoNoScroll.classList.remove('modal-open');
//   const inputUploadFile = document.querySelector('#upload-file');//поле загрузки изображения
//   inputUploadFile.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
//   inputScaleValue.value = '100%';// сброс размер изображения
// });

// document.addEventListener ('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     uploadingImage.classList.add('hidden');
//     viewPhotoNoScroll.classList.remove('modal-open');
//   }
// });

//+- 6. Напишите код для валидации формы добавления изображения, используя библиотеку Pristine (/vendor/pristine).
// Список полей для валидации:
// Хэш-теги
// Комментарий
// файл form-valid.js

// 7. Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать,
//  если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.


// Как отменить обработчик Esc при фокусе?
// Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия
// клавиш в поле при фокусе.


// Валидация хеш-тегов?
// Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами. Набор хэш-тегов можно превратить в массив,
// воспользовавшись методом .split(). Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить
// по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям.
// Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.

// Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.
