import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import useClickOutside from '../../Hooks/useClickOutside';

const answeredStyles = css`
  opacity: 0.25;
  transform: scale(0.75);
  margin-bottom: 0em;
  transition: all ease-out 0.5s;
`;

const notYetAnsweredStyles = css`
  opacity: 0.5;
`;

const hoverDefault = css`
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
`;

const hoverCSS = css`
  :hover {
    ${hoverDefault}

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

  ${({ choice, cardNumber, isActive }) => {
    if (choice === false && cardNumber === 0 && isActive) {
      return hoverDefault;
    }
    if (choice === false) {
      return hoverCSS;
    }
  }}
`;

const QuizCardContent = styled.div`
  width: 70vw;
  max-width: 80%;
`;

const QuizItemCard = ({
  children = [],
  choiceSelected = [],
  cardNumber = -1,
  ...props
}) => {
  const [choice, setChoice] = useState(false);
  const [key, value] = choiceSelected;
  const [isActive, setActive] = useState(true);

  const domNode = useClickOutside(() => handleOnTouchLeave(), isActive);

  const handleClick = (event) => {
    if (!key) return;
    if (!isActive && choice) {
      event.preventDefault();
      return setActive(true);
    }
    if (value !== null) {
      setChoice(false);
      setActive(false);
    }
  };

  const handleOnTouchLeave = () => {
    if (!key) return;
    if (isActive && cardNumber === 0) return setActive(false);
  };

  const handleOnMouseLeave = () => {
    if (!key) return;
    if (isActive && cardNumber === 0) {
      setActive(false);
    }
    if (value !== null && choice === false) {
      setChoice(true);
      setActive(false);
    }
  };

  const handleOnMouseEnter = () => {
    if (!key) return;
    if (value !== null && choice) {
      setChoice(false);
      setActive(true);
    }
  };
  return (
    <QuizCardSection
      ref={domNode}
      {...{
        ...props,
        choice,
        onMouseLeave: handleOnMouseLeave,
        onMouseEnter: handleOnMouseEnter,
        onClick: handleClick,
        cardNumber,
        isActive,
      }}
    >
      <QuizCardContent>{children}</QuizCardContent>
    </QuizCardSection>
  );
};

export default QuizItemCard;
