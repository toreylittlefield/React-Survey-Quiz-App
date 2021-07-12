import React, { Children, cloneElement } from 'react';
import QuizItemCard from './QuizItemCard';

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  return (
    <React.Fragment>
      {quizQuestions.map((quizQuestion = {}, quizIdx) => {
        const { id, word, correctChoiceIndex } = quizQuestion;
        const childrenwithprops = Children.map(children, (element) =>
          cloneElement(element, { ...{ ...props, ...quizQuestion, quizIdx } })
        );
        return (
          <QuizItemCard key={id + correctChoiceIndex}>
            <h2>{word}</h2>
            {/* Quiz Questions */}
            {childrenwithprops}
            {/* End Quiz Questions */}
          </QuizItemCard>
        );
      })}
    </React.Fragment>
  );
};

export default QuizItems;
