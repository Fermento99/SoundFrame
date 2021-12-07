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


const PostPH = styled(Column)`
  width: 30em;
  height: 30em;
  border: solid 3px #000;
  border-radius: 8px;
`;

const publish = async (post) => {
  const url = createUrl('post', 'new');
  await postData(url, { post }, getItem('accessToken_SF'));
};

const genOptions = optionClass => {
  const options = [(<option key="default" disabled value="defaultValue">-- select --</option>)];
  for (let key in optionClass) {
    options.push((<option key={key} value={optionClass[key].class}>{optionClass[key].name}</option>));
  }
  return options;
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

  console.log(id);
  const post = {
    bgcolor: color,
    shape: shape,
    spotifyId: id,
    preferences: preferences,
    owner: getItem('user_SF'),
  };

  console.log(preferences);

  return (
    <div>
      <Column>
        <Row>
          <Label>Shape: </Label>
          <Select onChange={e => setShape(e.target.value)} width="12" value={shape}>
            {genOptions(EnumShapes)}
          </Select>
          <Label>Color: </Label>
          <Select onChange={e => setColor(e.target.value)} width="12" value={color}>
            {genOptions(EnumColors)}
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
          <input type="checkbox" checked={preferences.showTitle} onChange={e => { preferences.showTitle = e.target.checked; setPref({ ...preferences }); console.log(e.target); }} />
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
        <BtnDark onClick={() => publish(post)}>PUBLISH</BtnDark>
      </Column>
    </div >
  );
}
