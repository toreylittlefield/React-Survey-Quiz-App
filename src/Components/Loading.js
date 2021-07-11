import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import loadingImage from '../Assets/Media/choose.svg';

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
    ? blurIn('100', true)
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

// animation: 2.9s linear infinite ${blurIn};
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

  const message =
    wait > 1000 ? `Still Loading hmm... 🤔` : `Loading ${loadingProgress}%...`;

  return (
    <React.Fragment>
      <LoadingWrapper wait={wait} />
      <LoadingMessage wait={wait}>{message}</LoadingMessage>
    </React.Fragment>
  );
}

export default Loading;
