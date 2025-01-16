import {
  showRequestInfo,
  closePopup,
  openPopup
} from './utils.js';
import {
  isValid,
  resetValidation
} from './validate-form.js';
import {
  removeScaleChanges,
  removeFilterStyle,
  hideSlider,
  imgUploadForm } from './effects-photo.js';
import {
  sendData,
  ErrorIdTemplates
} from './api.js';
import {
  setControl,
  removeControl
} from './control-escape.js';
import {
  imgHashtags,
  imgComments
} from './validate-form.js';

const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadForm.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const clearForm = () => {
  imgUploadForm.reset();
};

const canCloseForm = () => !(document.activeElement === imgHashtags
  || document.activeElement === imgComments);

const openUploadForm = () => {
  openPopup(imgUploadOverlay);
  setControl(() => closePopup(imgUploadOverlay, false), onUploadCloseClick, canCloseForm);
};

function onUploadCloseClick() {
  console.log('123');
  closePopup(imgUploadOverlay, false);
  resetValidation();
  clearForm();
  removeScaleChanges();
  removeFilterStyle();
  hideSlider();
}

imgUploadClose.addEventListener('click', () =>{
  onUploadCloseClick();
  removeControl();
});

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    sendData('new FormData(evt.target)')
      .then(() => {
        onUploadCloseClick();
        removeControl();
        showRequestInfo(ErrorIdTemplates.SUCCESS);
      })
      .catch(() => showRequestInfo(ErrorIdTemplates.SEND_ERROR))
      .finally(() => blockSubmitButton(false));
  }
});

export { imgUploadForm, openUploadForm };
