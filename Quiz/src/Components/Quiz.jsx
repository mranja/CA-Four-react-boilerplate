import React, { useState } from "react";
import "../App.css";
import questions from "../questions";

function Quiz() {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isDark, setisDark] = useState(false);
  const [highlightedQuestion, setHighlightedQuestion] = useState(null);
  const [isQuestionHighlighted, setIsQuestionHighlighted] = useState(false);

  const divStyle = {
    backgroundColor: isDark ? "black" : "white",
  };

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setHighlightedQuestion(null);
      setIsQuestionHighlighted(false);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setHighlightedQuestion(null);
    setIsQuestionHighlighted(false);
  };

  const themeChange = () => {
    setisDark(!isDark);
  };

  const highlightQuestion = () => {
    setHighlightedQuestion(currentQuestion);
    setIsQuestionHighlighted(!isQuestionHighlighted);
  };

  const textStyle = {
    color: isDark ? "white" : "darkblue",
    transition: "color 0.3s ease-in-out",
    backgroundColor: isQuestionHighlighted ? "#ffcc00" : "transparent",
  };

  const questionCardStyle = {
    borderColor: highlightedQuestion === currentQuestion ? "#ffcc00" : "#ccc",
    backgroundColor: isQuestionHighlighted ? "#ffcc00" : "transparent",
  };

  return (
    <div className="App" style={divStyle}>
      <h1 style={{ ...textStyle, backgroundColor: "transparent" }}> Quiz </h1>

      <h2 style={{ ...textStyle, backgroundColor: "transparent" }}>Score: {score}</h2>

      {showResults ? (
        <div className="results">
          <h1>Final Results</h1>
          <h2>
            {score} / {questions.length} correct
          </h2>
          <button className="restart" onClick={() => restartGame()}>
            Restart game
          </button>
        </div>
      ) : (
        <div>
          <div className={`question-card ${highlightedQuestion === currentQuestion ? 'highlighted' : ''}`} style={questionCardStyle}>
            <h2 style={{ ...textStyle, backgroundColor: "transparent" }}>
              Question: {currentQuestion + 1} / {questions.length}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].text}</h3>
          </div>
          <ul>
            {questions[currentQuestion].options.map((option) => (
              <li
                key={option.id}
                onClick={() => optionClicked(option.isCorrect)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="theme" onClick={themeChange}>
        Theme
      </button>
      <button className="highlight" onClick={highlightQuestion}>
        {isQuestionHighlighted ? "Unhighlight" : "Highlight"}
      </button>
    </div>
  );
}

export default Quiz;
