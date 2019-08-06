import isBrowser from './isBrowser';

const localStorage = {};
if (isBrowser()) {
  localStorage.getItem = (key, defaultValue) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  };
  localStorage.setItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
}

export default localStorage;
