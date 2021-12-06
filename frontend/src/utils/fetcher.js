
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;


const createUrl = (mod, endpoint) => {
  return `${SERVER_ADDRESS}/${mod}/${endpoint}`;
};

const getData = async (url, token = '') => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return res.json();
};

const postData = async (url, data, token = '') => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

const deleteData = async (url, data, token = '') => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export {
  createUrl,
  getData,
  postData,
  deleteData
};