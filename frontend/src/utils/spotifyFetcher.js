import base64 from 'base-64';
import { getItem, setItem, clearKey } from './storageManager';

const dataPicker = data => ({
  album: data.album.name,
  artist: data.artists.map(el => el.name).join(', '),
  name: data.name,
  img: data.album.images.map(el => el.url),
  cta: data.external_urls.spotify,
  id: data.id
});

const getToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const secret = process.env.REACT_APP_SPOTIFY_SECRET;
  const auth = base64.encode(clientId + ':' + secret);

  const data = await fetch('https://accounts.spotify.com/api/token?grant_type=client_credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
  });
  const token = await data.json();
  setItem('spotify_token_SF', token.access_token);
};

const getMeta = async (id) => {
  console.log(id);
  if (!id) {
    return {
      album: '',
      artist: '',
      name: '',
      img: '',
      cta: '',
      id: '',
    };
  }
  const url = `https://api.spotify.com/v1/tracks/${id}`;
  let token = getItem('spotify_token_SF');
  if (!token) { token = await getToken(); }
  let res;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  } catch (err) {
    if (err.status === 401) {
      clearKey('spotify_token_SF');
      return await searchSpotify(id);
    }
    console.log(err);
    return {
      album: '',
      artist: '',
      name: '',
      img: '',
      cta: '',
    };
  }

  const data = await res.json();
  console.log(data.external_urls.spotify);
  return dataPicker(data);
};

const searchSpotify = async (text) => {
  if (!text) { return {}; }
  const url = `https://api.spotify.com/v1/search?type=track&limit=10&q=${text}`;
  let token = getItem('spotify_token_SF');
  if (!token) { 
    await getToken(); 
    token = getItem('spotify_token_SF');
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (res.status === 401) {
    clearKey('spotify_token_SF');
    return await searchSpotify(text);
  }

  return await res.json();
};

export { getMeta, getToken, searchSpotify };