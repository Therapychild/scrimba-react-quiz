import React, {useState} from "react";
import { Setup } from "./components/Setup";
import { Quiz } from "./components/Quiz";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

// Fisher Yates Shuffle function
function fisherYates(array){
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
    if(i === 0) {
      newArray = fisherYates(array);
    } else {
      newArray = fisherYates(newArray);
    }
  }
  return newArray;
} 

export function App() {
  const [ mode, setMode ] = useState("setup");
  const [ data, setData ] = useState([]);
  const [ amount, setAmount ] = useState(10);
  const [ difficulty, setDifficulty ] = useState("easy");
  const [ category, setCategory ] = useState("all");

  // Fetch the questions from the api;
  function getQuestions() {
    console.log("calling");
    let request = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;

    if(category !== "all") {
      request += `&category=${category}`
    }
    if(difficulty !== "easy") {
      request += `&difficulty=${difficulty > 50 ? 50 : difficulty}`
    }

    fetch(request)
      .then(response => response.json())
      .then(data => {
        // Format the Data:
        //   - Decode question and answers.
        //   - Add an id field.
        //   - Create and shuffle an "answers" array.
        let formattedData = data.results.map(question => {
          question.answers = multiShuffle(question.incorrect_answers.map(answer => decode(answer)).concat(decode(question.correct_answer)));
          question.correct_answer = decode(question.correct_answer);
          question.question = decode(question.question);
          question.id = nanoid();

          return question
        });

        setData(formattedData);
      });
      
    setMode("quiz");
  }

  function handleAmount(e) {
    console.log(e.target.value)
    setAmount(e.target.value);
  }

  function handleDifficulty(e) {
    console.log(e.target.value)
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
    setMode={() => setMode("setup")}
    /> :
      <div>Hello</div>

  return display;
}