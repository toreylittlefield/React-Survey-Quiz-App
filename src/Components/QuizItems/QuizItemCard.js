import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const answeredStyles = css`
  opacity: 0.25;
  transform: scale(0.75);
  margin-bottom: 0em;
  transition: all ease-out 0.5s;
`;

const notYetAnsweredStyles = css`
  opacity: 0.5;
`;

const QuizCardSection = styled.section`
  --boxShadowLight: ${({ theme }) => theme.boxShadowLight};
  --bg-color: ${({ theme }) => theme.secondaryBgColor};
  --border-radius: 15px;
  --border-height: 4px;

  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 50vw;
  max-width: 80%;
  padding: 2em 0;
  background: var(--bg-color);
  box-shadow: 0px 0px 6px 0px var(--boxShadowLight);
  transition: all 0.35s ease;
  margin-bottom: 2em;
  ${({ choice }) => (choice === false ? notYetAnsweredStyles : answeredStyles)};
  border-radius: var(--border-radius);

  section :last-child {
    margin-bottom: 10em;
  }

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--border-height);
    border-radius: var(--border-radius);
  }

  ::before {
    width: 0;
    opacity: 0;
    transition: opacity 0 ease, width 0 ease;
    transition-delay: 0.5s;
  }

  ::after {
    width: 100%;
    background: ${({ theme }) => theme.primaryFontColor};
    transition: width 0.5s ease;
  }
  ${({ choice }) =>
    choice === false
      ? css`
          :hover {
            width: 90vw;
            box-shadow: 0px 10px 20px 0px var(--boxShadowLight);
            opacity: 1;
            border-radius: var(--border-radius);
            border-color: ${({ theme }) => theme.primaryFontColor};
            border-style: solid;
            border-width: var(--border-height);
            transform: scale(1);
            font-size: 1.5rem;
            line-height: 2.5rem;

            ::before {
              width: 100%;
              opacity: 1;
              transition: opacity 0.5s ease, width 0.5s ease;
              transition-delay: 0;
            }

            ::after {
              width: 0;
              opacity: 0;
              transition: width 0 ease;
            }
          }
        `
      : ''}
`;

const QuizCardContent = styled.div`
  width: 70vw;
  max-width: 80%;
`;

const QuizItemCard = ({ children = [], choiceSelected = [], ...props }) => {
  const [choice, setChoice] = useState(false);
  const [key, value] = choiceSelected;
  const handleClick = () => {
    if (!key) return;
    if (value !== null && choice === false) return setChoice(true);
    if (value !== null && choice) return setChoice(false);
  };

  const handleOnMouseLeave = () => {
    if (!key) return;
    if (value !== null && choice === false) return setChoice(true);
  };

  const handleOnMouseEnter = () => {
    if (!key) return;
    if (value !== null && choice) return setChoice(false);
  };
  return (
    <QuizCardSection
      {...{
        ...props,
        choice,
        onMouseLeave: handleOnMouseLeave,
        onMouseEnter: handleOnMouseEnter,
        onClick: handleClick,
      }}
    >
      <QuizCardContent>{children}</QuizCardContent>
    </QuizCardSection>
  );
};

export default QuizItemCard;
