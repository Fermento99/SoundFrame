import React, { useState } from 'react';
import { Column, Row } from '../../components/Grid';
import Post from '../../components/post/Post';
import EnumColors from '../../components/post/EnumColors';
import EnumShapes from '../../components/post/EnumShapes';
import { getItem } from '../../utils/storageManager';
import { searchSpotify } from '../../utils/spotifyFetcher';
import Select from '../../components/Select';
import { Field } from '../../components/Input';
import Label from '../../components/Label';
import { BtnDark } from '../../components/Button';
import { createUrl, postData } from '../../utils/fetcher';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import NavBar from '../../components/NavBar';


const PostPH = styled(Column)`
  width: 30em;
  height: 30em;
  border: solid 3px #000;
  border-radius: 8px;
`;

const publish = async (post, commentedId, history) => {
  const token = getItem('accessToken_SF');
  if (commentedId) {
    const url = createUrl('post', `${commentedId}/comment`);
    await postData(url, { comment: post }, token);
    history.push('/post/' + commentedId);
  } else {
    const url = createUrl('post', 'new');
    await postData(url, { post }, token);
    history.push('/feed');
  }
};

const genSuggetions = suggestions => {
  const options = [];
  suggestions.forEach(track => {
    options.push((<option key={track.id} value={track.id}>{track.name}; {track.artist}</option>));
  });
  return options;
};

const search = async (text, setter) => {
  const data = await searchSpotify(text);
  if (data.tracks) {
    const tracks = data.tracks.items.map(track => ({
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      id: track.id
    }));
    setter(tracks);
  } else {
    setter([]);
  }
};

export default function CreatorPage() {
  const [shape, setShape] = useState('defaultValue');
  const [color, setColor] = useState('defaultValue');
  const [id, setId] = useState('');
  const [preferences, setPref] = useState({ showArtist: true, showTitle: true, showCover: true });
  const [suggestions, setSug] = useState([]);
  const { commentedId } = useParams();
  const history = useHistory();

  const post = {
    bgcolor: color,
    shape: shape,
    spotifyId: id,
    preferences: preferences,
    owner: getItem('user_SF'),
  };

  return (
    <div>
      <Column>
        <NavBar />
        <Row>
          <Label>Shape: </Label>
          <Select onChange={e => setShape(e.target.value)} width="12" value={shape}>
            {EnumShapes.genOptions()}
          </Select>
          <Label>Color: </Label>
          <Select onChange={e => setColor(e.target.value)} width="12" value={color}>
            {EnumColors.genOptions()}
          </Select>
        </Row>
        <Row>
          <Label>Track: </Label>
          <Field type="text" onChange={e => search(e.target.value, setSug)}></Field>
        </Row>
        <Select onChange={e => setId(e.target.value)} width="30" size={id === '' ? suggestions.length : 0}>
          {genSuggetions(suggestions)}
        </Select>
        <Row>
          <Label>Show Title</Label>
          <input type="checkbox" checked={preferences.showTitle} onChange={e => { preferences.showTitle = e.target.checked; setPref({ ...preferences }) }} />
        </Row>
        <Row>
          <Label>Show Cover</Label>
          <input type="checkbox" checked={preferences.showCover} onChange={e => { preferences.showCover = e.target.checked; setPref({ ...preferences }); }} />
        </Row>
        <Row>
          <Label>Show Artist</Label>
          <input type="checkbox" checked={preferences.showArtist} onChange={e => { preferences.showArtist = e.target.checked; setPref({ ...preferences }); }} />
        </Row>
        <PostPH>
          {color !== 'defaultValue' && shape !== 'defaultValue' && <Post post={post} previewId={id} />}
        </PostPH>
        <BtnDark onClick={() => publish(post, commentedId, history)}>PUBLISH</BtnDark>
      </Column>
    </div >
  );
}
