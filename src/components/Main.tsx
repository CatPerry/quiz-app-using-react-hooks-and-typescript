import React, { FunctionComponent, useEffect, useState } from 'react';

import * as Models from './../models';
import Card from './Card';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse[]; }> = ({ initial = {} }) => {
  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const res = await fetch('https://opentdb.com/api.php?amount=10&type=boolean');
    res.json()
      .then((res) => setQuizzes(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buttonClick = (): void => {
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

            <button type='submit' className='Button' onClick={() => buttonClick()}>Get Started!</button>
          </div>
        </>
      ) : <Card quizQuestions={quizzes} />}
    </main>
  );
};

export default MainContainer;