import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
};

  body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

`;

export default GlobalStyle;
