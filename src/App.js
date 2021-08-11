import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";

const fetcher = (repo) => {
  return fetch(`https://api.github.com/repos/${repo}`).then( res => res.json())
}

// function Button() {
//   const {data, error} = useQuery("hello-world", () => {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(Math.random()), 1000)
//     })
//   })
//   console.log({data, error})
//   return <button>I am a button {data}.</button>
// }

function App() {
  const [repoName, setRepoName] = useState('')

  // const {isLoading, data } = useQuery(["github-data", "facebook/react"], () => fetcher("facebook/react"))

  const {isLoading, data } = useQuery(["github-data", repoName], () => fetcher(repoName))

  if(isLoading){
    return <div className="App">
        <input type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
        <h2>Loading...</h2>
      </div>
    
  }


  return (
    <div className="App">
        <input type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
        <p>Name: {data.name}</p>
        <p>Description: {data.description}</p>
        <p>State: {data.stargazers_count}</p>
    </div>
  );
}

export default App;
