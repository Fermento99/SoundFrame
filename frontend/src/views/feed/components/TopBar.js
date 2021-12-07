import React from 'react'
import styled from 'styled-components';
import { Row } from '../../../components/Grid';

const Bar = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4em;
  background-color: #DDD;
`

export default function TopBar() {
  return (
    <Bar>
      
    </Bar>
  )
}
