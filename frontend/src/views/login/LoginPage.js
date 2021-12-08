import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { BtnDark } from '../../components/Button';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Input from '../../components/Input';
import { createUrl, postData } from '../../utils/fetcher';
import { login } from '../../utils/router';



export default function LoginPage() {
  const [errorMsg, setErr] = useState('');
  const email = useRef('');
  const pass = useRef('');
  const url = createUrl('auth', 'login');
  const history = useHistory();

  const click = async () => {
    setErr('');
    const response = await postData(url, { user: { email: email.current.value, pass: pass.current.value } });

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
      <h1>Login</h1>
      <Error text={errorMsg} />
      <Input label="E-mail" forwardedRef={email} type="email" />
      <Input label="Password" forwardedRef={pass} type="password" />
      <div>
        <BtnDark onClick={click}> LOGIN </BtnDark>
      </div>
    </Container>
  );
}
