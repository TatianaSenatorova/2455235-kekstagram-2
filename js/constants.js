const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorIdTemplates = {
  LOAD_ERROR: 'data-error',
  SEND_ERROR: 'error',
  SUCCESS: 'success',
};

const PHOTO_ITEMS_NUMBER = 25;

const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const SORT_FUNCTIONS = {
  getRandom: () => 0.5 - Math.random(),
  getDiscussed: (a,b) => b.comments.length - a.comments.length
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const PHOTO_NUMBERS_DEFAULT = 25;
const PHOTO_NUMBERS_RANDOM = 10;

const OPEN_COMMENTS_ON_CLICK = 5;

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const SCALE_STEP = 25;

const ScaleExtremums = {
  MIN: '25%',
  MAX: '100%',
};

const SliderDefaultValues = {
  MIN: 0,
  MAX: 100,
  START: 100
};

const FilterEffects = {
  CHROME:{
    filter: 'grayscale',
    unit: '',
    ranges: [0, 1],
    step: 0.1,
  },
  SEPIA: {
    filter: 'sepia',
    unit: '',
    ranges: [0, 1],
    step: 0.1,
  },
  MARVIN: {
    filter: 'invert',
    unit: '%',
    ranges: [0, 100],
    step: 1,
  },
  PHOBOS: {
    filter: 'blur',
    unit: 'px',
    ranges: [0, 3],
    step: 0.1,
  },
  HEAT: {
    filter: 'brightness',
    unit: '',
    ranges: [1, 3],
    step: 0.1,
  },
};

const ScaleAction = {
  INCREASE: '+',
  DECREASE: '-'
};

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MIN_HASH_LENGTH = 2;
const MAX_NUMBER_HASHES = 5;

const HashErrorsText = {
  HASH_ERROR: `хэштеги: разделяются пробелами, начинаются с # (решётки), не могут состоять только из решётки, после решётки состоят из букв и чисел, максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  AMOUNT_ERROR: ` нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  UNIQUE_ERROR: ' один и тот же хэштег не может быть использован дважды',
};

export {
  BASE_URL,
  Route,
  Method,
  ErrorIdTemplates,
  PHOTO_ITEMS_NUMBER,
  ALERT_SHOW_TIME,
  DEBOUNCE_DELAY,
  Filters,
  SORT_FUNCTIONS,
  ACTIVE_BUTTON_CLASS,
  PHOTO_NUMBERS_DEFAULT,
  PHOTO_NUMBERS_RANDOM,
  OPEN_COMMENTS_ON_CLICK,
  FILE_TYPES,
  SCALE_STEP,
  ScaleExtremums,
  SliderDefaultValues,
  FilterEffects,
  ScaleAction,
  MAX_COMMENT_LENGTH,
  MAX_HASH_LENGTH,
  MIN_HASH_LENGTH,
  MAX_NUMBER_HASHES,
  HashErrorsText
};
