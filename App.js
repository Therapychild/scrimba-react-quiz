import React, { useState } from "react";
import { Setup } from "./components/Setup";
import { Quiz } from "./components/Quiz";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

// Fisher Yates Shuffle function
function fisherYates(array) {
  let i = array.length;
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [array[temp], array[i]] = [array[i], array[temp]];
  }
  return array;
};

function multiShuffle(array) {
  let newArray = []
  for (let i = 0; i < 3; i++) {
    if (i === 0) {
      newArray = fisherYates(array);
    } else {
      newArray = fisherYates(newArray);
    }
  }
  return newArray;
}

export function App() {
  const [mode, setMode] = useState("setup");
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  // Fetch the questions from the api with input from the user;
  function getQuestions() {
    let request = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

    if (difficulty !== "easy") {
      request += `&difficulty=${difficulty > 50 ? 50 : difficulty}`
    }

    fetch(request)
      .then(response => response.json())
      .then(data => {
        let isAnsweredObject = {}
        // Format the Data:
        //   - Decode question and answers.
        //   - Add an id field.
        //   - Create and shuffle an "answers" array.
        let formattedData = data.results.map(question => {
          question.answers = multiShuffle(question.incorrect_answers.map(answer => decode(answer)).concat(decode(question.correct_answer)));
          question.correct_answer = decode(question.correct_answer);
          question.question = decode(question.question);
          question.id = nanoid();
          question.isAnswered = null;

          return question
        });

        setData(formattedData);
      });

    setMode("quiz");
  }

  // Assign the selected answer to the question object;
  function handleAnswered(value, question) {
    let questionArray = []

    data.map(item => {
      if (item.id === question.id) {
        item.isAnswered = value;
        questionArray.push(item);
      } else {
        questionArray.push(item);
      }
    });

    setData(questionArray);
  }

  // Update the number of questions as requested by the user.
  function handleAmount(e) {
    setAmount(e.target.value);
  }

  // Update the difficulty of the questions as requested by
  // the user.
  function handleDifficulty(e) {
    setDifficulty(e.target.value);
  }

  const display =
    mode === "setup" ? <Setup
      amount={amount}
      handleAmount={handleAmount}
      handleDifficulty={handleDifficulty}
      getQuestions={getQuestions}
    /> :
      mode === "quiz" ? <Quiz
        data={data}
        setData={() => setData([])}
        setMode={() => setMode("setup")}
        handleAnswered={handleAnswered}
      /> :
        <div>Hello</div>

  return display;
}