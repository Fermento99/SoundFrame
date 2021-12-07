import React, { useState } from 'react';
import styled from 'styled-components';
import './shapes.css';
import './colors.css';
import { getMeta } from '../../utils/spotifyFetcher';
import { Column } from '../Grid';
import Avatar from '../Avatar';
import BtnCTA from './components/BtnCTA';
import { useHistory } from 'react-router-dom';

const getResize = (props) => {
  return props.size || 1;
};

const PostWrapper = styled(Column)`
  margin: calc(2em * ${getResize});
  width: calc(24em * ${getResize});
  height: calc(24em * ${getResize});
  justify-content: space-evenly;
  text-align: center;
`;

const Nick = styled.h4`
  font-size: calc(1em * ${getResize});
  margin: .1em 0;
`;

const Title = styled.p`
  font-size: calc(1.1em * ${getResize});
  margin: .2em 0;
  font-weight: bold;
`;

const Artist = styled.p`
  font-size: calc(.9em * ${getResize});
  margin: .2em 0;
`;

const Cover = styled.img`
  width: calc(7em * ${getResize});
  height: calc(7em * ${getResize});
  margin: .1em 0;
`;

const showPost = (id, history) => {
  id ? history.push('/post/' + id) : console.log('no post id');
};

export default function Post({ size, post, previewId, id }) {
  const className = `${post.shape} ${post.bgcolor}`;
  const [data, setData] = useState(null);
  const history = useHistory();

  if (previewId && previewId !== data.id) { getMeta(post.spotifyId).then(data => setData(data)); }

  if (data === null) {
    console.log('post id', post.spotifyId);
    getMeta(post.spotifyId).then(data => setData(data));
    return (
      <PostWrapper size={size} className={className}>
      </PostWrapper>
    );
  } else {
    console.log(post);

    if (!post.preferences) { post.preferences = { showCover: true, showTitle: true, showArtist: true }; }
    return (
      <PostWrapper size={size} className={className} onClick={() => showPost(id, history)}>
        <Column >
          <Avatar size={40 * size} {...post.owner.avatar} />
          <Nick size={size}>{post.owner.username}</Nick>
        </Column>
        <Column>
          {post.preferences.showCover && <Cover size={size} src={data.img[1]} alt="album cover" />}
          {post.preferences.showTitle && <Title size={size}>{data.name}</Title>}
          {post.preferences.showArtist && <Artist size={size}>{data.artist}</Artist>}
        </Column>
        <BtnCTA size={size} url={data.cta} />
      </PostWrapper>
    );
  }
}
