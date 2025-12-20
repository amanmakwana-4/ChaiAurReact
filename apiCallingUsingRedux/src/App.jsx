import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './features/posts/postsSlice';
import PostsGrid from './components/PostsGrid';
import Pagination from './components/Pagination';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.posts.loading)
  useEffect(()=>{
    setTimeout(()=>{
      dispatch(fetchPosts())
    },5000)
  },[dispatch])
  if(loading){
    return <div className='loading'>Loading...</div>
  }
  return (
    <>
      <div className='app-container'>
        <h2>Posts</h2>
        <PostsGrid />
        <Pagination />
      </div>
    </>
  )
}

export default App
