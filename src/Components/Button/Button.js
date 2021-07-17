import styled, { css } from 'styled-components';
import React from 'react';

const cssVarsForColor = (hs, l, fontColor) => css`
  --color: ${hs};
  --l: ${l};
  --font-color: ${fontColor};
`;

const CustomButton = styled.button`
  /* --clr-color: #b64965;
  --clr-bg: #c56d84; */
  ${({ color = '', theme }) => {
    if (color === 'alternate') {
      const { h, s, l } = theme.alternateButtonColor;
      const hs = `${h},${s}`;
      const fontColor = theme.secondaryFontColor;
      return cssVarsForColor(hs, l, fontColor);
    }
    if (color === 'secondary') {
      const { h, s, l } = theme.secondaryButtonColor;
      const hs = `${h},${s}`;
      const fontColor = theme.primaryFontColor;
      return cssVarsForColor(hs, l, fontColor);
    }
    if (color === 'white') {
      const { h, s, l } = theme.whiteButtonColor;
      const hs = `${h},${s}`;
      const fontColor = theme.secondaryFontColor;
      return cssVarsForColor(hs, l, fontColor);
    }
    const { h, s, l } = theme.primaryButtonColor;
    const hs = `${h},${s}`;
    const fontColor = theme.primaryFontColor;
    return cssVarsForColor(hs, l, fontColor);
  }}

  --color-primary: hsl(var(--color), var(--l));
  --color-primary-darker: hsl(var(--color), calc(var(--l) - 5%));
  --color-primary-darkest: hsl(var(--color), calc(var(--l) - 10%));

  font-size: 2em;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  margin: 2em 0 2em 0;
  padding: 0.25em 1em;
  border-radius: 0.25em;
  position: relative;
  background: ${({ buttonColor }) =>
    buttonColor ? buttonColor : `var(--color-primary);`};
  color: var(--font-color);
  :hover,
  :focus {
    background: var(--color-primary-darker);
  }
  :active {
    background: var(--color-primary-darkest);
  }
`;

const Button = ({ hideButton = false, children = [], ...props }) => {
  if (hideButton) return null;
  return <CustomButton {...props}>{children} </CustomButton>;
};

export default Button;
