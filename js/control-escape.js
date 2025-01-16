const isEscapeKey = (evt) => evt.key === 'Escape';

const stack = [];
let listener = null;
let localCounter = 0;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const index = stack.length - 1;
    stack[index].cb();
    stack.length = stack.length - 1;
    if (!stack.length) {
      document.removeEventListener('keydown', onDocumentKeydown);
      listener = null;
    }
  }
}
const setControl = (cb) => {
  localCounter++;
  stack.push({
    n: localCounter,
    cb
  });
  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentKeydown);
  }
  console.log(stack);
};

const removeControl = () => {
  stack.length = stack.length - 1;
  if (!stack.length) {
    document.removeEventListener('keydown', onDocumentKeydown);
    listener = null;
}
console.log(stack);
};

export { setControl, removeControl };
