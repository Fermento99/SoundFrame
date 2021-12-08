import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Post from '../../components/post/Post';
import { createUrl, getData } from '../../utils/fetcher';

const Main = styled.div`
  padding-top: 4em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default function FeedPage() {
  const url = createUrl('post', 'get');
  const [posts, setPosts] = useState([]);
  if (posts.length === 0) { getData(url).then(posts => setPosts(posts)); }
  console.log(posts);
  return (
    <Main>
      <NavBar />
      {posts.map(post => <Post post={post.content} id={post._id} />)}
    </Main>
  );
}
