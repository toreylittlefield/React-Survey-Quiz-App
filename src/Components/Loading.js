import React from 'react';
import styled, { keyframes } from 'styled-components';
import loadingImage from '../Assets/Media/choose.svg';

const LoaddingWrapper = styled.div`
  background: url(${loadingImage}) no-repeat center center/cover;
  background-color: #000000;
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingMessage = styled.h2`
  font-size: 50px;
  color: #fff;
  animation: 1s linear infinite alternate ${fadeIn};
`;

// const scale = (num, in_min, in_max, out_min, out_max) => {
//   return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
// };

function Loading() {
  return (
    <React.Fragment>
      <LoaddingWrapper />
      <LoadingMessage>Loading...</LoadingMessage>
    </React.Fragment>
  );
}

export default Loading;
