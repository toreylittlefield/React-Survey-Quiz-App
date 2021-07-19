import styled, { css } from 'styled-components';
import React from 'react';

const cssVarsForColor = (hs, l, fontColor) => css`
  --color: ${hs};
  --l: ${l};
  --font-color: ${fontColor};
`;

const animatedStyles = css`
  z-index: 1;
  transition: all 0.3s;
  overflow: hidden;
  ::before,
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    border-radius: 0.25em;
  }
  ::before {
    transition: all 0.3s;
    width: 0%;
    z-index: -1;
    background-color: var(--color-primary-darkest);
  }
  ::after {
    width: 100%;
    height: 100%;
    z-index: -2;
    background: ${({ buttonColor }) =>
      buttonColor ? buttonColor : `var(--color-primary);`};
  }
  :hover {
    ${({ color = '', theme }) => {
      if (color === 'white') {
        return css`
          color: ${theme.secondaryBgColor};
        `;
      }
    }};
    ::before {
      width: 100%;
    }
  }
`;

const transitionOnHoverEffect = css`
  :hover,
  :focus {
    background: var(--color-primary-darker);
    transform: scale(1.02);
    transition: transform 200ms linear 0ms;
  }
  :active {
    background: var(--color-primary-darkest);
    transform: scale(1.03);
    transition: transform 200ms linear 0ms;
  }
`;

const CustomButton = styled.button`
  ${({ color = '', disabledColor = '', disabled = false, theme }) => {
    if (disabled && disabledColor) color = disabledColor;
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

  font-size: ${({ fontSize }) => (fontSize ? fontSize : '2em')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};

  margin: ${({ margin }) =>
    margin
      ? css`
          ${margin}
        `
      : `2em 0em 2em 0em`};
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  border-style: none;
  padding: 0.25em 1em;
  border-radius: 0.25em;
  position: relative;
  color: var(--font-color);
  background: ${({ buttonColor }) =>
    buttonColor ? buttonColor : `var(--color-primary);`};

  ${({ animated = false }) => {
    if (animated) return animatedStyles;
    return transitionOnHoverEffect;
  }};
`;

const Button = ({ hideButton = false, children = [], ...props }) => {
  if (hideButton) return null;
  return <CustomButton {...props}>{children} </CustomButton>;
};

export default Button;
