import React, { useState } from 'react';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import useClickOutside from '../../Hooks/useClickOutside';
import Button from '../Button/Button';

const selectedChoiceTransition = css`
  transform: scale(0.1);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  font-size: 0;
  padding: 0;
  margin: 0;
  transition: transform 600ms linear, width 0s, opacity 0s 600ms,
    visibility 0s ease 600ms, font-size 200ms linear 400ms;
`;

const QuizItemSpacer = styled.div`
  display: flex;
  justify-content: center;

  :not(:first-of-type) {
    margin-top: 2em;
  }

  margin-bottom: -2em;
  width: 100%;
  ${({ showAnswers, isVisible }) => {
    if (showAnswers) return;
    if (!isVisible) {
      return css`
        margin-top: 0em;
        margin-bottom: 0em;
        visibility: hidden;
      `;
    }
  }}
`;

const correctChoiceSelected = css`
  color: ${({ theme }) => theme.successColor[1]};
`;

const notCorrectChoiceSelected = css`
  color: ${({ theme }) => theme.rejectColor[3]};
`;

const answeredStyles = css`
  opacity: 1;
  transform: scale(1);
  transition: all ease-out 0.5s;
  ${({ isVisible }) => (isVisible ? '' : selectedChoiceTransition)}
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
  /**
  for 3D cards
  transform: rotateX(0) translateZ(0) scaleY(0);
   */
  box-shadow: 0px 10px 20px 0px var(--boxShadowLight);
  opacity: 1;
  border-radius: var(--border-radius);
  border-color: ${({ theme }) => theme.primaryFontColor};
  border-style: solid;
  border-width: var(--border-height);
  transform: scale(1);
  font-size: 1.5rem;
  line-height: 2.5rem;
  /* @media (max-width: 480px) {
    & label {
      padding: 0.5em 0em;
    }
  } */
`;

const hoverCSS = css`
  :hover,
  :active {
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
  --bg-color: ${({ theme }) => theme.primaryBgColor};
  --alt-bg-color: ${({ theme }) => theme.secondaryBgColor};
  --border-radius: 15px;
  --border-height: 4px;

  /**
  for 3D cards
  ${({ cardNumber }) => {
    if (cardNumber === 0) {
      return css`
        transform: rotateX(35deg) translateZ(-50px);
        box-shadow: 0px 5px 10px 0px var(--boxShadowLight);
      `;
    }
    if (cardNumber === 2)
      return css`
        transform: rotateX(-35deg) translateZ(-80px);
        box-shadow: 0px -5px 10px 0px var(--boxShadowLight);
      `;
  }}
  */

  position: relative;
  display: flex;
  justify-content: center;
  width: 50vw;
  max-width: 80%;
  padding: 1.5em 0em 1em 0em;
  margin-bottom: 2em;
  /* @media (max-width: 480px) { */
  ${
    ({ showAnswers }) => {
      if (!showAnswers)
        return css`
          width: 50vw;
        `;
      return css`
      width: 70vw;
      font-size: 1.2rem;
      & label {
        padding: 0.3em 0.3em;
        font-size: 1.1rem;
      } 
    }`;
    }
    // }
  }
  background: ${({ value, correctChoiceIndex, isVisible, showAnswers }) => {
    if (isVisible && !showAnswers) {
      if (value === null) return `var(--bg-color)`;
      return `var(--alt-bg-color)`;
    }
    if (correctChoiceIndex === value) return `var(--bg-color)`;
    return `var(--bg-color)`; //theme.primaryFontColor;
  }};
  box-shadow: 0px 0px 6px 0px var(--boxShadowLight);
  transition: all 0.4s linear 150ms;
  border-radius: var(--border-radius);
  ${({ answered }) =>
    answered === false ? notYetAnsweredStyles : answeredStyles};

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
    background: ${({
      theme,
      value,
      correctChoiceIndex,
      isVisible,
      showAnswers,
    }) => {
      if (showAnswers || !isVisible) {
        if (value === correctChoiceIndex) return theme.successColor[0];
        return theme.rejectColor[3];
      }
      return theme.primaryFontColor;
    }};
    transition: width 0.5s ease;
  }

  ${({ answered, cardNumber, isActive, showAnswers }) => {
    if (showAnswers) return answeredStyles;
    if (answered === false && cardNumber === 0 && isActive) {
      return hoverDefault;
    }
    if (answered === false) {
      return hoverCSS;
    }
  }}
`;

const QuizCardContent = styled.div`
  width: 70vw;
  max-width: 80%;
`;

const defaultState = {
  answered: false,
  isActive: true,
  isActiveElement: true,
  isVisible: true,
};

const QuizItemCard = ({
  children = [],
  choiceSelected = [],
  correctChoiceIndex = -1,
  cardNumber = -1,
  showAnswers = false,
  ...props
}) => {
  const [answered, setAnswered] = useState(defaultState.answered);
  const [isActive, setActive] = useState(defaultState.isActive);
  const [isActiveElement, setIsActiveElement] = useState(
    defaultState.isActiveElement
  );
  const [isVisible, setIsVisible] = useState(defaultState.isVisible);
  const [key, value] = choiceSelected;

  useEffect(() => {
    if (answered && value !== null) {
      setIsVisible(false);
    }
  }, [answered, value]);

  useEffect(() => {
    if (!showAnswers) return;
    const timer = setTimeout(
      setAnswered(defaultState.answered),
      setActive(defaultState.isActive),
      setIsActiveElement(defaultState.isActiveElement),
      setIsVisible(defaultState.isVisible),
      3000
    );
    return () => clearTimeout(timer);
  }, [showAnswers, isVisible]);

  const domNode = useClickOutside(() => handleOnTouchLeave(), isActive);

  const handleClick = (e) => {
    if (!key || showAnswers) return;
    // if button submit answer click exit
    if (e.target?.value === '') return;
    if (!isActiveElement && e) {
      e.stopPropagation();

      return setIsActiveElement(true);
    }
    if (value && answered) setIsActiveElement(true);
    if (value !== null) return setAnswered(false);
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
    // if (value !== null && answered === false) setAnswered(true);
  };

  const handleOnMouseEnter = () => {
    if (!key || showAnswers) return;
    if (!isActiveElement) setIsActiveElement(true);
    if (value !== null && answered) setAnswered(false);
  };

  const handleSubmitChoice = () => {
    setAnswered(true);
    setIsActiveElement(false);
  };

  return (
    <QuizItemSpacer isVisible={isVisible} showAnswers={showAnswers}>
      <QuizCardSection
        ref={domNode}
        {...{
          ...props,
          showAnswers,
          value,
          correctChoiceIndex,
          answered,
          onMouseLeave: handleOnMouseLeave,
          onMouseEnter: handleOnMouseEnter,
          onClick: handleClick,
          cardNumber,
          isActive,
          isVisible,
        }}
      >
        <QuizCardContent>
          {children}
          <Button
            onClick={handleSubmitChoice}
            color="white"
            fontSize="1.5rem"
            margin="1em 0em"
            animated
            hideButton={
              showAnswers ||
              !isActiveElement ||
              value === null ||
              (!isVisible && answered)
            }
          >
            Submit Choice
          </Button>
        </QuizCardContent>
      </QuizCardSection>
    </QuizItemSpacer>
  );
};

export default QuizItemCard;
