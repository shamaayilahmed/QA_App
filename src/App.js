import { useState, useEffect } from "react"
import axios from "axios"
import './assets/app.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [start, setStart] = useState(false)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(false)
  const [correct, setCorrect] = useState(0)

  // 1. CHECKS IF THE CLICKED OPTION IS CORRECT
  // 2. ALSO SETS THE SCORE AT END OF THE SESSION
  const handleClick = (isCorrect) => {
    if (isCorrect === questions[current].answer) {
      setCorrect(correct + 1)
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setScore(true)
    }
  }

  // RESTARTS THE Q&A, BY RESETTING STATE VALUES
  const restart = () => {
    setCurrent(0)
    setStart(!start)
    setCorrect(0)
    setScore(!score)
  }

  // REQUESTS THE DATA FROM THE SERVER THAT WE INITIALIZED ie, server.js
  const getQuestions = () => {
    axios.get("http://localhost:3000/qa").then((res) => {
      setQuestions(res.data)
    })
  }

  // LOADS DATA ONLY ONCE AFTER THE COMPONENT IS RENDERED
  useEffect(() => {
    getQuestions()
  }, [])

  // 1. SESSION STARTS ONLY WITH THE ACKNOWLEDGEMENT FROM USER AND WITH PRESENCE OF THE QUESTIONS
  // 2. RENDERS THE QUESTIONS UNTIL THERE IS A SCORE, WHICH IS ONLY SET WHEN CURRENT EXCEEDS THE QUESTIONS ARRAY LENGTH
  if (questions.length && start) {
    return (
      <main className="App">
        {score
          ? (<section>
            <div className='score'>
              You scored {correct} out of {questions.length}
            </div >
            <div className="back">
              <input type="submit" value="Take me back" onClick={restart} />
            </div>
          </section>)
          : (<section className="ui_box">
            <div className='question'>
              <div className='question-count'>
                <span>Question {current + 1}</span>/{questions.length}
              </div>
              <hr />
              <div className='question-text'>{questions[current].question}</div>
            </div>
            <div className='answers'>
              <button onClick={() => handleClick(questions[current].option_a)}>{questions[current].option_a}</button>
              <button onClick={() => handleClick(questions[current].option_b)}>{questions[current].option_b}</button>
              <button onClick={() => handleClick(questions[current].option_c)}>{questions[current].option_c}</button>
              <button onClick={() => handleClick(questions[current].option_d)}>{questions[current].option_d}</button>
            </div>
          </section>)
        }
      </main>
    )
  }

  // INITIAL RENDER FOR USER'S ACKNOWLEDGEMENT
  return (
    <main className="App">
      <section>
        <div className="start">
          <input type="submit" value="Start the Q&A" onClick={() => setStart(!start)} />
        </div>
      </section>
    </main>
  );

}

export default App;
