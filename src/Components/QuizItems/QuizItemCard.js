import React, { useState } from 'react';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import useClickOutside from '../../Hooks/useClickOutside';

const selectedChoiceTransition = css`
  transform: ${({ cardNumber }) =>
    cardNumber % 2 === 1 ? `scale(0.1)` : `scale(0.1)`};
  opacity: 0;
  visibility: hidden;
  font-size: 0;
  padding: 0;
  margin: 0;
  transition-timing-function: linear;
  transition-property: transform, opacity, visibility, font-size, padding,
    margin;
  transition-duration: 600ms, 500ms, 500ms, 500ms, 500ms, 500ms;
`;

const correctChoiceSelected = css`
  background-color: green;
`;

const notCorrectChoiceSelected = css`
  background-color: red;
`;

const answeredStyles = css`
  opacity: 1;
  transform: scale(1);
  transition: all ease-out 0.5s;
  ${({ showAnswers }) => (showAnswers ? '' : selectedChoiceTransition)}
  ${({ value, correctChoiceIndex }) => {
    if (value === correctChoiceIndex) {
      return correctChoiceSelected;
    }
    return notCorrectChoiceSelected;
  }}
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
  background: ${({ value }) => (value === null ? `var(--bg-color)` : `purple`)};
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

  ${({ choice, cardNumber, isActive, showAnswers }) => {
    if (showAnswers) return answeredStyles;
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

const defaultState = {
  choice: false,
  isActive: true,
  isActiveElement: true,
};

const QuizItemCard = ({
  children = [],
  choiceSelected = [],
  correctChoiceIndex = -1,
  cardNumber = -1,
  showAnswers = false,
  ...props
}) => {
  const [choice, setChoice] = useState(defaultState.choice);
  const [isActive, setActive] = useState(defaultState.isActive);
  const [isActiveElement, setIsActiveElement] = useState(
    defaultState.isActiveElement
  );
  const [key, value] = choiceSelected;

  useEffect(() => {
    if (!showAnswers) return;
    setChoice(defaultState.choice);
    setActive(defaultState.isActive);
    setIsActiveElement(defaultState.isActiveElement);
  }, [showAnswers]);

  const domNode = useClickOutside(() => handleOnTouchLeave(), isActive);

  const handleClick = (e) => {
    if (!key || showAnswers) return;
    if (!isActiveElement && e) {
      e.preventDefault();
      return setIsActiveElement(true);
    }
    if (value && choice) setIsActiveElement(true);
    if (value !== null) return setChoice(false);
  };

  const handleOnTouchLeave = () => {
    if (!key || showAnswers) return;
    if (isActiveElement) setIsActiveElement(false);
    if (isActive && cardNumber === 0) return setActive(false);
  };

  const handleOnMouseLeave = () => {
    if (!key || showAnswers) return;
    if (isActive && cardNumber === 0) setActive(false);
    if (isActiveElement) setIsActiveElement(false);
    if (value !== null && choice === false) setChoice(true);
  };

  const handleOnMouseEnter = () => {
    if (!key || showAnswers) return;
    if (!isActiveElement) setIsActiveElement(true);
    if (value !== null && choice) setChoice(false);
  };

  const onTouchMove = (e) => {
    console.log(e);
  };
  return (
    <QuizCardSection
      ref={domNode}
      {...{
        ...props,
        showAnswers,
        value,
        correctChoiceIndex,
        choice,
        onMouseLeave: handleOnMouseLeave,
        onMouseEnter: handleOnMouseEnter,
        onClick: handleClick,
        cardNumber,
        isActive,
        onTouchMove,
      }}
    >
      <QuizCardContent>{children}</QuizCardContent>
    </QuizCardSection>
  );
};

export default QuizItemCard;
