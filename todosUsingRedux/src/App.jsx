import { useDispatch, useSelector } from 'react-redux'
import { fetchTodo } from './features/todosSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { isLoading, data, isError } = useSelector(state => state.todo)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="App">
      <button onClick={() => dispatch(fetchTodo())}>
        Fetch Todos
      </button>

      <ul>
        {data?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
