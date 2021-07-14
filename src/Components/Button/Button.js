import styled from 'styled-components';
import React from 'react';

const CustomButton = styled.button`
  /* --clr-color: #b64965;
  --clr-bg: #c56d84; */
  // #363A66 //235° , 31% , 31%
  --color: 345, 43%; /*the base color*/
  --l: 50%; /*the initial lightness*/

  --color-primary: hsl(var(--color), var(--l));
  --color-primary-darker: hsl(var(--color), calc(var(--l) - 5%));
  --color-primary-darkest: hsl(var(--color), calc(var(--l) - 10%));
  font-size: 2rem;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  margin: 2rem 0 2rem 0;
  padding: 0.25em 1em;
  border-radius: 0.25em;
  position: relative;
  background: ${({ buttonColor }) =>
    buttonColor ? buttonColor : `var(--color-primary);`};
  color: #fff;
  cursor: pointer;
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
