import React from 'react';
import Label from './Label';
import Container from './Container';
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

const scale = () => randomNumber(0.5, 0.5);

const fishKeyFrameGenerator = () => {
  const percentages = [...Array(20).keys()];
  const keyFrame = (
    percent = 0,
    translateX = 0,
    translateY = 0,
    rotate = 0,
    scaleX = 0,
    scaleY = 0,
    opacity = 1
  ) => `${percent}% {
    transform: translate(${translateX}vw, ${translateY}%) rotate(${rotate}deg) scale(${scaleX}, ${scaleY});
    opacity: ${opacity};
  }`;
  let lastKey = 0;
  let lastIndex = 0;
  let opacity = 1;
  return percentages.map((key, index) => {
    if (index === 0) {
      return keyFrame(key, key, -2, 0, 0, 0, 0.7);
    }
    if (index >= 10) {
      opacity = 0;
    }
    if (index === percentages.length - 1) {
      key = 100;
      return keyFrame(key, key, 450, 70, 0, 0, 0);
    } else {
      key *= 5;
      if (key >= 50) {
        key = (key / 2) * 4 - index;
      }
    }
    if (lastIndex === 0) {
      lastKey = key;
      lastIndex++;
      return keyFrame(
        key,
        key,
        70,
        randomNumber(1, 360),
        randomNumber(0.5, 0.3),
        randomNumber(0.5, 0.3),
        opacity
      );
    }
    if (lastIndex === 1) {
      lastIndex++;
      return keyFrame(
        lastKey + 1,
        lastKey + 1,
        randomNumber(1, 350),
        -90,
        2,
        2,
        opacity
      );
    }
    lastIndex = 0;
    return keyFrame(key, key, -350, -90, 2, 2, opacity);
  });
};

const fishKeyFrames = keyframes`
${fishKeyFrameGenerator()}
`;

const timing = () => randomNumber(2200, 8000, 1, 'ms');

const styleFish = css`
  animation: ${() => fishKeyFrames} ${timing} linear 800ms infinite;
`;

const FishIcon = styled(GiFishbone)`
  z-index: 0;
  ${styleFish};
  color: ${({ theme }) => theme.rejectColor[2]};
`;

const boneKeyFrames = keyframes`
    0% { transform: translate(-1vw, 0%) rotate(0deg) scale(1.5, 1.5);
      opacity: 1;
    }
    10% { transform: translate(-5vw, 0%) rotate(270deg) scale(3, 3);
      opacity: 1;
    }
    33% { 
      transform: translate(10vw, -300%) rotate(1080deg) scale(${
        scale() + 0.55 + 1
      }, ${scale() - 0.45 + 1}); 
    }
    48% {
      transform: translate(25vw, -100%) rotate(360deg) scale(${
        scale() - 0.05 + 1
      }, ${scale() + 0.4 + 1});
    }
    66% { 
      transform: translate(35vw, -300%) rotate(1080deg) scale(2, 2);
      opacity: 1;
    }
    77% {
      transform: translate(40vw, -50%) rotate(720deg) scale(2, 2);
      opacity: .5; 
    }
    82% {
      transform: translate(45vw, -150%) rotate(360deg) scale(1.3, 1.3);
      opacity: 0; 
    }
    87% {
      transform: translate(55vw, -100%) rotate(720deg) scale(.75, 0.75);
      opacity: 0; 
    }

    100% { 
      opacity: 0;
    }
`;

const styleBone = css`
  animation: ${() => boneKeyFrames} ${timing} linear 1500ms infinite;
`;

const BoneIcon = styled(FaBone)`
  ${styleBone};
  color: ${({ theme }) => theme.successColor[0]};
  padding: 0.2em;
  border: 1px solid ${({ theme }) => theme.boxShadowLight};
  border-radius: 30%;
  z-index: 0;
`;

const StyledSpan = styled.span`
  color: rgba(${({ theme }) => theme.primaryFontColorRGB}, 1);
`;

const FirstLetter = styled.span`
  ${({ totalScore }) => {
    if (totalScore) {
      return css`
        color: ${({ theme }) => theme.successColor[0]};
      `;
    }
    return css`
      color: ${({ theme }) => theme.rejectColor[3]};
    `;
  }}
`;

const ShowProgress = ({ completed = 0 }) => (
  <React.Fragment>
    {`Progress: `}
    <StyledSpan>{completed}</StyledSpan>
  </React.Fragment>
);
const ShowScore = ({ totalScore = 0, quizQuestions = 0 }) => (
  <React.Fragment>
    {`Total Score: `}
    <StyledSpan>
      <FirstLetter totalScore={totalScore}>{totalScore}</FirstLetter>{' '}
      <FirstLetter totalScore={totalScore}>{`/ `}</FirstLetter>
      <FirstLetter totalScore={totalScore}>{quizQuestions}</FirstLetter>
    </StyledSpan>
  </React.Fragment>
);

const ScoreBoardH3 = styled.h3`
  color: rgba(${({ theme }) => theme.primaryFontColorRGB}, 0.85);
  font-size: 1.25em;
`;

const ProgressBarContainer = styled.div`
  @media (max-width: 480px) {
    align-self: center;
  }
`;

const ProgressBar = ({
  progress = 0,
  showAnswers = false,
  quizQuestions = 0,
  numCorrectAnswers = [],
}) => {
  const calcScore = () =>
    numCorrectAnswers.reduce((acc, val) => {
      if (val === -1) {
        return acc;
      }
      return acc + val;
    }, 0);
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
                character: !showAnswers ? (
                  <QuestionIcon size="2em" />
                ) : (
                  <BoneIcon size="1.5em" />
                ),
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
                character: !showAnswers ? (
                  <QuestionIcon size="2em" />
                ) : (
                  <FishIcon size="1.5em" />
                ),
                lineColor: showAnswers ? 'inherit' : 'inherit',
              };
            return line;
          })
        );
      }
      return answer;
    });
  }, [numCorrectAnswers, progress, showAnswers]);

  const { completed, totalScore } = {
    completed: calcProgress(),
    totalScore: calcScore(),
  };

  return (
    <ProgressBarContainer className="progress-bar">
      <ScoreBoardH3>
        {showAnswers ? (
          <ShowScore {...{ totalScore, quizQuestions }} />
        ) : (
          <ShowProgress {...{ completed }} />
        )}
      </ScoreBoardH3>
      <Container>
        {lines.map((line, lineIdx) => (
          <Label key={lineIdx + line.lineColor} lineColor={line.lineColor}>
            {line.character}
          </Label>
        ))}
      </Container>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
