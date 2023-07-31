import { useState, useContext, useEffect } from 'react'
import Menu from "./components/Menu"
import Quiz from "./components/Quiz"
import {nanoid} from 'nanoid'

import { QuizContext } from "./Helpers/Contexts"

function App() {
  const [gameState, setGameState] = useState("menu")
  const [questions, setQuestions] = useState([])
  const [count , setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(0)
 



  const shuffleAnswers = (arr) => arr.sort(() => Math.random() - 0.5);
  useEffect(() => {
    async function getQuizData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      const data = await res.json()
      let quizData = []
      data.results.forEach(question => {
        quizData.push({
          id: nanoid(), 
          answers:shuffleAnswers([...question.incorrect_answers, question.correct_answer]), 
          question:question.question, 
          correct:question.correct_answer, 
          selected: null, 
          checked:false})
      })
      setQuestions(quizData) // Pushes manipulated data to the empty array
    }
    getQuizData()
  },[count])

  function handleCheck(){
    let selected = true
    questions.forEach(question =>{
      if (question.selected === null){
        selected = false
        return
      }
    })
    if (!selected){
      return
    }
    setQuestions(questions => questions.map(question => {
      
      return {...question, checked:true}
    }))
    setChecked(true)
    let correct = 0
    questions.forEach(question =>{
      if (question.correct === question.selected){
        correct += 1
      }
    })
    setCorrect(correct)
  }
  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question =>{
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

  function handlePlayAgain(){
    setCount(count => count + 1)
    setChecked(false)

  }
 


  //Pushes props data to the Quiz 
  const questionElement = questions ? questions.map(question => {
    return <Quiz 
      quizData={question}
      key={question.id}
      id={question.id}
      handleClickAnswer={handleClickAnswer}
    />
  }) : [] 

  return (
   <div className="App">
      {/* Using useContext*/}
      <QuizContext.Provider value={{gameState, setGameState}}>
        {gameState === "quiz" && <h1 className="topic">Topic: Computer Science</h1>}
        {gameState === "menu" && <Menu />}
        {gameState === "quiz" && questionElement}
        {gameState === "quiz" && <button className="answers-checked-btn" onClick={checked ? handlePlayAgain : handleCheck}>{checked ? 'Play Again' : 'Check Answer'}</button>}
      </QuizContext.Provider>  
      {checked && <span className='score'>You scored {correct}/5 correct answers</span>}
      
   </div>
  )
}

export default App
