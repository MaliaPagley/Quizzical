import { useState, useContext, useEffect } from 'react'
import Menu from "./components/Menu"
import Quiz from "./components/Quiz"

import { QuizContext } from "./Helpers/Contexts"

function App() {
  const [gameState, setGameState] = useState("menu")

  return (
   <div className="App">
      {/* Conditional rendering for the display screens */}
      <QuizContext.Provider value={{gameState, setGameState}}>
        {gameState === "menu" && <Menu />}
        {gameState === "quiz" && <Quiz />}
      </QuizContext.Provider>
      
   </div>
  )
}

export default App
