import styled from 'styled-components';

const Btn = styled.button`
  margin: 1em .5em;
  padding: .4em .9em;
  font-weight: bold;
  border-style: solid;
  border-radius: 8px;
  border-width: 3px;
  border-color: #000;
  cursor: pointer;
`;

const BtnLight = styled(Btn)`
  color: #000;
  background-color: #fff;
`;

const BtnDark = styled(Btn)`
  color: #fff;
  background-color: #000;
`;

export { BtnDark, BtnLight };
