import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const getLinearGradient = (props) => {
  const len = props.colors.length;
  if (len === 1) return props.colors[0];
  const getPercent = (index) => Math.floor(((index + .5) / len) * 100);
  const colors = props.colors.map((color, index) => `${color} ${getPercent(index)}%`).join(', ');
  return `linear-gradient(135deg, ${colors})`;
};

const getFontSize = (props) => {
  return props.size * .5;
};

const AvatarWrapper = styled.div`
  display: flex;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 100%;
  color: ${props => props.color};
  background: ${getLinearGradient};
  
  > p {
    font-size: ${getFontSize}px;
    line-height: ${getFontSize}px;;
    color: ${props => props.color};
    text-align: center;
    margin: auto;
  }
`;

export default function Avatar({ size, colors, front, color, userId }) {
  const history = useHistory();
  const click = userId
    ? () => { history.push('/user/' + userId); }
    : () => { };

  return (
    <AvatarWrapper size={size} colors={colors} color={color} onClick={e => { e.stopPropagation(); click(); }}>
      <p>{front}</p>
    </AvatarWrapper >
  );
}
