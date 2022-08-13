import React, { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import questions from "./questions.json";

function App () {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = questions[currentQuestion % questions.length];

  return (
      <div className="App">
          <Header/>
          <Question {...question} showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
          <Footer onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
            setShowAnswer(false);
          }}/>
      </div>
  );
}

export default App;
