import React, { useState } from "react";
import "./App.css";

type Questions = Array<{
    answerType: "value",
    question: string,
    answer: number,
}>

function App () {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: Questions = [
    {
      answerType: "value",
      question: "What was the number of whales killed worldwide in 1960?",
      answer: 79464
    },
    {
      answerType: "value",
      question: "What was the number of whales killed worldwide in 1961?",
      answer: 1234
    }
  ];
  const question = questions[currentQuestion % questions.length];

  return (
      <div className="App">
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
                    <input
                        onClick={() => {
                          setCurrentQuestion(currentQuestion + 1);
                          setShowAnswer(false);
                        }}
                        type="button"
                        value="Next"
                    />
                </div>
                : null}
          </div>
      </div>
  );
}

export default App;
