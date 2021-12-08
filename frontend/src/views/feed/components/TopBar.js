import React from 'react';
import styled from 'styled-components';
import { BtnLight } from '../../../components/Button';
import { Row } from '../../../components/Grid';
import EnumColors from '../../../components/post/EnumColors';
import EnumShapes from '../../../components/post/EnumShapes';
import Select from '../../../components/Select';

const Bar = styled(Row)`
  position: fixed;
  top: 4em;
  z-index: 10;
  left: 0;
  width: 100vw;
  height: 4em;
  background-color: #DDD;
`;

export default function TopBar({ filter, setter }) {
  return (
    <Bar>
      <Select value={filter.shape} onChange={e => {filter.shape = e.target.value; setter({...filter})}}>
        {EnumShapes.genOptions(false)}
      </Select>
      <Select value={filter.color} onChange={e => {filter.color = e.target.value; setter({...filter})}}>
        {EnumColors.genOptions(false)}
      </Select>
      <BtnLight onClick={() => {filter.feed = false; setter({...filter})}}>SEE ALL</BtnLight>
      <BtnLight onClick={() => {filter.feed = true; setter({...filter})}}>MY FEED</BtnLight>
    </Bar>
  );
}
