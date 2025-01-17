import { renderThumbnails } from './render-photos.js';
import { debounce } from './utils.js';
import {
  Filters,
  SORT_FUNCTIONS,
  ACTIVE_BUTTON_CLASS,
  PHOTO_NUMBERS_DEFAULT,
  PHOTO_NUMBERS_RANDOM,
} from './constants.js';

const filters = document.querySelector('.img-filters');
const filtersButtons = filters.querySelectorAll('.img-filters__button');

let dataFilterId;
let photos = [];

const debounceRender = debounce(renderThumbnails);

const getPhotosToRender = (filter) => {
  let photosToRender = [];
  const copyPhotos = photos.slice();
  switch (filter) {
    case Filters.RANDOM:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getRandom).slice(0, PHOTO_NUMBERS_RANDOM);
      break;
    case Filters.DISCUSSED:
      photosToRender = copyPhotos.sort(SORT_FUNCTIONS.getDiscussed).slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
    case Filters.DEFAULT:
      photosToRender = copyPhotos.slice(0, PHOTO_NUMBERS_DEFAULT);
      break;
  }
  debounceRender(photosToRender);
};

const onFilterClick = ({ target }) => {
  if(target.classList.contains('img-filters__button') && !target.classList.contains(ACTIVE_BUTTON_CLASS)) {
    filtersButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
    const currentFilter = target;
    currentFilter.classList.add(ACTIVE_BUTTON_CLASS);
    dataFilterId = currentFilter.getAttribute('id');
    getPhotosToRender(dataFilterId);
  }
};

const setFilters = (photosData) => {
  filters.classList.remove('img-filters--inactive');
  filters.addEventListener('click', onFilterClick);
  photos = photosData;
};

export { setFilters };
