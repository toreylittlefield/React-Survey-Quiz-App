import styled from 'styled-components';

const containerStyles = styled.div`
  padding: 1em 0em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export default containerStyles;
