import React from 'react';
import { useHistory } from 'react-router';
import { BtnLight, BtnDark } from '../../components/Button';
import { Column } from '../../components/Grid';

export default function HomePage() {
  const history = useHistory();
  return (
    <Column>
      <h3>Welcome to </h3>
      <br />
      <h1>Sound Frame</h1>
      <BtnDark onClick={() => history.push('/login')}>LOGIN</BtnDark>
      <BtnLight onClick={() => history.push('/register')}>REGISTER</BtnLight>
    </Column>
  );
}
