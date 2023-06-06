import React, { useState } from "react";
import { QuestionBox } from "./QuestionBox";

export function Quiz(props) {
  const { data, handleAnswered, setData, setMode } = props;
  const [ check, setCheck ] = useState(false);

  const boxes = data.map((item, index) => {
    return(
      <QuestionBox 
        key={index}
        check={check}
        handleAnswered={handleAnswered}
        data={item}
      />
    )
  })  

  // If any question object does not have an assignes answer,
  // throw an alert. Otherwise set check to true;
  function checkAnswers() {
    if(data.find(item => item.isAnswered === null)) {
      alert("One or more of your questions requires an answer");
    } else {
      setCheck(true);
    }
  }

  function reset() {
    setMode();
    setData();
  }

  return (
    <main className="main-quiz">
      {boxes}
      <button
        className="quiz-btn"
        onClick={() => {
          check ? reset() : checkAnswers();
        }}
      >
        {check ? "Reset Quiz" : "Check Answers"}
      </button>
    </main>
  )
}