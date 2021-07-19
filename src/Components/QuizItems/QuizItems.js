import React, { Children, cloneElement } from 'react';
import QuizItemCard from './QuizItemCard';
import styled from 'styled-components';

const QuizItemsContainer = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  transform-style: preserve-3d;
  perspective: 1500px;
  backface-visibility: hidden;
`;

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  // const itemsRef = memo(
  //   () =>
  //     Array.from({ length: quizQuestions.length + 1 }, () =>
  //       // eslint-disable-next-line react-hooks/rules-of-hooks
  //       useRef()
  //     ),
  //   [quizQuestions]
  // );

  // const handleShow = (i) => {
  //   console.log({ itemsRef, ref: itemsRef[i + 1] });
  //   setTimeout(() => {
  //     itemsRef[i + 1].current.scrollIntoView({
  //       behavior: 'smooth',
  //     });
  //   }, 400);
  // };
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
            // onClick={(e) => {
            //   console.log({ target: e.target });
            //   handleShow(quizIdx);
            // }}
            choiceSelected={Object.entries(choicesSelected[quizIdx]).flat(2)}
            cardNumber={quizIdx}
            correctChoiceIndex={correctChoiceIndex}
            showAnswers={showAnswers}
          >
            {/* ref={itemsRef[quizIdx]} */}
            <h2>{word}</h2>
            {/* Quiz Questions */}
            {childrenwithprops}
            {/* End Quiz Questions */}
          </QuizItemCard>
        );
      })}
      {/* <div
        style={{ visibility: 'hidden' }}
        ref={itemsRef[itemsRef.length - 1]}
      ></div> */}
    </QuizItemsContainer>
  );
};

export default QuizItems;
