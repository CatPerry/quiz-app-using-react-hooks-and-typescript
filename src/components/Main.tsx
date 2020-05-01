import React, { FunctionComponent, useEffect, useState } from 'react';

import * as Models from './../models';
import Card from './Card';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse; }> = ({ initial }) => {
  // Below is one way state is set using React Hooks, where the first deconstructed variable`quizzes` is the state variable name 
  // and `setQuizzes` is the methodName called to update the quizzes state if needed. Here, use it after the data is fetched successfully. 
  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=boolean');
    res.json()
      .then((res) => setQuizzes(res))
      .catch((err) => console.log(err));
  };

  // useEffect is a React hook equivalent to React Lifecycle Method (RLM) componenDidMount() among other RLMs
  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (): void => {
    setShouldShowCards(true);
  };

  return (
    <main className='Main'>
      {!shouldShowCards ? (
        <>
          <h2>Welcome to the Trivia Challenge!</h2>
          <div className='StartEndCard'>
            <h2>You will answer 10 of the most rando true or false questions</h2>
            <p>Can you score 10/10?</p>

            <button type='submit' className='Button' onClick={() => handleButtonClick()}>Get Started!</button>
          </div>
        </>
      ) : <Card quizQuestions={quizzes} />}
    </main>
  );
};

export default MainContainer;
