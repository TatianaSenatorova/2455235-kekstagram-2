import { imgUploadForm, openUploadForm } from './open-form.js';
import { showRequestInfoTimeout } from './utils.js';
import { ErrorIdTemplates } from './api.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png'];

const fileChooser = imgUploadForm.querySelector('.img-upload__input');
const imgPhotoPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    imgPhotoPreview.src = url;
    effectsPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url(${url})`;
      openUploadForm();
    });
  } else{
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR, 'Неверный тип файла');
  }
});


export {imgPhotoPreview};
