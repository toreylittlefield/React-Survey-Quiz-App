import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import loadingImage from '../Assets/Media/choose.svg';

const blurIn = keyframes`
  0% {
    filter: blur(100px);
  }
  100% {
    filter: blur(0px);
    color: black;
  }
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
  animation: 2.9s linear forwards ${blurIn};
`;

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
  color: #fff;
  opacity: 0;
  animation: ${({ wait }) => {
    if (wait > 200) {
      return loadingAnimation({ time: `2s`, alternate: `alternate infinite` });
    }
    return loadingAnimation({ time: `3s` });
  }};
`;

function Loading() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [wait, setWait] = useState(0);
  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      if (count > 99) {
        return setWait((prev) => prev + 1);
      }
      count++;
      setLoadingProgress((prev) => prev + 1);
    }, 15);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <LoadingWrapper />
      <LoadingMessage
        wait={wait}
      >{`Loading ${loadingProgress}%...`}</LoadingMessage>
    </React.Fragment>
  );
}

export default Loading;
