import React from 'react';
import styled from 'styled-components';

const QuizTitleSection = styled.section`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  padding: 2em;
  align-items: flex-start;
  width: 50vw;
  max-width: 80%;
`;

const QuizTitleH1 = styled.h1`
  opacity: 0.8;
  letter-spacing: 0.4em;
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
