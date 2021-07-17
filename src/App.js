import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useFetch from './Api/useFetch';

import {
  Body,
  Loading,
  ProgressBar,
  QuizTitle,
  QuizItems,
  QuizChoices,
  Button,
} from './Components/';

const stylesHidden = `
  height: 100vh;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0;
  ${({ isloading }) => (isloading ? stylesHidden : '')};
`;

function App() {
  const [data, loading, { isError, errorMessage }] = useFetch();

  useEffect(() => {
    if (!data.length) return;
    const wrapper = async () => {
      setQuizQuestions(data);
      setchoicesSelected(data.map((quiz) => ({ [`quizid${quiz.id}`]: null })));
      setNumberCorrectAnswers(Array.from(data).fill(-1));
      setCorrectAnswers(
        data.map((quiz) => {
          return {
            [`quizid${quiz.id}`]: quiz.choices[quiz.correctChoiceIndex].text,
          };
        })
      );
    };
    wrapper();
  }, [data]);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [choicesSelected, setchoicesSelected] = useState([{}]);
  const [numCorrectAnswers, setNumberCorrectAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([{}]);
  const [progress, setProgress] = useState([]);

  const handleCalcScore = () =>
    numCorrectAnswers.reduce((acc, val) => {
      if (val === -1) {
        return acc;
      }
      return acc + val;
    }, 0);

  const props = {
    showAnswers,
    setNumberCorrectAnswers,
    numCorrectAnswers,
    progress,
    setProgress,
    choicesSelected,
    setchoicesSelected,
  };

  return (
    <Body className="App">
      <ContainerWrapper isloading={loading}>
        {isError && <div>{errorMessage}</div>}
        {loading ? (
          <Loading loading={loading}></Loading>
        ) : (
          <React.Fragment>
            <nav
              style={{ backgroundColor: 'black', height: 80, width: '100%' }}
            ></nav>
            <QuizTitle title="Quiz Title">
              <ProgressBar
                showAnswers={showAnswers}
                progress={progress.length}
                quizQuestions={quizQuestions.length}
                numCorrectAnswers={numCorrectAnswers}
              />
            </QuizTitle>

            {/* Quiz Items */}
            <QuizItems {...{ quizQuestions, ...props }}>
              <QuizChoices />
            </QuizItems>
            {/* End Quiz Items */}

            {/* Submit Button */}
            <Button
              disabled={!data.length || showAnswers}
              onClick={() => setShowAnswers(true)}
              hideButton={showAnswers}
            >
              Submit
            </Button>

            {/* Button To Clear & Try Again */}
            <Button
              hideButton={!showAnswers}
              color="white"
              onClick={() => {
                setShowAnswers(false);
                setProgress([]);
                setchoicesSelected(
                  choicesSelected.map((quiz) => {
                    const [key] = Object.entries(quiz).flat(2);
                    return (quiz[key] = { [key]: null });
                  })
                );
                setNumberCorrectAnswers(Array.from(numCorrectAnswers).fill(-1));
              }}
            >
              Try Again
            </Button>
            {/* End Quiz Item */}
            {/* Show Answers & Display User Answers */}
            {showAnswers && (
              <div>
                <div>
                  <ul>
                    {choicesSelected.map((quiz, questionNum) => {
                      const quizId = Object.keys(quiz);
                      const userAnswer = quiz[quizId];
                      return (
                        <li key={quizId}>
                          <h4>
                            {`Your answer to question ${questionNum + 1}: ${
                              quizQuestions[questionNum].choices[userAnswer]
                                ?.text || `Did not answer`
                            }`}
                          </h4>
                          <h5>
                            {`The correct answer is: ${correctAnswers[questionNum][quizId]}`}
                          </h5>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3>
                    {`Your Score: ${handleCalcScore()}/${
                      numCorrectAnswers.length
                    }`}
                  </h3>
                  <div>
                    <h4>Snarky Comment:</h4>
                    <p>
                      {handleCalcScore() === quizQuestions.length
                        ? 'Congrations A Perfect Score... Ever considered getting a life?'
                        : handleCalcScore() === 0
                        ? 'You Need To Try Harder! Time to pick up a book!'
                        : 'NOT PERFECT AT ALL...  '}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* End Show Answers & Display User Answers */}
          </React.Fragment>
        )}
      </ContainerWrapper>
    </Body>
  );
}

export default App;
