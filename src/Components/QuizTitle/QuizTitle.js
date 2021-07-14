import React from 'react';

const QuizTitle = ({ title = '', children = [] }) => {
  return (
    <section className="quiz-title">
      <header>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
};

export default QuizTitle;
