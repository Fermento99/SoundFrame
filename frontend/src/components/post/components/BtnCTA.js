import React from 'react';
import styled from 'styled-components';


const getResize = (props) => {
  return props.size || 1;
};

const Btn = styled.a`
  font-size: calc(1em * ${getResize});
  text-decoration: none;
  padding: .2em .5em;
  border: solid 1px;
  border-radius: 12px;
  font-weight: 100;
`;

export default function BtnCTA({ url, size }) {
  return (
    <Btn size={size} href={url} target="_blank">
      PLAY
    </Btn>
  );
}
