import React, { useState } from "react";
import { AnswerRadio } from "./AnswerRadio";

export function QuestionBox(props) {
  const {answers, check, correctAnswer, id, question } = props;
  const [ selected, setSelected ] = useState("");

  const radios = answers.map((answer, index) => {
    const correct = answer === correctAnswer;
    const bgColor = 
      check && selected && selected === answer && correct ? "correct" :
      check && selected && selected !== answer && correct ? "actual" :
      check && selected && selected === answer && !correct ? "incorrect" :
      ""
    return (
      <AnswerRadio
        correct={correct}
        key={index}
        name={id}
        selected={selected}
        value={answer}
        className={bgColor}
      />
    )
  });

  return(
    <div className="question-box">
      <h5>{question}</h5>
      <div
        className="answers"
        onChange={(e) => setSelected(e.target.value)}
      >
        {radios}
      </div>
    </div>
  )
}