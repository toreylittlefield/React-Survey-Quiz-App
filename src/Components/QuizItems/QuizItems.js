import React, { Children, cloneElement } from 'react';

const QuizItems = ({ quizQuestions = [], children = [], ...props }) => {
  return (
    <React.Fragment>
      {quizQuestions.map((quizQuestion = {}, quizIdx) => {
        const { id, word, correctChoiceIndex } = quizQuestion;
        const childrenwithprops = Children.map(children, (element) =>
          cloneElement(element, { ...{ ...props, ...quizQuestion, quizIdx } })
        );
        return (
          <section key={id + correctChoiceIndex} style={{ width: 300 }}>
            <div>
              <h2>{word}</h2>
              {/* Quiz Questions */}
              {childrenwithprops}
              {/* End Quiz Questions */}
            </div>
          </section>
        );
      })}
    </React.Fragment>
  );
};

export default QuizItems;
