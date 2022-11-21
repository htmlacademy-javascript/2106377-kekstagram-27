import{viewPhotoNoScroll} from './full-photo.js';
import{isEscapeKey} from './util.js';
const uploadingImage = document.querySelector('.img-upload__overlay');//форма редактирования изображения
const inputUploadingImage = document.querySelector('#upload-file'); //input для загрузки изображения и формы
// Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file, который стилизован под букву «О» в логотипе.
// После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
// У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

const onUploadingImageEscKeydown = (evt) => {//закрытие по ESC в перемнной(ф-я)
  if (isEscapeKey (evt)) {
    if (document.querySelector('.text__hashtags') === document.activeElement || document.querySelector('.text__description') === document.activeElement) {
      evt.stopPropagation();
    } else {
      closeFormImage();
    }
  }
};
//функция открытия формы
function openFormImage () {
  uploadingImage.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  //закрытие нажатием клавиши Esc.
  document.addEventListener ('keydown', onUploadingImageEscKeydown);
}
//слушатель на изменение input для загрузки изображения и формы
inputUploadingImage.addEventListener('change',() => {
  openFormImage();
});

// Масштаб:
// +  При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// + При изменении масштаба изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб.
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

const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка [Х] для закрытия формы

// Закрытие формы:
function closeFormImage () {
  uploadingImage.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
  inputUploadingImage.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
  inputScaleValue.value = '100%';// сброс размер изображения
}

//слушатель на нажатие кнопки закрыть окно
buttonUploadingCancel.addEventListener (('click'), () => {
  closeFormImage();
});

//МОДУЛЬ 9
// + Эффект:
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview
// CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере.
// При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
// 		При переключении эффектов, уровень насыщенности сбрасывается доначального значения (100%): слайдер, CSS-стиль изображения изначение поля должны обновляться.

const sliderEffects = document.querySelector('.effect-level__slider');//div слайдера
sliderEffects.classList.add('hidden');
const inputEffectValue = document.querySelector('.effect-level__value');// input - поле значения уровня эффекта (скрытый)
const effectsList = document.querySelector('.effects__list');//  ul  effects__list

inputEffectValue.value = 100;//начальное значение в поле ввода

//создаем слайдер с мин/макс значением шагом и начальной точкой ползунка
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
//изиенение эффекта при переключении радиокнопок
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
