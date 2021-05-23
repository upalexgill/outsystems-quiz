import React, { FunctionComponent, useEffect, useState } from 'react';
import { request } from 'graphql-request';
import * as Models from '../models';
import Card from './Card';
import './App.scss';
import './Main.scss';

const MainContainer: FunctionComponent<{ initial?: Models.QuizResponse; }> = ({ initial }) => {
  const [quizzes, setQuizzes] = useState(initial);
  const [shouldShowCards, setShouldShowCards] = useState(false);

  const fetchData = async (): Promise<void> => {
    const { quizzes } = await request(
      'https://api-eu-central-1.graphcms.com/v2/ckovui0ee9ux901xg7pjyek3t/master',
      `
    {
      quizzes {
        id
        category
        difficulty
        question
        correctAnswer
        incorrectAnswers
      }
    }
  `
    );

    setQuizzes({
      results: quizzes
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (): void => {
    setShouldShowCards(true);
  };

  return (
    <main className='main'>
      {!shouldShowCards ? (
        <>
          <div className="card">
            <div className="card-body">
              <h2>OutSystems Quiz</h2>
              <h3>Associate Web Developer Certification</h3>
              <button type='submit' className='btn btn-lg btn-primary mt-4' onClick={() => handleButtonClick()}>Get Started!</button>
            </div>
          </div>
        </>
      ) : <Card quizQuestions={quizzes} />}
    </main>
  );
};

export default MainContainer;
