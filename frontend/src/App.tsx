import React, { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { Questions } from "./types";
import { Chart } from "./components/Chart";

function App () {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: Questions = [
    {
      answerType: "value",
      question: "What does a random squiggly line look like?",
      answer: [
        {
          year: 1900,
          value: 10
        },
        {
          year: 1950,
          value: 24
        },
        {
          year: 2000,
          value: 20
        }
      ]
    }
  ];
  const question = questions[currentQuestion % questions.length];

  return (
      <div className="App">
          <Header/>
          <Question {...question} showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
        <Chart datapoints={question.answer} />
          <div key={question.question}>
              {question.question}
          </div>
          <div>
              Your answer:
             <input type="text" />
              <input
                  onClick={() => setShowAnswer(true)}
                  type="button"
                  value="Guess"
              />
              {showAnswer
                ? <div>
                    Actual answer:
                    {question.answer}

                </div>
                : null}
          </div>
          <Footer onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
            setShowAnswer(false);
          }}/>
      </div>
  );
}

export default App;
