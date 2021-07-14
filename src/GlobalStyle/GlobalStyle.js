import { createGlobalStyle } from 'styled-components';
import TitilliumWeb from '../Assets/Fonts/Titillium_Web/TitilliumWeb-ExtraLightItalic.ttf';
import normalize from './normalizecss';

const GlobalStyle = createGlobalStyle`
${normalize}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
};

@font-face {
    font-family: 'Titillium Web';
    src: url(${TitilliumWeb}) format('truetype');
  }

  :root {
    font-family: 'Titillium Web', sans-serif;
  }


`;

export default GlobalStyle;
