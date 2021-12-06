import React from 'react';
import styled from 'styled-components';

const Field = styled.input`
  width: 100%;
  padding: .4em .9em;
  margin: .2em .5em;
  border-radius: 8px;
  border-color: #000;
  border-style: solid;

  :invalid {
    background-color: red;
  }
`;

const Wrapper = styled.div`
  text-align: left;
  width: 100%;

  > h4 {
    margin-left: 1em;
    margin-bottom: 0;
  }
`;

export default function Input({ label, type, forwardedRef, minLength, required }) {
  return (
    <Wrapper>
      {label && <h4> {label} </h4>}
      <Field ref={forwardedRef} type={type} minLength={minLength} required={required} />
    </Wrapper>
  );
}

export { Field };
