import { renderThumbnails } from './render-photos.js';
import {
  getBigPicture,
  renderFullPhoto
} from './open-full-photo.js';
import './open-form.js';
import './effects-photo.js';
import { getData,
  ErrorIdTemplates
} from './api.js';
import { showRequestInfoTimeout } from './utils.js';
import {
  showFilters,
  setFilters
} from './filters.js';
import './upload-photo.js';
import { PHOTO_ITEMS_NUMBER } from './constants.js';

getData()
  .then((photos) => {
    const newPhotos = photos.slice(0, PHOTO_ITEMS_NUMBER);
    renderThumbnails(newPhotos);
    showFilters();
    setFilters(photos);
    getBigPicture((chosenPhotoID) => renderFullPhoto(chosenPhotoID, newPhotos));
  })
  .catch(() => {
    showRequestInfoTimeout(ErrorIdTemplates.LOAD_ERROR);
  });
