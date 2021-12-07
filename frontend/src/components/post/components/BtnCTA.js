import React from 'react'
import styled from 'styled-components';

const Btn = styled.a`
  text-decoration: none;
  padding: .2em .5em;
  border: solid 1px;
  border-radius: 12px;
  font-weight: 100;
`

export default function BtnCTA({url}) {
  return (
    <Btn href={url} target="_blank">
      PLAY
    </Btn>
  )
}
