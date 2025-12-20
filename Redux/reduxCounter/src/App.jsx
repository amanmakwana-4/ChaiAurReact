import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increaseValue,decrementValue,increaseByAmt,decreaseByAmt,resetValue } from './features/counterFeatures/counterSlice'
function App() {
  const count = useSelector((state)=>state.counter.value)
  const [amount,setAmount]=useState(0)
  const dispatch = useDispatch()
  function handleSubmitIncrement(){
    dispatch(increaseValue())
  }
  function handleSubmitDecrement(){
    dispatch(decrementValue())
  }
  function handleReset(){
    dispatch(resetValue())
  }
  function handleIncAmountClick(){
    dispatch(increaseByAmt(amount))
  }
  function handleDecAmountClick(){
    dispatch(decreaseByAmt(amount))
  }
  return (
  <>
    <div className="counter-container">
      <h1 className="counter-title">
        Value: <span className="counter-value">{count}</span>
      </h1>

      <div className="button-group">
        <button onClick={handleSubmitIncrement}>Increment</button>
        <button onClick={handleSubmitDecrement}>Decrement</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      <div className="amount-section">
        <input
          type="number"
          value={amount}
          placeholder="Enter Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <div className="amount-buttons">
          <button onClick={handleIncAmountClick}>+ Amount</button>
          <button onClick={handleDecAmountClick}>- Amount</button>
        </div>
      </div>
    </div>
  </>
)

}

export default App
