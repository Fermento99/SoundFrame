
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;


const createUrl = (mod, endpoint, query) => {
  const params = [];
  for (let key in query) {
    params.push(`${key}=${query[key]}`);
  }
  const queryString = params
    ? '?' + params.join('&')
    : '';
  return `${SERVER_ADDRESS}/${mod}/${endpoint}${queryString}`;
};

const getData = async (url, token = '') => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await res.json();
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
  if (res.status !== 204) { return await res.json(); }
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

  return await res.json();
};

export {
  createUrl,
  getData,
  postData,
  deleteData
};