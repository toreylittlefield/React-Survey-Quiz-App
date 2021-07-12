import React from 'react';

const QuizChoices = ({
  id,
  choices,
  correctChoiceIndex,
  quizIdx,
  showAnswers,
  setNumberCorrectAnswers,
  numCorrectAnswers,
  setProgress,
  choicesSelected,
  setchoicesSelected,
}) => {
  return (
    <React.Fragment>
      {choices.map((choice, choiceIdx) => (
        <div key={id + choice.text}>
          <label>
            <input
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
            {choice.text}
          </label>
        </div>
      ))}
    </React.Fragment>
  );
};

export default QuizChoices;
