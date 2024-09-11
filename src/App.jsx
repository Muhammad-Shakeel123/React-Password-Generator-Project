import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [charterAllowed, setCharactersAllowed] = useState(false);
  const [numbersAllowed, setNummbersAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerators = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numbersAllowed) string += '0123456789';
    if (charterAllowed) string += '!@#$%^&*(){}|~';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setPassword(pass);
  }, [length, charterAllowed, numbersAllowed, setPassword]);

  useEffect(() => {
    passwordGenerators();
  }, [length, charterAllowed, numbersAllowed, setPassword]);

  const copyPasswordText = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Password Generator
          </h1>

          {/* Generated Password */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              className="w-full p-4 rounded-l-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              placeholder="Generated Password"
              readOnly
              value={password}
              ref={passwordRef}
            />
            <button
              className="bg-indigo-500 text-white p-4 rounded-r-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400"
              onClick={copyPasswordText}
            >
              Copy
            </button>
          </div>

          {/* Length Slider */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="100"
              value={length}
              onChange={e => setLength(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Checkbox for Numbers */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNummbersAllowed(prev => !prev)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
            />
            <label className="ml-3 text-gray-700">Include Numbers</label>
          </div>

          {/* Checkbox for Special Characters */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charterAllowed}
              onChange={() => setCharactersAllowed(prev => !prev)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
            />
            <label className="ml-3 text-gray-700">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
