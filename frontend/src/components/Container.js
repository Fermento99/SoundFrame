import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 3em;
  max-width: ${props => props.maxwidth};
`;

export default Container;