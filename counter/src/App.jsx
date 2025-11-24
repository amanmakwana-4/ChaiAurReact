import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
    const add = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }
  const sub = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0))
    setCount(prev => (prev > 0 ? prev - 1 : 0))
  }
  return (
    <>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={add}>Add</button>
      <button onClick={sub}>Subtract</button>
    </>
  )
}

export default App
