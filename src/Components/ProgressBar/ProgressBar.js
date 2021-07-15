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

const randomNumber = (multNum = 1, addNum = 0, posNeg = 1, symbol = '') => {
  const result = posNeg * Math.ceil((1 + Math.random()) * multNum + addNum);
  if (symbol) return result + symbol;
  return result;
};

const height = () => randomNumber(100, 50, -1, '%');

const scale = () => randomNumber(0.5, 0.5);

const fishKeyFrames = keyframes`
    0% { transform: translate(0%, 0%) rotate(-70deg) scale(3, 3.5); }
    5% { 
      transform: translate(10vw, -5vw) rotate(-30deg) scale(2.5, 3); 
    }
    8% { 
      transform: translate(11vw, -50%) rotate(-40deg) scale(2.2, 2.5); 
    }
    11% { 
      transform: translate(12vw, -100%) rotate(-35deg) scale(2.5, 3); 
    }
    14% { 
      transform: translate(13vw, -50%) rotate(-40deg) scale(2.2, 2); 
    }
    33% { 
      transform: translate(20vw, ${height()}) rotate(-60deg) scale(${
  scale() + 0.55
}, ${scale() - 0.45}); 
    }
    48% {
      transform: translate(30vw, ${height()}) rotate(-30deg) scale(${
  scale() - 0.05
}, ${scale() + 0.4});
    }
    66% { 
      transform: translate(40vw, 50%) rotate(10deg) scale(.8, .8);
      opacity: .7;
      border-bottom: none;
    }
    67% {
      transform: translate(40vw, 50%) rotate(-20deg) scale(.2, .2);
      opacity: .2; 
    }
    70% { 
      transform: translate(45vw, 50%) rotate(-20deg) scale(1, 1);
      opacity: 0;
    }

    100% { 
      opacity: 0;
    }
`;

const timing = () => randomNumber(2200, 1800, 1, 'ms');

const styleFish = css`
  animation: ${() => fishKeyFrames} ${timing} linear 0ms infinite;
`;

const FishIcon = styled(GiFishbone)`
  z-index: 0;
  ${styleFish};
  color: ${({ theme }) => theme.rejectColor[2]};
`;

const boneKeyFrames = keyframes`
    0% { transform: translate(-200%, 0%) rotate(0deg) scale(1.5, 1.5);
      
    }
    33% { 
      transform: translate(1250%, -300%) rotate(360deg) scale(${
        scale() + 0.55 + 1
      }, ${scale() - 0.45 + 1}); 
    }
    48% {
      transform: translate(1500%, -100%) rotate(720deg) scale(${
        scale() - 0.05 + 1
      }, ${scale() + 0.4 + 1});
    }
    66% { 
      transform: translate(2000%, -300%) rotate(1080deg) scale(2, 2);
      opacity: 1;
    }
    77% {
      transform: translate(2400%, -50%) rotate(720deg) scale(2, 2);
      opacity: .5; 
    }
    82% {
      transform: translate(2500%, -150%) rotate(360deg) scale(1.3, 1.3);
      opacity: 0; 
    }
    87% {
      transform: translate(2700%, -100%) rotate(720deg) scale(.75, 0.75);
      opacity: 0; 
    }

    100% { 
      opacity: 0;
    }
`;

const styleBone = css`
  animation: ${() => boneKeyFrames} ${timing} linear 0ms infinite;
`;

const BoneIcon = styled(FaBone)`
  ${styleBone};
  color: ${({ theme }) => theme.successColor[0]};
  padding: 0.2em;
  border: 1px solid ${({ theme }) => theme.boxShadowLight};
  border-radius: 30%;
  z-index: 0;
`;

const ProgressBar = ({
  progress = 0,
  showAnswers = false,
  quizQuestions = 0,
  numCorrectAnswers = [],
}) => {
  // const calcProgress = () => Math.round((progress / quizQuestions) * 100);
  const calcProgress = () => `${progress} / ${quizQuestions}`;

  const [lines, setLines] = useState([
    { character: '-', lineColor: 'inherit' },
  ]);
  useEffect(() => {
    if (progress === 0)
      return setLines(
        numCorrectAnswers.map(() => ({
          character: <ReactIcon size="2em" />,
          lineColor: 'inherit',
        }))
      );
    numCorrectAnswers.map((answer, answerIdx) => {
      if (answer === 1) {
        setLines((prev) =>
          prev.map((line, lineIdx) => {
            if (lineIdx === answerIdx)
              return {
                character: !showAnswers ? <QuestionIcon /> : <BoneIcon />,
                lineColor: showAnswers ? 'inherit' : 'inherit',
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
                lineColor: showAnswers ? 'inherit' : 'inherit',
              };
            return line;
          })
        );
      }
      return answer;
    });
  }, [numCorrectAnswers, progress, showAnswers]);

  const { completed } = {
    completed: calcProgress(),
  };

  return (
    <section className="progress-bar">
      <h3>{`Progress: ${completed}`}</h3>
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
