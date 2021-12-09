import React from 'react';
import styled from 'styled-components';

const ErrText = styled.span`
  color: red;
  font-weight: bold;
  height: 1em;
`;

export default function Error({ text }) {
  return (
    <ErrText>
      {text}
    </ErrText>
  );
}
