import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Domenico the fucking boss")
  function sayMiao(value) {
    console.log(message);
    setMessage(value.target.value)
    
  }
  
  return (
    <>
    
      <h1> {message}</h1>
      <input type="text" value={message} onChange={sayMiao}  />
      <br />
      <button onClick={sayMiao}>Click me</button>
      
    </>
  )
}

export default App
