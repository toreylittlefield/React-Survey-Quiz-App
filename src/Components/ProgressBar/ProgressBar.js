import React from 'react';
import Label from './Label';
import Filler from './Filler';
import Container from './Container';

const ProgressBar = ({ progress, quizQuestions }) => {
  const calcProgress = () => Math.round((progress / quizQuestions) * 100);

  const { completed } = {
    completed: calcProgress(),
  };

  return (
    <section className="progress-bar">
      <h3>{`Progress:`}</h3>
      <Container>
        <Filler completed={completed}>
          <Label>{`${completed}%`}</Label>
        </Filler>
      </Container>
    </section>
  );
};

export default ProgressBar;
