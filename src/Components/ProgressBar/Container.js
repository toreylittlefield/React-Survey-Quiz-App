import styled from 'styled-components';

const containerStyles = styled.div`
  padding: 1em 0em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 480px) {
    justify-content: space-around;
  }
`;

export default containerStyles;
