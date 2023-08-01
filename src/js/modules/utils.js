const isEscapeKey = (evt) => evt.key === 'Escape';

const handleEscapeKey = (callback, evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    callback();
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { handleEscapeKey, debounce };
