import React, { Children, cloneElement } from 'react';
import QuizItemCard from './QuizItemCard';
import styled from 'styled-components';

const QuizItemsContainer = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  /* For 3D Cards */
  /* transform-style: preserve-3d;
  perspective: 1500px;
  backface-visibility: hidden; */
`;

// const QuizQuestionH2 = styled.h2`
//   @media (max-width: 480px) {
//     ${({ wordLength }) => {
//       return css`
//         font-size: max(26px, calc(145% - ${wordLength}%));
//       `;
//     }};
//   }
//   /* font-size: calc(20px + (26 - 20) * ((100vw - 300px) / (1600 - 300))); */
// `;

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  const { choicesSelected = [{ key: '' }], showAnswers = false } = props;

  return (
    <QuizItemsContainer id="quiz-items-container">
      {quizQuestions.map((quizQuestion = {}, quizIdx) => {
        const { id, word, correctChoiceIndex } = quizQuestion;
        const childrenwithprops = Children.map(children, (element) =>
          cloneElement(element, {
            ...{ ...props, ...quizQuestion, ...choicesSelected, quizIdx },
          })
        );
        return (
          <QuizItemCard
            key={id + correctChoiceIndex + quizIdx}
            choiceSelected={Object.entries(choicesSelected[quizIdx]).flat(2)}
            cardNumber={quizIdx}
            correctChoiceIndex={correctChoiceIndex}
            showAnswers={showAnswers}
            word={word}
          >
            {/* Quiz Questions */}
            {childrenwithprops}
            {/* End Quiz Questions */}
          </QuizItemCard>
        );
      })}
    </QuizItemsContainer>
  );
};

export default QuizItems;
