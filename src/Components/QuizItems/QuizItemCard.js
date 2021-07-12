import React from 'react';
import styled from 'styled-components';

const QuizCardSection = styled.section`
  --bg-color: ${({ theme }) => theme.secondaryBgColor};

  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 50vw;
  max-width: 80%;
  padding: 2em 0;
  background: var(--bg-color);
  box-shadow: 0 0 6px 0 rgba(#202024, 0.12);
  transition: all 0.35s ease;
  margin-bottom: 2em;
  opacity: 0.5;
  border-radius: 15px;

  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--bg-color);
    height: 4px;
    border-radius: 15px;
  }

  ::before {
    width: 0;
    opacity: 0;
    transition: opacity 0 ease, width 0 ease;
    transition-delay: 0.5s;
  }

  ::after {
    width: 100%;
    background: white;
    transition: width 0.5s ease;
  }
  :hover {
    width: 90vw;
    box-shadow: 0 10px 20px 0 rgba(#202024, 0.12);
    opacity: 1;
    border-radius: 15px;
    border-color: white;
    border-style: solid;
    border-width: 4px;

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

const QuizCardContent = styled.div`
  width: 70vw;
  max-width: 80%;
`;

const QuizItemCard = ({ children = [] }) => {
  return (
    <QuizCardSection>
      <QuizCardContent>{children}</QuizCardContent>
    </QuizCardSection>
  );
};

export default QuizItemCard;
