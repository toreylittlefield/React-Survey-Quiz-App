import React from 'react';
import styled, { css } from 'styled-components';

const RadioLabelText = styled.span`
  line-height: 1;
  transition: 180ms all ease-in-out;
  opacity: 0.85;
`;

const RadioController = styled.span`
  display: block;
  width: 0.75em;
  height: 0.75em;
  border-radius: 50%;
  border: 0.1em solid currentcolor;
  transform: translateY(0.2em);
`;

const showAnswerBackground = css`
  ${({ theme, showAnswers, isAnswer }) => {
    if (!showAnswers) return;
    if (isAnswer) {
      return css`
        border: 1px double ${theme.successColor[2]};
        border-radius: 5px;
        color: ${theme.successColor[0]};
      `;
    }
    return css`
      /* border: 1px solid red; */
    `;
  }}
`;

const CustomLabel = styled.label`
  ${showAnswerBackground}
  padding: 0.5em;
  margin: 0.5em;
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  overflow-wrap: break-word;
  &:focus-within {
    ${RadioLabelText} {
      transform: scale(1.05) translateX(2.5%);
      opacity: 1;
    }
  }

  & input:checked + ${RadioController} {
    background: radial-gradient(currentColor 35%, rgba(255, 0, 0, 0) 0%);
  }
`;

const CustomInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:focus + ${RadioController} {
    box-shadow: 0 0 0 0.05em currentColor, 0 0 0.15em 0.1em currentcolor;
  }
`;

const RadioInputSpan = styled.span`
  display: flex;
`;

const ChoicesWrapper = styled.div`
  display: flex;
  margin-top: 0.25em;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const QuizChoices = ({
  id = 0,
  choices = [],
  correctChoiceIndex = 0,
  quizIdx = 0,
  showAnswers = false,
  setNumberCorrectAnswers = () => {},
  numCorrectAnswers = [],
  setProgress = [],
  choicesSelected = [{}],
  setchoicesSelected = () => {},
}) => {
  const handleAnswer = (choiceIdx, correctAnswerIndex) => {
    if (choiceIdx === correctAnswerIndex) {
      console.log({ choiceIdx, correctAnswerIndex });
      return true;
    }
    return false;
  };

  return (
    <ChoicesWrapper>
      {choices.map((choice, choiceIdx) => (
        <CustomLabel
          key={id + choice.text}
          isAnswer={handleAnswer(choiceIdx, correctChoiceIndex)}
          showAnswers={showAnswers}
        >
          <RadioInputSpan>
            <CustomInput
              name={id}
              type="radio"
              value={choice.text}
              disabled={showAnswers}
              onClick={() => {
                setNumberCorrectAnswers(
                  numCorrectAnswers.map((answer, answerIdx) => {
                    if (answerIdx === quizIdx) {
                      return choiceIdx === correctChoiceIndex ? 1 : 0;
                    }
                    return answer;
                  })
                );
                setProgress((prev) => {
                  if (choicesSelected[quizIdx][`quizid${id}`] === null) {
                    return prev + 1;
                  }
                  return prev;
                });
                setchoicesSelected(
                  choicesSelected.map((quiz) => {
                    const quizId = Object.keys(quiz).toString();
                    const currentId = `quizid${id}`;
                    if (quizId === currentId) {
                      return {
                        [`quizid${id}`]: choiceIdx,
                      };
                    }
                    return quiz;
                  })
                );
              }}
            />
            <RadioController />
          </RadioInputSpan>
          <RadioLabelText>{choice.text}</RadioLabelText>
        </CustomLabel>
      ))}
    </ChoicesWrapper>
  );
};

export default QuizChoices;
