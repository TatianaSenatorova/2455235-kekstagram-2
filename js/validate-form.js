import { imgUploadForm } from './effects-photo.js';
import { sendData, ErrorIdTemplates } from './api.js';
import { showRequestInfo } from './utils.js';
import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MAX_NUMBER_HASHES = 5;

const RequestResultTags = {
  ERROR: {
    section: 'error',
    button: 'error__button',
    inner: 'error__inner'
  },
  SUCCESS: {
    section: 'success',
    button: 'success__button',
    inner: 'success__inner'
  }
};

const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let hashesArray = [];
let hashErrorMessages = [];
let infoRequestElement;

const checkHashErrors = () => [
  {
    check: hashesArray.some((hash) => hash.slice(1).includes('#')),
    error: ' хэштеги разделяются пробелами',
  },
  {
    check: hashesArray.some((hash) => hash[0] !== '#'),
    error: ' хэштег начинается с символа # (решётка)',
  },
  {
    check: hashesArray.some((hash) => hash === '#'),
    error: ' хеш-тег не может состоять только из одной решётки',
  },
  {
    check: hashesArray.some(
      (hash) => !/^[a-zа-яё0-9]{1,19}$/i.test(hash.slice(1))
    ),
    error: ' строка после решётки должна состоять из букв и чисел',
  },
  {
    check: hashesArray.some((hash) => hash.length > MAX_HASH_LENGTH),
    error: ` максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  },
  {
    check: hashesArray.length > MAX_NUMBER_HASHES,
    error: ` нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  },
  {
    check: [...new Set(hashesArray)].length !== hashesArray.length,
    error: ' один и тот же хэштег не может быть использован дважды',
  },
];

const pristine = new Pristine(
  imgUploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  },
  false
);

const validateHashtags = (value) => {
  hashErrorMessages = [];
  if (!value) {
    return true;
  }
  hashesArray = value.trim().toLowerCase().split(' ').filter(Boolean);
  checkHashErrors().map((errorHash) => {
    if (errorHash.check) {
      hashErrorMessages.push(errorHash.error);
    }
    return hashErrorMessages;
  });
  return hashErrorMessages.length === 0;
};

const validateComment = (value) => value.length >= 0 && value.length < MAX_COMMENT_LENGTH;

const commentErrorMassege = () =>
  `максимальная длина комментария ${MAX_COMMENT_LENGTH}`;

const hashesErrorText = () => hashErrorMessages;

pristine.addValidator(imgHashtags, validateHashtags, hashesErrorText);
pristine.addValidator(imgComments, validateComment, commentErrorMassege);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const checkIsInfo = () => {
  infoRequestElement = infoRequestElement.toUpperCase();
  return document.querySelector(`.${RequestResultTags[infoRequestElement].section}`);
};

const onBodyClick = (evt) => {
  const isInfo = checkIsInfo();
  if(!isInfo) {
    return;
  }
  if (evt.target.classList.contains(RequestResultTags[infoRequestElement].button) || !evt.target.classList.contains(RequestResultTags[infoRequestElement].inner)) {
    isInfo.remove();
    body.removeEventListener('click', onBodyClick);
  }
};

const onBodyKeydown = (evt) => {
  const isInfo = checkIsInfo();
  if(!isInfo && !isEscapeKey(evt)) {
    return;
  }
  if(infoRequestElement.toLowerCase() === 'error') {
    evt.stopPropagation();
  }
  isInfo.remove();
  body.removeEventListener('keydown', onBodyKeydown);
};

const appendInfo = (infoId) => {
  infoRequestElement = infoId;
  showRequestInfo(infoId);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onBodyKeydown);
};

const setUserFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => appendInfo(ErrorIdTemplates.SUCCESS))
        .then(() => cb())
        .catch(() => appendInfo(ErrorIdTemplates.SEND_ERROR))
        .finally(unblockSubmitButton);
    }
  });
};

export { pristine, setUserFormSubmit, imgHashtags };
