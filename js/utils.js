import {
  ALERT_SHOW_TIME,
  DEBOUNCE_DELAY
} from './constants.js';
import {
  setControl,
  removeControl
} from './control-escape.js';
import { body } from './open-full-photo.js';

const findTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not template: #${id}`);
  }
  return template.content.firstElementChild;
};

const closePopup = (popupElement, isRemove) => {
  if(isRemove) {
    popupElement.remove();
    return;
  }
  popupElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const openPopup = (popupElement) => {
  popupElement.classList.remove('hidden');
  body.classList.add('modal-open');
};

const showRequestInfo = (templateId) => {
  const template = findTemplate(templateId);
  const infoElement = template.cloneNode(true);
  const isRemove = true;
  const isClearForm = false;
  document.body.append(infoElement);
  setControl(() => closePopup(infoElement, isRemove), isClearForm);
  infoElement.addEventListener('click', ({target}) =>{
    if(target.classList.contains(`${templateId}`) || target.classList.contains(`${templateId}__button`)) {
      closePopup(infoElement);
      removeControl();
    }
  });
};

const showRequestInfoTimeout = (templateId, message) => {
  const template = findTemplate(templateId);
  const errorElement = template.cloneNode(true);
  if(message) {
    errorElement.querySelector('.data-error__title').textContent = message;
  }
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  findTemplate,
  showRequestInfo,
  showRequestInfoTimeout,
  debounce,
  openPopup,
  closePopup
};
