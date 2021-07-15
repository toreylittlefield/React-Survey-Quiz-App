import React from 'react';
import styled from 'styled-components';

const QuizTitleSection = styled.section`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  padding: 2em;
`;

const QuizTitle = ({ title = '', children = [] }) => {
  return (
    <QuizTitleSection className="quiz-title">
      <header>
        <h1>{title}</h1>
      </header>
      {children}
    </QuizTitleSection>
  );
};

export default QuizTitle;
