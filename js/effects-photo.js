import {
  SCALE_STEP,
  ScaleExtremums,
  SliderDefaultValues,
  FilterEffects,
  ScaleAction,
} from './constants.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const scaleValue = imgUploadForm.querySelector('.scale__control--value');
const scale = imgUploadForm.querySelector('.scale');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');

sliderContainer.classList.add('hidden');

const changePhotoSize = (action, scaleData) => {
  const newScaleValue =
  action === ScaleAction.INCREASE ? scaleData + SCALE_STEP : scaleData - SCALE_STEP ;
  imgUploadPreview.style.transform = `scale(${newScaleValue * 0.01})`;
  scaleValue.setAttribute('value', `${newScaleValue}%`);
};

scale.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('scale__control--smaller') &&
    scaleValue.value !== ScaleExtremums.MIN
  ) {
    changePhotoSize(ScaleAction.DECREASE, parseInt(scaleValue.value, 10));
  } else if (
    evt.target.classList.contains('scale__control--bigger') &&
    scaleValue.value !== ScaleExtremums.MAX
  ) {
    changePhotoSize(ScaleAction.INCREASE, parseInt(scaleValue.value, 10));
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: SliderDefaultValues.MIN,
    max: SliderDefaultValues.MAX,
  },
  start: SliderDefaultValues.START
});

const updateSliderData = (effect) => {
  const effectInFilters = effect.toUpperCase();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FilterEffects[effectInFilters].ranges[0],
      max: FilterEffects[effectInFilters].ranges[1]
    },
    start: FilterEffects[effectInFilters].ranges[1],
    step: FilterEffects[effectInFilters].step
  });
};

const changePhotoStyle = (effect) => {
  imgUploadPreview.style.filter = `${effect.filter}(${effectLevelValue.value.trim()}${effect.unit})`;
};

effectsRadioButtons.forEach((button) =>{
  button.addEventListener('change', (evt) => {
    imgUploadPreview.style.filter = 'unset';
    if (evt.target.value !== 'none') {
      sliderContainer.classList.remove('hidden');
      const effect = evt.target.value;
      effectLevelValue.setAttribute('data-effect', effect);
      updateSliderData(effect);
    } else if (evt.target.value === 'none') {
      sliderContainer.classList.add('hidden');
    }
  });
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get());
  if(effectLevelValue.dataset.effect) {
    const effect = FilterEffects[effectLevelValue.dataset.effect.toUpperCase()];
    changePhotoStyle(effect);
  }
});

const removeScaleChanges = () => {
  scaleValue.setAttribute('value', `${ScaleExtremums.MAX}`);
  imgUploadPreview.style.transform = 'scale(1)';
};

const removeFilterStyle = () => {
  imgUploadPreview.style.removeProperty('filter');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

export {removeScaleChanges, removeFilterStyle, hideSlider, imgUploadForm };
