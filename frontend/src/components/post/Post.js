import React, { useState } from 'react';
import styled from 'styled-components';
import './shapes.css';
import './colors.css';
import { getMeta } from '../../utils/spotifyFetcher';
import { Column } from '../Grid';
import Avatar from '../Avatar';
import BtnCTA from './components/BtnCTA';

const PostWrapper = styled(Column)`
  margin: 2em;
  width: ${props => props.size || 24}em;
  height: ${props => props.size || 24}em;
  justify-content: space-evenly;
  text-align: center;
`;

const Nick = styled.h4`
  margin: .1em 0;
`;

const Title = styled.p`
  margin: .2em 0;
  font-size: 1.1em;
  font-weight: bold;
`;

const Artist = styled.p`
  margin: .2em 0;
  font-size: .9em;
`;

const Cover = styled.img`
  width: 7em;
  height: 7em;
  margin: .1em 0;
`

export default function Post({ post, previewId }) {
  const className = `${post.shape} ${post.bgcolor}`;
  const [data, setData] = useState(null);

  if (previewId && previewId !== data.id) { getMeta(post.spotifyId).then(data => setData(data)); }

  if (data === null) {
    console.log('post id', post.spotifyId);
    getMeta(post.spotifyId).then(data => setData(data));
    return (
      <PostWrapper className={className}>
      </PostWrapper>
    );
  } else {
    console.log(data);
    return (
      <PostWrapper className={className}>
        <Column >
          <Avatar size="40" {...post.owner.avatar} />
          <Nick>{post.owner.username}</Nick>
        </Column>
        <Column>
          {post.preferences.showCover && <Cover src={data.img[1]} alt="album cover" />}
          {post.preferences.showTitle && <Title>{data.name}</Title>}
          {post.preferences.showArtist && <Artist>{data.artist}</Artist>}
        </Column>
        <BtnCTA url={data.cta} />
      </PostWrapper>
    );
  }
}
