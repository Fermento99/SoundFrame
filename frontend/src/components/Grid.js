import styled from "styled-components";


const grid = styled.div`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};;
`;

const Row = styled(grid)`
  flex-direction: row;
  flex-wrap: ${props => props.wrap ? 'wrap' : 'no-wrap'};
`;

const Column = styled(grid)`
  flex-direction: column;
`;

export { Column, Row };