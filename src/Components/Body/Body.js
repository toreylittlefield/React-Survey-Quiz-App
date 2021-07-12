import styled from 'styled-components';

const Body = styled.main`
  background-color: ${(props) => props.theme.primaryBgColor};
  min-height: 100vh;
`;

export default Body;
