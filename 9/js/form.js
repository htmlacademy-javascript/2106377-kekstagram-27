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
const inputUploadingImage = document.querySelector('#upload-file'); //input для загрузки изображения и формы
// Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file, который стилизован под букву «О» в логотипе.
// После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
// У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

inputUploadingImage.addEventListener('change',() => {
  uploadingImage.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  //закрытие нажатием клавиши Esc.
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
});

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
  if (inputScaleValue.value === `${parseInt(25, 10)}%`) {
    buttonSmaller.disabled = true;
    buttonBigger.disabled = false;
  }
});

buttonBigger.addEventListener ('click', () => {
  inputScaleValue.value = `${parseInt(inputScaleValue.value, 10) + 25}%`;
  uploadPreviewImg.style = `transform: scale(${parseInt(inputScaleValue.value, 10) / 100})`;
  if (inputScaleValue.value === `${parseInt(100, 10)}%`) {
    buttonBigger.disabled = true;
    buttonSmaller.disabled = false;
  }
});

// + 5. После реализуйте закрытие формы.
// !! Обратите внимание
//+- при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload-file.

// В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.
// НЕПОНЯТНО!!!!!!!!     Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой
// не отобразится, что будет нарушением техзадания. Значение других полей формы также нужно сбрасывать.

//+Закрытие формы редактирования нажатием на кнопку #upload-cancel, элементу .img-upload__overlay возвращается  hidden. У элемента body удаляется  modal-open.

const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка [Х] для закрытия формы
buttonUploadingCancel.addEventListener (('click'), () => {
  uploadingImage.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  inputUploadingImage.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
  inputScaleValue.value = '100%';// сброс размер изображения
});

//МОДУЛЬ 9
// С помощью библиотеки noUiSlider (/vendor/nouislider) реализуйте применение эффекта для изображения.
//Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер. -input скрытый
// + Эффект:
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview
// CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
// Уровень эффекта записывается в поле .effect-level__value.
// При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview
// обновляются

// 		При переключении эффектов, уровень насыщенности сбрасывается доначального значения (100%):
//    слайдер, CSS-стиль изображения изначение поля должны обновляться.
// const newImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const sliderEffects = document.querySelector('.effect-level__slider');//div слайдера
sliderEffects.classList.add('hidden');
const inputEffectValue = document.querySelector('.effect-level__value');// input - поле значения уровня эффекта
// const fieldsetEffectLevel = document.querySelector('.effect-level');//fieldset изменение глубины эффекта
// const effectsFieldset = document.querySelector('.effects');// fieldset наложение эффекта на изображение effects__list
const effectsList = document.querySelector('.effects__list');//  ul  effects__list

inputEffectValue.value = 100;//начальное значение в поле ввода

//создаем слайдер с мин/макс значением шагом и начальной точкой
noUiSlider.create(sliderEffects, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function onEffectChange (evt) {
  // console.log(inputEffectValue.value);
  if (evt.target.checked) {
    sliderEffects.noUiSlider.on('update', () => {//события update будет вызвано при изменении положения слайдера, и выводить в консоль параметры колбэка.
      // inputEffectValue.value = `${String(sliderEffects.noUiSlider.get())}%`;//в value поля ввода -актуальное значение слайдера - метод noUiSlider.get()
      inputEffectValue.value = sliderEffects.noUiSlider.get();//в value поля ввода -актуальное значение слайдера - метод noUiSlider.get()
      switch (evt.target.value) {
        case 'none':
          uploadPreviewImg.style.filter = null;
          break;
        case 'chrome':
          uploadPreviewImg.style = `filter: grayscale(${parseInt(inputEffectValue.value, 10)})`;
          break;
        case 'sepia':
          uploadPreviewImg.style = `filter: sepia(${parseInt(inputEffectValue.value, 10)})`;
          break;
        case 'marvin':
          uploadPreviewImg.style = `filter: invert(${parseInt(inputEffectValue.value, 10)})`;
          break;
        case 'phobos':
          uploadPreviewImg.style = `filter: blur(${parseInt(inputEffectValue.value, 10)})`;
          break;

        case 'heat':
          uploadPreviewImg.style = `filter: brightness(${parseInt(inputEffectValue.value, 10)})`;
          break;
      }
    });
    uploadPreviewImg.classList = `effects__preview--${evt.target.value}`;
    if(evt.target.value === 'none') {//Для  оригинала фильтр уддаляется
      sliderEffects.classList.add('hidden');//слайдер скрывается.
    }
    if(evt.target.value === 'chrome') {//Для эффекта «Хром»— filter: grayscale(0..1) с шагом 0.1
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
      });
    }
    if(evt.target.value === 'sepia') {//Для эффекта «Сепия»— filter: sepia(0..1) с шагом 0.1;
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
      });
    }
    if(evt.target.value === 'marvin') {//Для эффекта «Марвин»— filter: invert(0..100%) с шагом 1%;
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1,
        format: {
          to: function (value) {
            return `${String(value)}%`;
          },
          from: function (value) {
            return parseFloat(value);
          },
        },
      });
    }
    if(evt.target.value === 'phobos') {//Для эффекта «Фобос»— filter: blur(0..3px) с шагом 0.1px;
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1,
        format: {
          to: function (value) {
            return `${String(value)}px`;
          },
          from: function (value) {
            return parseFloat(value);
          },
        },
      });
    }
    if(evt.target.value === 'heat') {//Для эффекта «Зной»— filter: brightness(1..3) с шагом 0.1;
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
    }
  }
}

//делегирование
effectsList.addEventListener ('input', onEffectChange);
// newImageForm.addEventListener ('input', onEffectChange);
