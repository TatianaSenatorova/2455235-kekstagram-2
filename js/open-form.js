import { body } from './open-full-photo.js';
import { isEscapeKey } from './utils.js';
import './validate-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadForm.querySelector('.img-upload__cancel');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgDescription = imgUploadForm.querySelector('.text__description');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== imgHashtags && document.activeElement !== imgDescription) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const clearForm = () => {
  imgUploadInput.value = '';
  imgHashtags.value = '';
  imgDescription.value = '';
};

function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadClose.addEventListener('click', closeUploadForm);
}

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadClose.removeEventListener('click', closeUploadForm);
  clearForm();
}

imgUploadInput.addEventListener('change', openUploadForm);

export { imgUploadForm, imgHashtags };
