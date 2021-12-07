import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BtnDark } from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Input from '../../components/Input';
import AvatarCreator from './components/AvatarCreator';
import { createUrl, postData } from '../../utils/fetcher';
import { login } from '../../utils/router';

export default function RegisterPage() {
  const [errorMsg, setErr] = useState('');
  const email = useRef('');
  const username = useRef('');
  const pass = useRef('');
  const pass2 = useRef('');
  const avatarRef = {};
  const url = createUrl('auth', 'register');
  const history = useHistory();

  const click = async () => {
    setErr('');
    if (pass.current.value !== pass2.current.value) { return setErr('passwords dont match'); }

    const response = await postData(url,
      {
        user: {
          username: username.current.value,
          email: email.current.value,
          pass: pass.current.value,
          pass2: pass2.current.value,
          avatar: avatarRef
        }
      });

    if (response.message) {
      console.log(response.message);
      if (typeof (response.message) === 'string') {
        return setErr(response.message);
      } else {
        return setErr(response.message._message);
      }
    }

    login(history, response);
  };

  return (
    <Container maxwidth="500px">
      <h1>Register</h1>
      <Error text={errorMsg} />
      <AvatarCreator avatarRef={avatarRef} />
      <Input label="Nick" forwardedRef={username} type="text" minLength="3" required />
      <Input label="E-mail" forwardedRef={email} type="email" required />
      <Input label="Password" forwardedRef={pass} type="password" required />
      <Input label="Repeat password" forwardedRef={pass2} type="password" required />
      <div>
        <BtnDark onClick={click}> REGISTER </BtnDark>
      </div>
    </Container>
  );
}
