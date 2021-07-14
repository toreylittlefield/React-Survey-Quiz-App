import { createGlobalStyle } from 'styled-components';
import TitilliumWebItalic from '../Assets/Fonts/Titillium_Web/TitilliumWeb-ExtraLightItalic.ttf';
import TitilliumWebRegular from '../Assets/Fonts/Titillium_Web/TitilliumWeb-Regular.ttf';
import IBMPlexSerif from '../Assets/Fonts/IBM_Plex_Serif/IBMPlexSerif-ExtraLight.ttf';
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
    font-family: 'Titillium-Web-Italic';
    src: url(${TitilliumWebItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Titillium-Web-Regular';
    src: url(${TitilliumWebRegular}) format('truetype');
  }

  @font-face {
    font-family: 'IBMPlexSerif';
    src: url(${IBMPlexSerif}) format('truetype');
  }

  :root {
    font-family: 'Titillium-Web-Regular';
  }

  .quiz-title * {
    font-family: 'IBMPlexSerif';
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Titillium-Web-Italic';
  }


`;

export default GlobalStyle;
