import React, { useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import questions from "./questions.json";

// via https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function App () {
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const shuffledQuestions = shuffle(questions)

  const question = shuffledQuestions[currentQuestion % shuffledQuestions.length];

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
