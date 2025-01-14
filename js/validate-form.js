import { imgUploadForm } from './effects-photo.js';
import { sendData, ErrorIdTemplates } from './api.js';
import { showRequestInfo } from './utils.js';
import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASH_LENGTH = 20;
const MIN_HASH_LENGTH = 2;
const MAX_NUMBER_HASHES = 5;

const RequestResultTags = {
  ERROR: {
    section: 'error',
    button: 'error__button',
    inner: 'error__inner',
  },
  SUCCESS: {
    section: 'success',
    button: 'success__button',
    inner: 'success__inner',
  },
};

const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

let hashesArray = [];
let infoRequestElement;

const HashErrorsText = {
  HASH_ERROR: `хэштеги: разделяются пробелами, начинаются с # (решётки), не могут состоять только из решётки, после решётки состоят из букв и чисел, максимальная длина одного хэштега ${MAX_HASH_LENGTH} символов, включая решётку`,
  AMOUNT_ERROR: ` нельзя указать больше ${MAX_NUMBER_HASHES} хэштегов`,
  UNIQUE_ERROR: ' один и тот же хэштег не может быть использован дважды',
};

const pristine = new Pristine(
  imgUploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  },
  false
);

const validateComment = (value) =>
  value.length >= 0 && value.length < MAX_COMMENT_LENGTH;

const getCommentErrorMessage = () =>
  `максимальная длина комментария ${MAX_COMMENT_LENGTH}`;

const getHashesArray = (value) =>
  value.trim().toLowerCase().split(' ').filter(Boolean);

const getHashesErrorMessage = () => HashErrorsText.HASH_ERROR;
const validateHashes = (value) => {
  if(!value) {
    return true;
  }
  hashesArray = getHashesArray(value);
  const regex = new RegExp(`^#[a-zа-яё0-9]{${MIN_HASH_LENGTH - 1},${MAX_HASH_LENGTH}}$`
  );
  return hashesArray.every((hash) => regex.test(hash));
};

const getHashesAmountMessage = () => HashErrorsText.AMOUNT_ERROR;
const validateHashesAmount = () => hashesArray.length <= 5;

const getHashesUniqueMessage = () => HashErrorsText.UNIQUE_ERROR;
const validateUniqueHashes = () => [...new Set(hashesArray)].length === hashesArray.length;

pristine.addValidator(imgHashtags, validateHashes, getHashesErrorMessage);
pristine.addValidator(imgHashtags, validateHashesAmount, getHashesAmountMessage);
pristine.addValidator(imgHashtags, validateUniqueHashes, getHashesUniqueMessage);
pristine.addValidator(imgComments, validateComment, getCommentErrorMessage);

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

const closeInfoWindow = (evt) => {
  const infoRequestResult = infoRequestElement.toUpperCase();
  const infoSection = document.querySelector(`.${RequestResultTags[infoRequestResult].section}`);
  if (!infoSection && !isEscapeKey(evt)) {
    return;
  }
  if (infoRequestElement.toLowerCase() === 'error') {
    evt.stopPropagation();
  }
  if (evt.target.classList.contains(RequestResultTags[infoRequestResult].button) || !evt.target.classList.contains(RequestResultTags[infoRequestResult].inner)
  ) {
    infoSection.remove();
  }
};

const onBodyClick = (evt) => {
  closeInfoWindow(evt);
  body.removeEventListener('click', onBodyClick);
};

const onBodyKeydown = (evt) => {
  closeInfoWindow(evt);
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
      sendData('new FormData(evt.target)')
        .then(() => appendInfo(ErrorIdTemplates.SUCCESS))
        .then(() => cb())
        .catch(() => appendInfo(ErrorIdTemplates.SEND_ERROR))
        .finally(() => blockSubmitButton(false));
    }
  });
};

export { pristine, setUserFormSubmit, imgHashtags };
