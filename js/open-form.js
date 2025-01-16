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


const openUploadForm = () => {
  openPopup(imgUploadOverlay);
  setControl(() => closePopup(imgUploadOverlay, false));
  imgUploadClose.addEventListener('click', onUploadCloseClick);
};

function onUploadCloseClick() {
  console.log(document.activeElement);
  console.log(document.querySelector(':focus'));
  if(imgUploadForm.activeElement === imgHashtags || imgUploadForm.activeElement === imgComments) {
    return;
  }
  imgUploadClose.removeEventListener('click', onUploadCloseClick);
  closePopup(imgUploadOverlay, false);
  removeControl();
  resetValidation();
  clearForm();
  removeScaleChanges();
  removeFilterStyle();
  hideSlider();
}

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
        showRequestInfo(ErrorIdTemplates.SUCCESS);
      })
      .catch(() => showRequestInfo(ErrorIdTemplates.SEND_ERROR))
      .finally(() => blockSubmitButton(false));
  }
});

export { imgUploadForm, openUploadForm };
