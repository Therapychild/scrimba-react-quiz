import React, { useEffect, useState } from "react";
import { QuestionBox } from "./QuestionBox";

export function Quiz(props) {
  const { data, setMode } = props;
  const [ check, setCheck ] = useState(false);

  const boxes = data.map((item, index) => {
    const { answers, correct_answer, id, question} = item;

    return(
      <QuestionBox 
        answers={answers}
        correctAnswer={correct_answer}
        id={id}
        key={index}
        question={question}
        check={check}
      />
    )
  })  

  function checkAnswers() {
    setCheck(true);
  }

  return (
    <main className="main-quiz">
      {boxes}
      <button
        className="quiz-btn"
        onClick={() => {
          check ? setMode() : checkAnswers();
        }}
      >
        {check ? "Reset Quiz" : "Check Answers"}
      </button>
    </main>
  )
}