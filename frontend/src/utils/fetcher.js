import { getItem, setItem } from "./storageManager";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;


const createUrl = (mod, endpoint, query = undefined) => {
  const params = [];
  for (let key in query) {
    params.push(`${key}=${query[key]}`);
  }
  const queryString = params.length !== 0
    ? '?' + params.join('&')
    : '';
  return `${SERVER_ADDRESS}/${mod}/${endpoint}${queryString}`;
};

const refresh = async () => {
  const url = createUrl('auth', 'refresh');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getItem('refreshToken_SF') })
  });

  if (res.status === 200) {
    const data = await res.json();
    setItem('accessToken_SF', data.accessToken);
    setItem('refreshToken_SF', data.refreshToken);
  } else {
    throw Error('you have been logged out');
  }
};

const getData = async (url, token = '') => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (res.status === 403) {
    await refresh();
    return await postData(url, getItem('accessToken_SF'));
  }

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

  if (res.status === 403) {
    await refresh();
    return await postData(url, data, getItem('accessToken_SF'));
  }
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

  if (res.status === 403) {
    await refresh();
    return await postData(url, data, getItem('accessToken_SF'));
  }

  return await res.json();
};

export {
  createUrl,
  getData,
  postData,
  deleteData
};