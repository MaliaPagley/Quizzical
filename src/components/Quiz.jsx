import React from 'react'
import { nanoid } from 'nanoid'
import he from 'he' 

function Quiz(props) {
    let question = props.quizData.question
    let answers = props.quizData.answers
   
    function handleClick(answer){
        if (props.quizData.checked){
          return
        }
        props.handleClickAnswer(props.id, answer)
      }

    
    const answersElement = answers.map(answer => {
        let id = null
            if(props.quizData.checked) {
                if(props.quizData.correct === answer) {
                    id = 'correct'
                } else if(props.quizData.selected === answer) {
                    id = 'incorrect'
                } else {
                    id = 'incorrect'
                }
            }
            return (
                <button
                    key={nanoid()}
                    id={id}
                    className={answer === props.quizData.selected ?
                    'selectedStyle' : 'unselectedStyle'}
                        onClick={() => handleClick(answer)}
                   >
                {he.decode(answer)}
                </button>
            )
    })
    
    return (
        
            <div className="Quiz">  
                <h1>
                    {he.decode(question)}
                </h1>
                <div className="quiz-options">
                    {answersElement}
                </div>
                <div class="line"></div>
            </div>
           
       
     
    ) 
}
export default Quiz