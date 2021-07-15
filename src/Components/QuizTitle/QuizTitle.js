import React from 'react';
import styled from 'styled-components';

const QuizTitleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-items: center;
  /* align-items: center; */
  width: min(100%, 50vw);
  max-width: 80%;
`;

const QuizTitleH1 = styled.h1`
  opacity: 0.8;
  letter-spacing: 0.4em;
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const QuizTitle = ({ title = '', children = [] }) => {
  return (
    <QuizTitleSection className="quiz-title">
      <QuizTitleH1>{title}</QuizTitleH1>
      {children}
    </QuizTitleSection>
  );
};

export default QuizTitle;
