import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primaryFontColor: '#DBDDE5',
  primaryBgColor: '#363a66',
  secondaryBgColor: '#383D6E',
};

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
