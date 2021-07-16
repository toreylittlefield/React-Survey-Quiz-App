import styled from 'styled-components';

const Label = styled.label`
  color: ${({ lineColor }) => lineColor};
  padding: 0.1em;
  @media (max-width: 480px) {
    align-self: center;
  }
`;

export default Label;
