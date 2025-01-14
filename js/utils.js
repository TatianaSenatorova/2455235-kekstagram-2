const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const showRequestInfo = (templateId) => {
  const template = findTemplate(templateId);
  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);
  return errorElement;
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
  isEscapeKey,
  showRequestInfo,
  showRequestInfoTimeout,
  debounce
};
