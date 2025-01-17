import { picturesContainer } from './render-photos.js';
import { OPEN_COMMENTS_ON_CLICK } from './constants.js';
import {
  setControl,
  removeControl
} from './control-escape.js';
import {
  openPopup,
  closePopup
} from './utils.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountFullPhoto = bigPicture.querySelector(
  '.social__comment-count'
);
const shownComments = commentsCountFullPhoto.querySelector(
  '.social__comment-shown-count'
);
const totalComments = commentsCountFullPhoto.querySelector(
  '.social__comment-total-count'
);
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const buttonMoreComments = bigPicture.querySelector('.comments-loader');

let lastIndexToSlice = 0;
let commentsData = [];

const clearComments = () => {
  commentsList.innerHTML = '';
  buttonMoreComments.classList.remove('hidden');
  commentsData = [];
  lastIndexToSlice = 0;
};

const disableShowСomments = () => {
  buttonMoreComments.classList.add('hidden');
};

const renderComments = (nextComments) => {
  shownComments.textContent = lastIndexToSlice;
  nextComments.forEach((comment) => {
    commentsList.insertAdjacentHTML(
      'beforeend',
      `<li class='social__comment'>
        <img
          class='social__picture'
          src='${comment.avatar}'
          alt='${comment.name}'
          width='35' height='35'>
        <p class='social__text'>${comment.message}</p>
      </li>`
    );
  });
};

const getCommentsToRender = (comments) => {
  if(!comments.length) {
    disableShowСomments();
    return;
  }
  let commentsToRender = 0;
  const startIndexToSlice = lastIndexToSlice;
  if (comments.length - lastIndexToSlice < OPEN_COMMENTS_ON_CLICK) {
    commentsToRender = comments.length - lastIndexToSlice;
    disableShowСomments();
  } else {
    commentsToRender = OPEN_COMMENTS_ON_CLICK;
  }
  lastIndexToSlice += commentsToRender;
  return comments.slice(startIndexToSlice, lastIndexToSlice);
};

const openBigPhoto = () => {
  openPopup(bigPicture);
  const isRemove = false;
  setControl(() => closePopup(bigPicture, isRemove), clearComments);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  buttonMoreComments.addEventListener('click', () => {
    renderComments(getCommentsToRender(commentsData));
  });
};

function onBigPictureCloseClick() {
  clearComments();
  const isRemove = false;
  closePopup(bigPicture, isRemove);
  removeControl();
}

const getBigPicture = (cb) => {
  picturesContainer.addEventListener('click', (evt) => {
    const chosenPhoto = evt.target.closest('.picture');
    if (chosenPhoto) {
      evt.preventDefault();
      const chosenPhotoID = chosenPhoto.getAttribute('data-id');
      openBigPhoto();
      cb(chosenPhotoID);
    }
  });
};

const renderFullPhoto = (chosenPhotoID, listPhotos) => {
  const dataForBigPhoto = listPhotos.find(
    (item) => item.id === parseInt(chosenPhotoID, 10)
  );
  bigPictureImg.src = dataForBigPhoto.url;
  likesCount.textContent = dataForBigPhoto.likes;
  totalComments.textContent = dataForBigPhoto.comments.length;
  bigPictureDescription.textContent = dataForBigPhoto.description;
  commentsData = dataForBigPhoto.comments;
  renderComments(getCommentsToRender(commentsData));
};

export { body, getBigPicture, renderFullPhoto };
