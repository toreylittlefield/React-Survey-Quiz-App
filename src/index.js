import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './GlobalStyle/GlobalStyle';
import ThemeWrapper from './GlobalStyle/ThemeWrapper';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
