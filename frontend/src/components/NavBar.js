import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Field } from './Input';
import { BtnDark, BtnLight } from './Button';
import { Row } from './Grid';
import { getItem } from '../utils/storageManager';
import { logout } from '../utils/router';
import Avatar from './Avatar';


const AvatarBackground = styled.div`
  padding: 3px;
  border-radius: 50%;
  background-color: transparent;
  border: solid #fff 2px;
`;

const Bar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  padding: .1em 10em;
  background-color: #777;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  width: 100vw;
  height: 5em;
`;

export default function NavBar() {
  const userRef = useRef('');
  const history = useHistory();
  const loggedUser = getItem('user_SF');

  return (
    <div>
      <Bar>
        <Row>
          <AvatarBackground>
            <Avatar size="30" {...loggedUser.avatar} />
          </AvatarBackground>
          <Field width="15em" ref={userRef} />
          <BtnDark>SEARCH USER</BtnDark>
        </Row>
        <Row>
          <BtnLight onClick={() => history.push('/feed')}>FEED</BtnLight>
          <BtnLight onClick={() => history.push('/creator')}>CREATE POST</BtnLight>
          <BtnLight onClick={() => history.push('/user/' + loggedUser._id)}>WALL</BtnLight>
          <BtnDark onClick={() => logout(history)}>LOGOUT</BtnDark>
        </Row>
      </Bar>
      <Spacer />
    </div>
  );
}
