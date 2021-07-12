import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.05;
  }
`;

const loadingAnimation = ({ time, alternate }) => css`
  ${time} linear ${alternate} ${fadeIn};
`;
const LoadingMessage = styled.h2`
  text-align: center;
  font-size: 5rem;
  color: ${({ theme }) => theme.primaryFontColor};
  opacity: 0;
  animation: ${({ wait }) => {
    if (wait > 200) {
      return loadingAnimation({ time: `2s`, alternate: `alternate infinite` });
    }
    return loadingAnimation({ time: `3s` });
  }};
`;

export default LoadingMessage;
