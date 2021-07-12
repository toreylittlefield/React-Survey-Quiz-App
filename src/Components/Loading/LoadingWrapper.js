import styled, { keyframes, css } from 'styled-components';
import loadingImage from '../../Assets/Media/choose.svg';

// Blur background
const blurIn = (amountBlur1 = 100, amountBlur2) => keyframes`
  0% {
    filter: blur(${amountBlur1}px);
  }
  ${
    amountBlur2 &&
    `40% {
      filter: blur(30px)
    }
    60% {
      filter: blur(0px)
    }`
  }
  100% {
    filter: blur(0px);
  }
`;

const blurAnimation = ({ time, option }) => css`
  ${time} linear ${option} ${option === 'infinite'
    ? blurIn('200', true)
    : blurIn()};
`;

const LoadingWrapper = styled.div`
  background: url(${loadingImage}) no-repeat left center/cover;
  background-color: #000000;
  position: absolute;
  overflow: hidden;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(100px);
  animation: ${({ wait }) => {
    if (wait > 200) {
      return blurAnimation({ time: `5s`, option: 'infinite' });
    }
    return blurAnimation({ time: `2.8s`, option: 'forwards' });
  }};
`;

export default LoadingWrapper;
