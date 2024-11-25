import { useState } from 'react'
import './App.css'

function App() {
  const [correctAnswer] = useState(1);
  const [feedback, setFeedback] = useState();
  function isCorrectAnswer(answer){
    return parseInt(answer) === correctAnswer;
  }
  
  function processAnswer (event){
    const userAnswer = parseInt(event.target.value)
    let result = isCorrectAnswer(userAnswer)
    console.log(result);
    if (result == true) {
      setFeedback("Correct")
    }else{
      setFeedback("Incorrect")
    }
    
  
  }


  return (
    <>
    
    <h1>Choose the correct Answer</h1>
    {feedback == "Correct" ? (
      <h2 className='right'>Right</h2>

    ) : (
      <h2 className='wrong'>Wrong</h2>

    ) }
     
    <div className='buttons'>
      <button className='button1' onClick={processAnswer} value={1}>1</button>
      <button onClick={processAnswer} value={2}>2</button>
      <button onClick={processAnswer} value={3}>3</button>
      </div>
    </>
  )
}

export default App
