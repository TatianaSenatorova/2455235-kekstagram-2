const isEscapeKey = (evt) => evt.key === 'Escape';

const stack = [];
let listener = null;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const index = stack.length - 1;
    if(stack[index].condition && !stack[index].condition()) {
      return;
    }
    if(stack[index].clearForm) {
      stack[index].clearForm();
    }
    stack[index].cb();
    stack.length = stack.length - 1;
    if (!stack.length) {
      document.removeEventListener('keydown', onDocumentKeydown);
      listener = null;
    }
  }
  console.log(stack);
}
const setControl = (cb, clearForm, condition = null) => {
  stack.push({
    cb,
    condition,
    clearForm
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
