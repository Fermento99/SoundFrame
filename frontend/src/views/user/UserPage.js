import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Avatar from '../../components/Avatar';
import { BtnDark, BtnLight } from '../../components/Button';
import { Column, Row } from '../../components/Grid';
import NavBar from '../../components/NavBar';
import Post from '../../components/post/Post';
import { createUrl, getData, postData } from '../../utils/fetcher';
import { getItem, setItem } from '../../utils/storageManager';


const unobserve = async (id, setter) => {
  const url = createUrl('user', 'unobserve/' + id);
  postData(url, {}, getItem('accessToken_SF')).then(() => {
    const loggedUser = getItem('user_SF');
    loggedUser.observed = loggedUser.observed.filter(user => user !== id);
    setItem('user_SF', loggedUser);
    setter(false);
  });
};

const observe = async (id, setter) => {
  const url = createUrl('user', 'observe/' + id);
  postData(url, {}, getItem('accessToken_SF')).then(() => {
    const loggedUser = getItem('user_SF');
    loggedUser.observed.push(id);
    setItem('user_SF', loggedUser);
    setter(true);
  });
};

const observeButton = (observed, id, setter) => {
  if (observed) {
    return (<BtnLight onClick={() => unobserve(id, setter)}>UNOBSERVE</BtnLight>);
  }
  return (<BtnDark onClick={() => observe(id, setter)}>OBSERVE</BtnDark>);
};

export default function UserPage() {
  const { id, name } = useParams();
  let url;
  if (name) { url = createUrl('user', 'getByName/' + name); }
  else { url = createUrl('user', 'get/' + id); }
  const [data, setData] = useState(null);
  const [observed, setObserved] = useState(false);

  useEffect(() => {
    getData(url).then(data => setData(data)).catch(() => setData({error: true, posts: [], user: {username: 'No user found', avatar: {front: 'E', color: '#f00', colors: ['#000']}} }));
  }, [url])

  const loggedUser = getItem('user_SF');

  if (!data) {
    return (<Column>
      <NavBar />
    </Column>);
  }

  if (loggedUser.observed.includes(data.user._id) !== observed) { setObserved(!observed); }
  
  return (
    <Column>
      <NavBar />
      <Avatar size="70" {...data.user.avatar} />
      <h1>{data.user.username}</h1>
      {data.user._id === loggedUser._id || data.error || observeButton(observed, data.user._id, setObserved)}
      <Row wrap>
        {data.posts.map(post => <Post key={post._id} post={post.content} id={post._id} />)}
      </Row>
    </Column>
  );
}
