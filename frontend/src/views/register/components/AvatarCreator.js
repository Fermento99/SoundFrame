import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../../../components/Avatar';
import { BtnLight } from '../../../components/Button';
import { Field } from '../../../components/Input';
import { Column, Row } from '../../../components/Grid';

const Input = styled(Field)`
  width: unset;

  :invalid {
    background-color: red;
  }
`;

const ColorPicker = styled(Field).attrs({ type: 'color' })`
  width: ${props => props.size || 20}px;
  height:  ${props => props.size || 20}px;
  padding-top: ${props => props.size || 20}px;
  padding-left: ${props => props.size || 20}px;
  margin: .1em;
  overflow: hidden;
  background-color: ${props => props.value};
`;

const Label = styled.p`
  margin: 0 1.2em 0 0;
`

const BtnAmount = styled(BtnLight)`
  width: 25px;
  height: 25px;
  padding: 0;
  margin: .3em .3em;
`

const inputChange = (e, setter) => {
  setter(e.target.value);
};

const amountChange = (target, setter, colors, colorSetter) => {
  setter(target);
  if (colors.length >= target) { colorSetter([...colors.slice(0, target)]); }
  else { colorSetter([...colors, '#000000']); }
};

const setColor = (e, colors, setter, index) => {
  colors[index] = e.target.value;
  setter([...colors]);
};

const generateGradientInputs = (amount, colors, setter) => {
  const out = [];
  for (let i = 0; i < amount; i++) {
    out.push(<ColorPicker key={i} onChange={async (e) => setColor(e, colors, setter, i)} value={colors[i]} />);
  }
  return out;
};

export default function AvatarCreator({ avatarRef }) {
  const [colorAmount, setAmount] = useState(1);
  const [colors, setColors] = useState(["#000000"]);
  const [front, setFront] = useState('A');
  const [color, setColor] = useState('#FFFFFF');

  avatarRef.color = color;
  avatarRef.front = front;
  avatarRef.colors = colors;

  const colorInputs = generateGradientInputs(colorAmount, colors, setColors);

  return (
    <Row align="start" justify="space-evenly">
      <Avatar
        size="100"
        color={color}
        colors={colors}
        front={front} />
      <Column align="start">
        <Row>
          <Label>Front color</Label>
          <ColorPicker onChange={e => inputChange(e, setColor)} value={color} />
        </Row>
        <Row>
          <Label>Front character</Label>
          <Input type="text" onChange={e => inputChange(e, setFront)} value={front} minLength="1" maxLength="1" size="1" pattern="[a-zA-Z0-9]" />
        </Row>
        <Row>
          <Label>Gradient colors</Label>
          <BtnAmount onClick={() => amountChange(colorAmount + 1, setAmount, colors, setColors)} disabled={colorAmount >= 3}>+</BtnAmount>
          <BtnAmount onClick={() => amountChange(colorAmount - 1, setAmount, colors, setColors)} disabled={colorAmount <= 1}>-</BtnAmount>
        </Row>
        <Row>
          {colorInputs}
        </Row>
      </Column>
    </Row>
  );
}
