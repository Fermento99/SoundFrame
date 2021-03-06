
const setItem = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const clearKey = (key) => {
  sessionStorage.removeItem(key);
};


export { getItem, setItem, clearKey };