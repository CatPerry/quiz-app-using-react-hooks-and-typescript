import _ from 'lodash';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  // Link,
  // Route,
  // Switch,
  // useRouteMatch
} from 'react-router-dom';

import * as Models from './../models';
import './Card.scss';

interface Props {
  quizQuestions: Models.Quiz[];
}

const Card = (props: any) => {
  const quizQuestions = _.get(props, 'quizQuestions.results', undefined);
  // Here is another way to set state using React Hooks. This is a neater approach than setting them individually like you'll see
  // in Main.tsx. Just set an object.
  const initialState = {
    currentIndex: 0,
    score: 0,
    showFinished: false,
    answered: false,
    selectedOption: '',
    revealAnswer: '',
  };
  
  // These two variable below can be called anything, but we'll name them `state` and `setState` for convention.
  const [state, setState] = useState(initialState);
  // These are variables that we'll refer to throughout this component, so we'll set them on state here. If there are variables you
  // are not referring to outside of the setState({}) funciton elsewhere, they dont need to be delcared here, but can be just set above.
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
    const renderAnswer: string = isCorrect ? 'Correct!' : 'Sorry, wrong answer!';

    setState({
      ...state,
      selectedOption: e.target.id.toString(),
      answered: isCorrect ? true : false,
      revealAnswer: renderAnswer
    });

    if (currentIndex + 1 > props.quizQuestions.results.length) {
      setState({ ...state, showFinished: true });
    } else {
      // delay for question auto-advance, to display 'Correct' or 'Incorrect' feedback
      setTimeout(() => {
        setState({ ...state, score: isCorrect ? score + 1 : score + 0, currentIndex: currentIndex + 1, revealAnswer: '' });
      }, 2000);
    }
  };

  const renderAnswer = (): React.ReactNode => {
    return (
      <>{revealAnswer}</>
    );
  };

  return (
    quizQuestions && (currentIndex < props.quizQuestions.results.length) ?
      <Router>

        <h2>{quizQuestions[currentIndex].category}</h2>
        <main className='Card'>
          <h1>{_.unescape(quizQuestions[currentIndex].question)}</h1>
          <div>Difficulty: {quizQuestions[currentIndex].difficulty}</div>
        </main>

        <section>
          <div className='Answer'>{renderAnswer()}</div>

          <form className='form'>
            <div className='inputGroup' role='radiogroup'>
              <label id='label' htmlFor='radioTrue' className='container'><input id='radioTrue' name='radio' type='radio' checked={selectedOption === 'True'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correct_answer)} />
              True<span className='checkmark'></span></label>
            </div>
            <div className='inputGroup' role='radiogroup'>
              <label id='label' htmlFor='radioFalse' className='container'><input id='radioFalse' name='radio' type='radio' checked={selectedOption === 'False'} onChange={(e) => handleChange(e, quizQuestions[currentIndex].correct_answer)} />
              False<span className='checkmark'></span></label>
            </div>
          </form>
        </section>

        <footer className='Badge'>
          Question {currentIndex + 1}/{quizQuestions.length}
        </footer>

      </Router>
      :
      <Router>
        <main className='Card'>
          <h3>
            You scored {score} / {quizQuestions.length}
          </h3>

          <button className='Button' type='reset' onClick={() => setState(initialState)}>
            Start Over
          </button>
        </main >
      </Router>
  );
};

export default Card;
