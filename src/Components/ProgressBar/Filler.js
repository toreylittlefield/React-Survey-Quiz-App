import styled from 'styled-components';

const Filler = styled.div`
  height: 100%;
  width: ${({ completed }) => completed}%;
  background-color: #6a1b9a;
  border-radius: inherit;
  text-align: right;
`;

export default Filler;
