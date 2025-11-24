import { useEffect, useRef, useCallback, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) base += "0123456789";
    if (characterAllowed) base += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let temp = "";
    for (let i = 0; i < length; i++) {
      temp += base.charAt(Math.floor(Math.random() * base.length));
    }
    setPassword(temp);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 bg-gray-950 text-white">
      <h1 className="text-4xl font-bold mb-6">Password Generator</h1>

      <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-6">
        {/* Password Display */}
        <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="w-full px-3 py-2 outline-none bg-gray-800"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 text-sm">

          {/* Length Slider */}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer w-full"
            />
            <span className="text-orange-400 font-semibold">
              {length}
            </span>
          </div>

          {/* Number Allowed */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="includeNumbers"
            />
            <label htmlFor="includeNumbers">Include Numbers</label>
          </div>

          {/* Character Allowed */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              id="includeCharacters"
            />
            <label htmlFor="includeCharacters">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
