import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Post from "./Post"
import client from "./react-query-client"

const fetcher = url => fetch(url).then( res => res.json())


function App() {
  const { isLoading, data:posts } = useQuery('posts', () => fetcher('https://jsonplaceholder.typicode.com/posts'))

  const [postID, setPostID] = useState(null);

  if(isLoading){
    return <h2>Loading...</h2>    
  }

  // if(postID !== null){
  //   return <h1>Active post: {postID}</h1>
  // }

    if(postID !== null){
    return <Post postID={postID} goBack={() => setPostID(null)} />
  }

  function mutateTitle(id){
    client.setQueryData(["post", id], oldData => {
      if(oldData){
        return {
          ...oldData,
          title: "Mutated already"
        }
      }
    })
  }


  return (
    <div className="App">
    {
      posts.map(post => {
        const cachedPost = client.getQueryData(["post", post.id])
        return <p key={post.id}>
        <a onClick={() => setPostID(post.id)} href="#">{post.id} - { post.title } </a>
        {cachedPost ? "(visited)" : ""}</p>
        <button onClick={() => mutateTitle(post.id)}>Mutate The Title</button>
      })
    }
    </div>
  );
}

export default App;
