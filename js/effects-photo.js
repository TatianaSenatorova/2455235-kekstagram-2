import { imgUploadForm } from './open-form.js';
import { imgPhotoPreview } from './upload-photo.js';

const scale = imgUploadForm.querySelector('.scale');

const scaleValue = scale.querySelector('.scale__control--value');
const effectsRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');


const SCALE_STEP = 25;

const ScaleMaxMin = {
  SCALE_MIN: '25%',
  SCALE_MAX: '100%',
};

const SliderDefaultValues = {
  SLIDER_MIN: 0,
  SLIDER_MAX: 100,
  SLIDER_START: 100
};

const FILTER_EFFECTS = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: [0, 1],
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: [0, 1],
    step: 0.1,
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: [0, 100],
    step: 1,
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: [0, 3],
    step: 0.1,
  },
  heat: {
    filter: 'brightness',
    range: [1, 3],
    unit: '',
    step: 0.1,
  },
};

const ScaleAction = {
  INCREASE: '+',
  DECREASE: '-'
};

sliderContainer.classList.add('hidden');

const changePhotoSize = (action, scaleData) => {
  const newScaleValue =
  action === ScaleAction.INCREASE ? scaleData + SCALE_STEP : scaleData - SCALE_STEP ;
  imgPhotoPreview.style.transform = `scale(${newScaleValue * 0.01})`;
  scaleValue.setAttribute('value', `${newScaleValue}%`);
};

scale.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('scale__control--smaller') &&
    scaleValue.value !== ScaleMaxMin.SCALE_MIN
  ) {
    changePhotoSize(ScaleAction.DECREASE, parseInt(scaleValue.value, 10));
  } else if (
    evt.target.classList.contains('scale__control--bigger') &&
    scaleValue.value !== ScaleMaxMin.SCALE_MAX
  ) {
    changePhotoSize(ScaleAction.INCREASE, parseInt(scaleValue.value, 10));
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: SliderDefaultValues.SLIDER_MIN,
    max: SliderDefaultValues.SLIDER_MAX,
  },
  start: SliderDefaultValues.SLIDER_START
});

const updateSliderData = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FILTER_EFFECTS[effect].range[0],
      max: FILTER_EFFECTS[effect].range[1]
    },
    start: FILTER_EFFECTS[effect].range[1],
    step: FILTER_EFFECTS[effect].step
  });
};

const changePhotoStyle = (effect) => {
  imgPhotoPreview.style.filter = `${effect.filter}(${effectLevelValue.value.trim()}${effect.unit})`;
};

effectsRadioButtons.forEach((button) =>{
  button.addEventListener('change', (evt) => {
    imgPhotoPreview.style.filter = 'unset';
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
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if(effectLevelValue.dataset.effect) {
    const effect = FILTER_EFFECTS[effectLevelValue.dataset.effect];
    changePhotoStyle(effect);
  }
});
