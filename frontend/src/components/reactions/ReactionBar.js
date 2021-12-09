import React, { useState } from 'react';
import styled from 'styled-components';
import { Row } from '../Grid';
import { getItem } from '../../utils/storageManager';
import EnumReactionTypes from './EnumReactionTypes';
import './reactions.css';
import { createUrl, postData } from '../../utils/fetcher';

const ReactionBox = styled.div`
  margin: .5em;
  padding: .3em;
  border: ${props => props.active ? 'dashed black 2px' : 'none' };
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > * {
    margin-right: .2em;
  }
`;

const setReaction = (type, postId, setter, reactions, userId) => {
  const url = createUrl('post', postId + '/react');
  const token = getItem('accessToken_SF');
  postData(url, { reaction: type }, token).then(() => setter([...reactions, {type: type, owner: {_id: userId} }]));
};

const genReactions = (postId, setter, reactions) => {
  const logged = getItem('user_SF')._id
  const reactBtns = EnumReactionTypes.genElements();
  const counts = reactBtns.map(_ => 0);
  const active = reactions.find(reaction => reaction.owner._id === logged)
  reactions.forEach(reaction => counts[reaction.type]++);
  const noActive = active ? reactions.filter(reaction => reaction !== active) : reactions
  return reactBtns.map((btn, index) => <ReactionBox key={index} active={active && active.type === index} onClick={() => setReaction(index, postId, setter, noActive, logged)}>{btn}{counts[index]}</ReactionBox>);
};

export default function ReactionBar({ reactions, postId }) {
  const [reactionList, setReactions] = useState(reactions);

  return (
    <Row wrap>
      {genReactions(postId, setReactions, reactionList)}
    </Row>
  );
}
