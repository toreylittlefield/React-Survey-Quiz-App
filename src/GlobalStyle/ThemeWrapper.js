import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primaryFontColor: '#DBDDE5',
  primaryBgColor: '#363a66',
  secondaryBgColor: '#383D6E',
  boxShadowLight: 'rgba(219, 221, 229, 0.2)',
  boxShadowDark: 'rgba(54, 58, 102, 0.2)',
};

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
