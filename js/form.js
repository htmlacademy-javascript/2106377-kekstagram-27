/* eslint-disable radix */
import{viewPhotoNoScroll} from './full-photo.js';
import{isEscapeKey} from './util.js';
import{resetPristine} from './form-valid.js';

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
const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',//uploadPreviewImg.style.filter
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',//uploadPreviewImg.style.filter
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',//uploadPreviewImg.style.filter
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',//uploadPreviewImg.style.filter
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSliderEffect = () => {
  sliderEffects.classList.remove('hidden');
  sliderEffects.classList.add('class-class');
  sliderEffects.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if (isDefault) {
    sliderEffects.classList.add('hidden');
  }
};

//изиенение эффекта при переключении радиокнопок
const onFormEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSliderEffect();
};

const onSliderUpdate = () => {
  uploadPreviewImg.style.filter = 'none';
  uploadPreviewImg.className = '';//?????
  inputEffectValue.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderEffects.noUiSlider.get();
  uploadPreviewImg.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  uploadPreviewImg.classList.add(`effects__preview--${chosenEffect.name}`);
  inputEffectValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSliderEffect();
};

noUiSlider.create(sliderEffects, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSliderEffect();

ImageForm.addEventListener ('change', onFormEffectChange);
sliderEffects.noUiSlider.on('update', onSliderUpdate);

//открытие формы ф-я
function openFormImage () {
  uploadingImage.classList.remove('hidden');
  viewPhotoNoScroll.classList.add('modal-open');
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
  resetEffects();
  resetPristine();
  ImageForm.reset();
  uploadPreviewImg.style.filter = null;
  sliderEffects.classList.add('hidden');

  document.removeEventListener ('keydown', onEscapeDown);
}

buttonUploadingCancel.addEventListener (('click'), () => {
  closeFormImage();
});

export{openFormImage, closeFormImage};
