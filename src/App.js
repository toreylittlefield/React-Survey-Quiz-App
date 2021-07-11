import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useFetch from './Api/useFetch';
import { Loading } from './Components/';

const bodyStyles = {
  margin: 0,
  overFlow: 'hidden',
};

const ContainerWrapper = styled.div`
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0;
  ${({ isloading }) => (isloading ? 'height: 100vh' : '')};
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

  const calcProgress = () =>
    Math.round((progress.length / quizQuestions.length) * 100);

  const testData = { bgcolor: '#6a1b9a', completed: calcProgress() };

  return (
    <div className="App" style={bodyStyles}>
      <ContainerWrapper isloading={loading}>
        {isError && <div>{errorMessage.toString()}</div>}
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {/* Vocab Quiz Title Section */}
            <section>
              <header>
                <h2>Example Vocabulary Quiz</h2>
              </header>

              {/* Progress Bar */}
              <div>
                <h3>{`Progress: ${calcProgress()}%`}</h3>
                <div>Updating the progress</div>
                <div style={{ width: 100 }}>
                  <ProgressBar
                    bgcolor={testData.bgcolor}
                    completed={testData.completed}
                  />
                </div>
              </div>
              {/* End Progress Bar */}
            </section>
            {/* End Vocab Quiz Title Section */}
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
            <button
              disabled={!data.length}
              onClick={() => setShowAnswers(true)}
            >
              Submit
            </button>
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

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 10,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};
