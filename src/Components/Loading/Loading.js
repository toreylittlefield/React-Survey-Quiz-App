import React from 'react';
import LoadingWrapper from './LoadingWrapper';
import LoadingMessage from './LoadingMessage';
import useLoadingHook from './useLoadingHook';

// // Variables For Timing
const SWITCH_MESSAGE_ON_COUNT = 1000;

const Loading = () => {
  const [loadingProgress, wait] = useLoadingHook();

  const message =
    wait > SWITCH_MESSAGE_ON_COUNT
      ? `Well this is odd... 🤔`
      : `Loading ${loadingProgress}%...`;

  return (
    <React.Fragment>
      <LoadingWrapper wait={wait} />
      <LoadingMessage wait={wait}>{message}</LoadingMessage>
    </React.Fragment>
  );
};

export default Loading;
