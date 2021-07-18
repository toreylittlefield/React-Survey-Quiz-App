import React, { Children, cloneElement, useRef } from 'react';
import QuizItemCard from './QuizItemCard';
import styled from 'styled-components';

const QuizItemsContainer = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
`;

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  const itemsRef = Array.from({ length: quizQuestions.length + 1 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef()
  );

  const handleShow = (i) => {
    console.log({ itemsRef, ref: itemsRef[i + 1] });
    setTimeout(() => {
      itemsRef[i + 1].current.scrollIntoView({
        behavior: 'smooth',
      });
    }, 400);
  };
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
            // ref={itemsRef[quizIdx]}
            key={id + correctChoiceIndex}
            onClick={(e) => {
              console.log({ target: e.target });
              handleShow(quizIdx);
            }}
            choiceSelected={Object.entries(choicesSelected[quizIdx]).flat(2)}
            cardNumber={quizIdx}
            correctChoiceIndex={correctChoiceIndex}
            showAnswers={showAnswers}
          >
            <h2 ref={itemsRef[quizIdx]}>{word}</h2>
            {/* Quiz Questions */}
            {childrenwithprops}
            {/* End Quiz Questions */}
          </QuizItemCard>
        );
      })}
      <div
        style={{ visibility: 'hidden' }}
        ref={itemsRef[itemsRef.length - 1]}
      ></div>
    </QuizItemsContainer>
  );
};

export default QuizItems;
