import styled from "styled-components";

export default styled.select`
  padding: .4em .9em;
  margin: .2em .5em;
  border-radius: 8px;
  border-color: #000;
  border-style: solid;
  background-color: #fff;
  width: ${props => props.width || 20}em;
`