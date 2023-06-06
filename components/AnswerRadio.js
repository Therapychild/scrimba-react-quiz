import React from "react";

export function AnswerRadio(props) {
  const { className, name, value } = props;
  
  return(
    <label className={` answer ${className}`}>
      <input type="radio" name={name} value={value} />
      <div className="answer-text">{value}</div>
    </label>
  )
}