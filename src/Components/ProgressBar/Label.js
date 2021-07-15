import styled from 'styled-components';

const Label = styled.label`
  color: ${({ lineColor }) => lineColor};
  @media (max-width: 480px) {
    align-self: center;
  }
`;

export default Label;
