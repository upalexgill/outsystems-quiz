import React, { useState } from 'react';
import * as Models from '../models';
import './Card.scss';
import _ from 'lodash';

interface Props {
  quizQuestions?: Models.QuizResponse;
}

const Card = (props: Props) => {
  const quizQuestions = _.get(props, 'quizQuestions.results', []);

  const initialState = {
    currentIndex: 0,
    score: 0,
    showFinished: false,
    answered: false,
    selectedOption: '',
    revealAnswer: '',
  };

  const [state, setState] = useState(initialState);

  const {
    currentIndex,
    score,
    revealAnswer,
    selectedOption,
  } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, correctAnswer: Models.Quiz): void => {
    e.persist();
    e.preventDefault();
    const isCorrect: boolean = e.target.id.includes(correctAnswer.toString()) ? true : false;
    const renderAnswer: string = isCorrect ? 'Correct!' : 'Incorrect';

    setState({
      ...state,
      selectedOption: e.target.id.toString(),
      answered: isCorrect ? true : false,
      revealAnswer: renderAnswer
    });

    if (currentIndex + 1 > quizQuestions.length) {
      setState({ ...state, showFinished: true });
    } else {
      setTimeout(() => {
        setState({ ...state, score: isCorrect ? score + 1 : score + 0, currentIndex: currentIndex + 1, revealAnswer: '' });
      }, 1000);
    }
  };

  const renderAnswer = (answered: any): React.ReactFragment => {
    return (
      <>
        <div className={`alert ${answered ? "alert-success" : "alert-danger"}`}>{revealAnswer}</div>
      </>
    );
  };

  return (
    quizQuestions && quizQuestions.length && ((currentIndex + 1) < quizQuestions.length) ?
      <div>
        {state.selectedOption ? renderAnswer(state.answered) : ``}
        <div className='card'>
          <div className='card-header'>
            {quizQuestions[currentIndex].category}
          </div>
          <div className='card-body'>
            <h2>{_.unescape(quizQuestions[currentIndex].question)}</h2>
            <div>Difficulty: {quizQuestions[currentIndex].difficulty}</div>
            <form className='form'>
              <div className='input-group' role='radiogroup'>
                <label htmlFor='radioTrue' className='custom-label'><input id='radioTrue' name='radio' type='radio' checked={selectedOption === 'True'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correctAnswer)} />
                True<span className='indicator'></span></label>
              </div>
              <div className='input-group' role='radiogroup'>
                <label htmlFor='radioFalse' className='custom-label'><input id='radioFalse' name='radio' type='radio' checked={selectedOption === 'False'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correctAnswer)} />
                False<span className='indicator'></span></label>
              </div>
            </form>
          </div>
          <div className='card-footer'>
            Question {currentIndex + 1}/{quizQuestions.length}
          </div>
        </div>
      </div>
      :
      <div>
        <main className='main'>
          <h2>You scored {score} / {quizQuestions.length}</h2>
          <button className='btn btn-lg btn-primary mt-4' type='reset' onClick={() => setState(initialState)}>
            Start Again?
          </button>
        </main >
      </div>
  );
};

export default Card;
