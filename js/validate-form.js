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
console.log(hashesArray.length);
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

const checkIsInfo = () => {
  infoRequestElement = infoRequestElement.toUpperCase();
  return document.querySelector(
    `.${RequestResultTags[infoRequestElement].section}`
  );
};

const onBodyClick = (evt) => {
  const isInfo = checkIsInfo();
  if (!isInfo) {
    return;
  }
  if (
    evt.target.classList.contains(
      RequestResultTags[infoRequestElement].button
    ) ||
    !evt.target.classList.contains(RequestResultTags[infoRequestElement].inner)
  ) {
    isInfo.remove();
    body.removeEventListener('click', onBodyClick);
  }
};

const onBodyKeydown = (evt) => {
  const isInfo = checkIsInfo();
  if (!isInfo && !isEscapeKey(evt)) {
    return;
  }
  if (infoRequestElement.toLowerCase() === 'error') {
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
        .finally(() => blockSubmitButton(false));
    }
  });
};

export { pristine, setUserFormSubmit, imgHashtags };

/*const validateHashtags = (value) => {
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
};*/

/*const checkHashErrors = () => [
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
      /\/^#[a-zа-яё0-9]{2,20}$/
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
];*/
