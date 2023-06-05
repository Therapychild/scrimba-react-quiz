import React, {useState} from "react";

export function Setup(props) {
  const { amount, getQuestions, handleAmount, handleDifficulty } = props;

  return(
    <main>
      <section className="section-setup">
        <h1>Quizzical</h1>
        <h6>Because knowing useless information might just land you a date!</h6>
      </section>
      <section className="section-setup">
        <h6>Number of questions (50 max): </h6>
        <input 
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmount}
          className="input-amount"
        />
      </section>
      <section className="section-setup">
        <h6> Select a difficulty: </h6>
        <select name="difficulty" className="select-difficulty" onChange={handleDifficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </section>
      <section className="section-setup">
        <button
          onClick={getQuestions}
        >
          Start Quiz
        </button>
      </section>
    </main>
  )
}