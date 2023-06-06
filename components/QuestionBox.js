import React from "react";
import { AnswerRadio } from "./AnswerRadio";

export function QuestionBox(props) {
  const { check, handleAnswered, data} = props;
  const {answers, correct_answer, id, isAnswered, question } = data;

  // Create the radio groups and assign a border and backgroud color
  // when checking for correct answers.
  const radios = answers.map((answer, index) => {
    const correct = answer === correct_answer;
    const bgColor = 
      check && isAnswered && isAnswered === answer && correct ? "correct" :
      check && isAnswered && isAnswered !== answer && correct ? "actual" :
      check && isAnswered && isAnswered === answer && !correct ? "incorrect" :
      "";

    return (
      <AnswerRadio
        correct={correct}
        key={index}
        name={id}
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
        onChange={(e) => handleAnswered(e.target.value, data)}
      >
        {radios}
      </div>
    </div>
  )
}