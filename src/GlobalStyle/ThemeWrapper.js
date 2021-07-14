import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primaryFontColor: '#DBDDE5',
  secondaryFontColor: '#7B7B7B',
  primaryBgColor: '#141A33',
  secondaryBgColor: '#222D58',
  boxShadowLight: 'rgba(219, 221, 229, 0.2)',
  boxShadowDark: 'rgba(54, 58, 102, 0.2)',
  primaryButtonColor: { h: '189', s: '95%', l: '43%' },
  secondaryButtonColor: { h: '228', s: '44', l: '24%' },
  alternateButtonColor: { h: '0', s: '0%', l: '87%' },
  whiteButtonColor: { h: '0', s: '0%', l: '100%' },
  outlineColor: '#0D856E',
  successColor: '#45C9AA',
  rejectColor: '#C50E49',
};

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
