import React from 'react';
import styled from 'styled-components';

const LoaddingWrapper = styled.div`
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100vw + 60px);
  height: calc(100vh + 60px);
  z-index: -1;
  filter: blur(0px);
`;

function Loading() {
  return (
    <React.Fragment>
      <LoaddingWrapper />
      <h2>Loading...</h2>
    </React.Fragment>
  );
}

export default Loading;
