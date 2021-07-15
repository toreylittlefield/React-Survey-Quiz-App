import React from 'react';
import LoadingWrapper from './LoadingWrapper';
import LoadingMessage from './LoadingMessage';
import useLoadingHook from '../../Hooks/useLoadingHook';

// // Variables For Timing
const SWITCH_MESSAGE_ON_COUNT = 1000;

const Loading = ({ children = [] }) => {
  const [loadingProgress, wait] = useLoadingHook();

  const message =
    wait > SWITCH_MESSAGE_ON_COUNT
      ? `Well this is odd... 🤔`
      : `Loading ${loadingProgress}%...`;

  return (
    <React.Fragment>
      <LoadingWrapper wait={wait} />
      <LoadingMessage wait={wait}>{message}</LoadingMessage>
      {children}
    </React.Fragment>
  );
};

export default Loading;
