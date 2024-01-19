import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [allowNum, setallowNum] = useState(false);
  const [allowChar, setallowChar] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNum) str += "0123456789";
    if (allowChar) str += "~!@#$%&*_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowNum, allowChar, setPassword]);

  const copyPasswordClipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNum, allowChar, passwordGenerator]);

  return (
    <>
      <div className="w-full shadow-md rounded-lg px-8 py-2 my-6 text-orange-500 bg-slate-600">
        <h1 className="text-white text-center text-lg my-3">Captcha</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-6"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
            className="outline-none bg-orange-600 text-white px-3 py-0.5 shrink-0 text-sm hover:bg-sky-700"
            onClick={copyPasswordClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-100 h-1"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={allowNum}
              id="numberInput"
              onChange={() => {
                setallowNum((prevValue) => !prevValue);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={allowChar}
              id="charInput"
              onChange={() => {
                setallowChar((prevValue) => !prevValue);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
