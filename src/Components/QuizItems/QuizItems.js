import React, { Children, cloneElement, useRef } from 'react';
import QuizItemCard from './QuizItemCard';
import styled from 'styled-components';

const QuizItemsContainer = styled.div`
  display: grid;
  width: 100%;
  /* grid-gap: ${({ progress }) => (progress ? `0em` : `2em`)}; */
  place-items: center;
  @media (max-width: 480px) {
    /* grid-gap: ${({ progress }) => (progress ? `0em` : `3.5em`)}; */
  }
`;

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  const itemsRef = Array.from({ length: quizQuestions.length + 1 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef()
  );
  const handleShow = (i) => {
    itemsRef[i + 1].current.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const {
    choicesSelected = [{ key: '' }],
    showAnswers = false,
    progress,
  } = props;

  return (
    <QuizItemsContainer
      progress={!showAnswers && progress.length === quizQuestions.length}
      id="wrapper"
    >
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
            onClick={() => handleShow(quizIdx)}
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
