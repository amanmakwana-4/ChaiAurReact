import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"
function App() {
  return (
    <>
      <div className="w-full bg-gray-900 h-screen py-10 px-100 justify-center items-center">
      <h1>Learn Redux Toolkit- with Todos</h1>
      <div className="flex justify-center items-center">
        <AddTodo />
        </div>
         <Todos />
      </div>
    </>
  )
}

export default App
