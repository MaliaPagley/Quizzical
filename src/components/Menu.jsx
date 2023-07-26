import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Contexts"
function Menu() {
    const { gameState, setGameState } = useContext(QuizContext)
    return (
        <div className="Menu">
            <h1>Quizzical</h1>
            <p>I am Menu</p>
            <button onClick={() => {setGameState("quiz")}}>Start Quiz</button>
        </div>
    )
}

export default Menu