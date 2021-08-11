import React from "react"
import { useQuery } from "react-query";


const fetcher = url => fetch(url).then( res => res.json())

const Post = ({ postID, goBack }) => {

    const { isLoading, data } = useQuery(["post", postID], () => fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`), {
        staleTime: 0,
        cacheTime: 0
    })

    if(isLoading){
    return <h2>Loading...</h2>    
  }

    return <div>
    <a href="#" onClick={goBack}>Go Back</a>
    <p>Post id: {postID}</p>
    <p>Post Title: {data.title}</p>
    <p>Post Title: {data.body}</p>

    </div>
}

export default Post;