/* eslint-disable radix */
import{viewPhotoNoScroll} from './full-photo.js';
import{isEscapeKey} from './util.js';
import{pristine} from './form-valid.js';

const DEFAULT_VALUE_CONTROL = 100;
const MIN_VALUE_CONTROL = 25;
const MAX_VALUE_CONTROL = 100;
const STEP_CONTROL_VALUE = 25;

const ImageForm = document.querySelector('.img-upload__form');//форма загрузки фото
const uploadingImage = document.querySelector('.img-upload__overlay');//блок редактирования изображения
const inputUploadingImage = document.querySelector('#upload-file'); //input для загрузки изображения и формы

const buttonSmaller = document.querySelector('.scale__control--smaller');// кнопка регулирования -
const buttonBigger = document.querySelector('.scale__control--bigger');// кнопка регулирования +
const inputScaleValue = document.querySelector('.scale__control--value');//размер изображения
const uploadPreviewContainer = document.querySelector('.img-upload__preview');
const uploadPreviewImg = uploadPreviewContainer.querySelector('img'); //картинка внутри .img-upload__preview
const buttonUploadingCancel = document.querySelector('#upload-cancel');//Кнопка [Х] для закрытия формы

const sliderEffects = document.querySelector('.effect-level__slider');//div слайдера
const inputEffectValue = document.querySelector('.effect-level__value');// input - поле значения уровня эффекта (скрытый)

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagsInput ||
  document.activeElement === descriptionInput;

function onEscapeDown(evt) {
  if (isEscapeKey (evt) && !isTextFieldFocused()) {
    evt.stopPropagation();
  }
}

// Масштаб:
const scaleImage = (value = DEFAULT_VALUE_CONTROL) => {
  uploadPreviewImg.style.transform = `scale(${value / 100})`;
  inputScaleValue.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(inputScaleValue.value, 10);
  let newValue = currentValue - STEP_CONTROL_VALUE;
  if (newValue < MIN_VALUE_CONTROL) {
    newValue = MIN_VALUE_CONTROL;
  }
  scaleImage (newValue);

};
const onBiggerButtonClick = () => {
  const currentValue = parseInt(inputScaleValue.value, 10);
  let newValue = currentValue + STEP_CONTROL_VALUE;
  if (newValue > MAX_VALUE_CONTROL) {
    newValue = MAX_VALUE_CONTROL;
  }
  scaleImage (newValue);
};

const resetScale = () => {
  scaleImage();
};

buttonSmaller.addEventListener ('click', onSmallerButtonClick);
buttonBigger.addEventListener ('click', onBiggerButtonClick);

//Эффект:
// inputEffectValue.value = START_EFFECT_VALUE;

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
    uploadPreviewImg.className = `effects__preview--${evt.target.value}`;
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
// effectsList.addEventListener ('input', onEffectChange);
ImageForm.addEventListener ('change', onEffectChange);


//открытие формы ф-я
function openFormImage () {
  uploadingImage.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
  uploadPreviewImg.style.filter = null;
  sliderEffects.classList.add('hidden');
  document.addEventListener ('keydown', onEscapeDown);//закрытие нажатием клавиши Esc.
}

inputUploadingImage.addEventListener('change',() => {
  openFormImage();
});

//закрытие формы ф-я
function closeFormImage () {
  uploadingImage.classList.add('hidden');
  viewPhotoNoScroll.classList.remove('modal-open');
  inputUploadingImage.value = '';// сброс поле загрузки изображения  ?Так у него вообще value нет О_О
  resetScale();
  pristine.reset();
  ImageForm.reset();
  uploadPreviewImg.style.filter = null;
  sliderEffects.classList.add('hidden');
  document.removeEventListener ('keydown', onEscapeDown);
}

buttonUploadingCancel.addEventListener (('click'), () => {
  closeFormImage();
});

export{openFormImage, closeFormImage};
