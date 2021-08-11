import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";



function Button() {
  const {data, error} = useQuery("hello-world", () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(Math.random()), 1000)
    })
  })
  console.log({data, error})
  return <button>I am a button {data}.</button>
}

function App() {
  const [visible, setVisible] = useState(true)

  function toggleButton() {
    setVisible(visible => !visible)
  }

  return (
    <div className="App">
      <header className="App-header">
      {visible && <Button />}
      <button onClick={toggleButton}>Toggle</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
