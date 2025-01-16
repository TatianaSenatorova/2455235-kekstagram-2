import { imgUploadForm } from './effects-photo.js';

import {
  MAX_COMMENT_LENGTH,
  MAX_HASH_LENGTH,
  MIN_HASH_LENGTH,
  MAX_NUMBER_HASHES,
  HashErrorsText
} from './constants.js';

const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgComments = imgUploadForm.querySelector('.text__description');

let hashesArray = [];

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
const validateHashesAmount = () => hashesArray.length <= MAX_NUMBER_HASHES;

const getHashesUniqueMessage = () => HashErrorsText.UNIQUE_ERROR;
const validateUniqueHashes = () => [...new Set(hashesArray)].length === hashesArray.length;

pristine.addValidator(
  imgHashtags,
  validateHashes,
  getHashesErrorMessage
);
pristine.addValidator(
  imgHashtags,
  validateHashesAmount,
  getHashesAmountMessage
);
pristine.addValidator(imgHashtags,
  validateUniqueHashes,
  getHashesUniqueMessage
);
pristine.addValidator(
  imgComments,
  validateComment,
  getCommentErrorMessage
);

const isValid = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { isValid, imgHashtags, imgComments, resetValidation };
