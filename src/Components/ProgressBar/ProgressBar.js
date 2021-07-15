import React from 'react';
import Label from './Label';
// import Filler from './Filler';
// import Container from './Container';
import { useState, useEffect } from 'react';
import { FaBone, GiFishbone, DiReact, BsQuestionCircle } from 'react-icons/all';
import styled, { keyframes, css } from 'styled-components';

const reactKeyFrames = keyframes`
  100% {
    transform:rotate(360deg);
  }
`;
const styleReact = css`
  animation: ${reactKeyFrames} 3s linear 0ms infinite;
  color: ${({ theme }) => theme.successColor[1]};
`;

const ReactIcon = styled(DiReact)`
  ${styleReact}
`;

const questionKeyFrames = keyframes`
    0% { transform: translate(-5%, 10%) scale(.75, 0.75); }
    50% { transform: translate(-5%, -10%) scale(1, 1); }
    55% { transform: translate(-5%, -10%) rotate(15deg); }
    60% { transform: translate(-5%, -10%) rotate(-15deg); }
    65% { transform: translate(-5%, -10%) rotate(15deg); }
    70% { transform: translate(-5%, -10%) rotate(-15deg); }
    100% { transform: translate(-5%, 10%) scale(1.25, 0.75); }
`;
const styleQuestion = css`
  animation: ${questionKeyFrames} 3s linear 0ms infinite;
  color: ${({ theme }) => theme.primaryFontColor};
`;

const QuestionIcon = styled(BsQuestionCircle)`
  ${styleQuestion}
`;

const fishKeyFrames = keyframes`
    0% { transform: translate(-5%, 0%) scale(1, 1); }
    50% { transform: translate(-5%, -3%) scale(1, 1); }
    55% { transform: translate(5%, -4%) rotate(10deg) scale(1.25, 1.25);}
    60% { transform: translate(50%, -5%) rotate(-10deg) scale(1.25, 1.25);}
    65% { transform: translate(0%, -100%) rotate(-75deg) scale(1.25, 1.25);}
    70% { transform: translate(0%, -100%) rotate(-10deg) scale(1.25, 1.25);}
    80% { 
      transform: translate(0%, 0%) rotate(-5deg) scale(1.25, 1.25);
      opacity: 1;
    }
    90% { 
      transform: translate(0%, -5%) rotate(-5deg) scale(1.25, 1.25);
      opacity: 0;
    }
    100% { 
      transform: translate(-5%, 0%) scale(1, 1); 
      opacity: 0;
      }
`;
const styleFish = css`
  animation: ${fishKeyFrames} 4s linear 0ms infinite;
`;

const FishIcon = styled(GiFishbone)`
  ${styleFish}
`;

const ProgressBar = ({
  progress = 0,
  showAnswers = false,
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
          character: <ReactIcon />,
          lineColor: 'inherit',
        }))
      );
    numCorrectAnswers.map((answer, answerIdx) => {
      if (answer === 1) {
        setLines((prev) =>
          prev.map((line, lineIdx) => {
            if (lineIdx === answerIdx)
              return {
                character: !showAnswers ? <QuestionIcon /> : <FaBone />,
                lineColor: showAnswers ? 'green' : 'inherit',
              };
            return line;
          })
        );
      } else if (answer === 0 || showAnswers) {
        setLines((prev) =>
          prev.map((line, lineIdx) => {
            if (lineIdx === answerIdx)
              return {
                character: !showAnswers ? <QuestionIcon /> : <FishIcon />,
                lineColor: showAnswers ? 'red' : 'inherit',
              };
            return line;
          })
        );
      }
      return answer;
    });
  }, [numCorrectAnswers, progress, showAnswers]);

  // const { completed } = {
  //   completed: calcProgress(),
  // };

  return (
    <section className="progress-bar">
      <h3>{`Score:`}</h3>
      {/* <Container> */}
      {lines.map((line, lineIdx) => (
        <Label key={lineIdx + line.lineColor} lineColor={line.lineColor}>
          {line.character}
        </Label>
      ))}
      {/* </Container> */}
    </section>
  );
};

export default ProgressBar;
