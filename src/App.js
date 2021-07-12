import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useFetch from './Api/useFetch';
import { Loading, ProgressBar, QuizTitle } from './Components/';

const bodyStyles = {
  margin: 0,
  overFlow: 'hidden',
};

const stylesHidden = `
  height: 100vh;
`;

const ContainerWrapper = styled.div`
  font-family: 'Ubuntu', sans-serif;
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
      setNumberCorrectAnswers(Array.from(data).fill(0));
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
    numCorrectAnswers.reduce((acc, val) => acc + val, 0);

  return (
    <div className="App" style={bodyStyles}>
      <ContainerWrapper isloading={loading}>
        {isError && <div>{errorMessage}</div>}
        {loading ? (
          <Loading loading={loading}></Loading>
        ) : (
          <React.Fragment>
            <QuizTitle title="Example Title Quiz">
              <ProgressBar
                progress={progress.length}
                quizQuestions={quizQuestions.length}
              />
            </QuizTitle>

            {/* Quiz Item */}
            {quizQuestions.map((quizQuestion = {}, quizIdx) => {
              const { id, word, choices, correctChoiceIndex } = quizQuestion;
              return (
                <section key={id + correctChoiceIndex} style={{ width: 300 }}>
                  <div>
                    <h2>{word}</h2>
                    {/* Quiz Questions */}
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
                                    return choiceIdx === correctChoiceIndex
                                      ? 1
                                      : 0;
                                  }
                                  return answer;
                                })
                              );
                              setProgress((prev) => {
                                if (
                                  choicesSelected[quizIdx][`quizid${id}`] ===
                                  null
                                ) {
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
                    {/* End Quiz Questions */}
                  </div>
                </section>
              );
            })}
            {/* Submit Answers Button */}
            <button
              disabled={!data.length}
              onClick={() => setShowAnswers(true)}
            >
              Submit
            </button>
            {/* End Submit Answers Button */}
            {/* Button To Clear & Try Again */}
            {showAnswers && (
              <button
                onClick={() => {
                  setShowAnswers(false);
                  setNumberCorrectAnswers(
                    Array.from(numCorrectAnswers).fill(0)
                  );
                  setchoicesSelected(
                    choicesSelected.map((quiz) => {
                      const quizId = Object.keys(quiz).toString();
                      return {
                        [`${quizId}`]: null,
                      };
                    })
                  );
                  setProgress([]);
                }}
              >
                Try Again
              </button>
            )}
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
    </div>
  );
}

export default App;
