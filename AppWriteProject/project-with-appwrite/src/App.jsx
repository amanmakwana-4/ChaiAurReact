

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
      <div className='w-full h-screen text 5xl bg-gray-900 flex justify-center'>
        <p className='text-4xl mt-8'>Hello  World</p>
      </div>
    </>
  )
}

export default App
