/* eslint-disable radix */
import{viewPhotoNoScroll} from './full-photo.js';
import{isEscapeKey} from './util.js';

const DEFAULT_VALUE_CONTROL = 100;
const MIN_VALUE_CONTROL = 25;
const MAX_VALUE_CONTROL = 100;
const STEP_CONTROL_VALUE = 25;

const START_EFFECT_VALUE = 100;//стартове занчение кнопки эффекта inputEffectValue.value

const uploadingImage = document.querySelector('.img-upload__overlay');//блок редактирования изображения
const inputUploadingImage = document.querySelector('#upload-file'); //input для загрузки изображения и формы

const buttonSmaller = document.querySelector('.scale__control--smaller');// кнопка регулирования -
const buttonBigger = document.querySelector('.scale__control--bigger');// кнопка регулирования +
const inputScaleValue = document.querySelector('.scale__control--value');//размер изображения
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreviewImg = uploadPreviewContainer.querySelector('img'); //картинка внутри .img-upload__preview
const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка [Х] для закрытия формы

const sliderEffects = document.querySelector('.effect-level__slider');//div слайдера
sliderEffects.classList.add('hidden');
const inputEffectValue = document.querySelector('.effect-level__value');// input - поле значения уровня эффекта (скрытый)
const effectsList = document.querySelector('.effects__list');//  ul  effects__list

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const onUploadingImageEscKeydown = (evt) => {
  if (isEscapeKey (evt)) {
    if (hashtagsInput === document.activeElement || descriptionInput === document.activeElement) {
      evt.stopPropagation();
    } else {
      closeFormImage();
    }
  }
};

//открытие формы ф-я
function openFormImage () {
  uploadingImage.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  buttonBigger.disabled = true;
  document.addEventListener ('keydown', onUploadingImageEscKeydown);//закрытие нажатием клавиши Esc.

}

inputUploadingImage.addEventListener('change',() => {
  openFormImage();
});

//закрытие формы ф-я
function closeFormImage () {
  uploadingImage.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  inputUploadingImage.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
  inputScaleValue.value = `${(DEFAULT_VALUE_CONTROL) }%`;// сброс размер изображения DEFAULT_VALUE_CONTROL
  uploadPreviewImg.style.transform = `scale(${1})`;
  uploadPreviewImg.style.filter = null;
  sliderEffects.classList.add('hidden');

  document.removeEventListener ('keydown', onUploadingImageEscKeydown);
}

buttonUploadingCancel.addEventListener (('click'), () => {
  closeFormImage();
});

// Масштаб:
buttonSmaller.addEventListener ('click', () => {
  inputScaleValue.value = `${parseInt(inputScaleValue.value) - STEP_CONTROL_VALUE}%`;//привожу значение input type="text" (100% - строчное значение) к числу -> вычисления -> преобразовние вычислений в строку  в value input type="text"
  uploadPreviewImg.style.transform = `scale(${inputScaleValue.value})`;

  if (inputScaleValue.value === `${MIN_VALUE_CONTROL}%`) {
    buttonSmaller.disabled = true;
    buttonBigger.disabled = false;
  }
});

buttonBigger.addEventListener ('click', () => {
  inputScaleValue.value = `${parseInt(inputScaleValue.value) + STEP_CONTROL_VALUE}%`;
  uploadPreviewImg.style.transform = `scale(${inputScaleValue.value})`;

  if (inputScaleValue.value === `${MAX_VALUE_CONTROL}%`) {
    buttonBigger.disabled = true;
    buttonSmaller.disabled = false;
  }
});

//Эффект:
inputEffectValue.value = START_EFFECT_VALUE;


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
    sliderEffects.noUiSlider.on('update', () => {

      const effectValue = sliderEffects.noUiSlider.get();
      inputEffectValue.value = effectValue;
      switch (evt.target.value) {
        case 'none':
          uploadPreviewImg.style.filter = null;
          break;
        case 'chrome':
          uploadPreviewImg.style.filter = `grayscale(${effectValue})`;
          break;
        case 'sepia':
          uploadPreviewImg.style.filter = `sepia(${effectValue})`;
          break;
        case 'marvin':
          uploadPreviewImg.style.filter = `invert(${effectValue})`;
          break;
        case 'phobos':
          uploadPreviewImg.style.filter = `blur(${effectValue})`;
          break;

        case 'heat':
          uploadPreviewImg.style.filter = `brightness(${effectValue})`;
          break;
      }
    });
    // uploadPreviewImg.classList = `effects__preview--${evt.target.value}`;
    // uploadPreviewImg.classList.add('`effects__preview--${evt.target.value}`');
    if(evt.target.value === 'none') {
      sliderEffects.classList.add('hidden');
    }
    if(evt.target.value === 'chrome') {
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
        format: {
          to: function (value) {
            return value;
          },
          from: function (value) {
            return value;
          },
        }
      });
    }
    if(evt.target.value === 'sepia') {
      sliderEffects.classList.remove('hidden');
      sliderEffects.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
        format: {
          to: function (value) {
            return value;
          },
          from: function (value) {
            return value;
          },
        }
      });
    }
    if(evt.target.value === 'marvin') {
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
    if(evt.target.value === 'phobos') {
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
    if(evt.target.value === 'heat') {
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
            return value;
          },
          from: function (value) {
            return value;
          },
        }
      });
    }
  }
}
//делегирование
effectsList.addEventListener ('input', onEffectChange);

export{openFormImage, closeFormImage};
