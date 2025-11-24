import { useState } from "react";

function App() {
  const [color, setColor] = useState("black");
  return (
    <>
      <div className="h-screen w-full" style={{ backgroundColor: color }}>
        <div className="w-full fixed bottom-12 inset-x-0 flex flex-wrap items-center justify-center gap-4 px-4">
          <button
            className="px-4 py-2 rounded text-white bg-red-500"
            onClick={() => setColor("red")}
          >
            Red
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-blue-500"
            onClick={() => setColor("blue")}
          >
            Blue
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-green-500"
            onClick={() => setColor("green")}
          >
            Green
          </button>
          <button
            className="px-4 py-2 rounded text-black bg-yellow-400"
            onClick={() => setColor("yellow")}
          >
            Yellow
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-purple-600"
            onClick={() => setColor("purple")}
          >
            Purple
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-pink-500"
            onClick={() => setColor("pink")}
          >
            Pink
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-orange-500"
            onClick={() => setColor("orange")}
          >
            Orange
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-black"
            onClick={() => setColor("black")}
          >
            Black
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
