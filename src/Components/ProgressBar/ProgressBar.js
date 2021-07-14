import React from 'react';
import Label from './Label';
// import Filler from './Filler';
import Container from './Container';
import { useState, useEffect } from 'react';
import { FaBone, GiFishbone, DiReact } from 'react-icons/all';

const ProgressBar = ({
  progress = 0,
  // quizQuestions = 0,
  numCorrectAnswers = [],
}) => {
  // const calcProgress = () => Math.round((progress / quizQuestions) * 100);

  const [lines, setLines] = useState([
    { character: '-', lineColor: 'inherit' },
  ]);
  useEffect(() => {
    if (progress === 0)
      return setLines(
        numCorrectAnswers.map(() => ({
          character: <DiReact />,
          lineColor: 'inherit',
        }))
      );
    numCorrectAnswers.map((answer, answerIdx) => {
      if (answer === 1) {
        setLines((prev) =>
          prev.map((line, lineIdx) => {
            if (lineIdx === answerIdx)
              return { character: <FaBone />, lineColor: 'green' };
            return line;
          })
        );
      } else if (answer === 0) {
        setLines((prev) =>
          prev.map((line, lineIdx) => {
            if (lineIdx === answerIdx)
              return { character: <GiFishbone />, lineColor: 'red' };
            return line;
          })
        );
      }
      return answer;
    });
  }, [numCorrectAnswers, progress]);

  // const { completed } = {
  //   completed: calcProgress(),
  // };

  return (
    <section className="progress-bar">
      <h3>{`Score:`}</h3>
      <Container>
        {lines.map((line) => (
          <Label lineColor={line.lineColor}>{line.character}</Label>
        ))}
      </Container>
    </section>
  );
};

export default ProgressBar;
