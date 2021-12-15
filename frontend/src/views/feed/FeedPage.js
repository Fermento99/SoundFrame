import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Post from '../../components/post/Post';
import { createUrl, getData } from '../../utils/fetcher';
import { getItem } from '../../utils/storageManager';
import TopBar from './components/TopBar';

const Main = styled.div`
  padding-top: 4em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default function FeedPage() {
  const [filter, setFilter] = useState({ shape: 'defaultValue', color: 'defaultValue', feed: true });
  const [loaded, setLoaded] = useState(false);
  const urlFilter = {};
  if (filter.shape !== 'defaultValue') { urlFilter.shape = filter.shape; }
  if (filter.color !== 'defaultValue') { urlFilter.bgcolor = filter.color; }

  const url = filter.feed ? createUrl('user', 'getFeed', urlFilter) : createUrl('post', 'get', urlFilter);
  const [posts, setPosts] = useState(null);

  if (!loaded) {
    getData(url, getItem('accessToken_SF')).then(posts => {
      setPosts(posts);
      setLoaded(true);
    });
    return (<Main>
      <NavBar />
    </Main>);
  }
  return (
    <Main>
      <NavBar />
      <TopBar filter={filter} setter={(obj) => { setFilter(obj); setLoaded(false); }} />
      {posts.map(post => <Post post={post.content} id={post._id} key={post._id} />)}
    </Main>
  );
}
