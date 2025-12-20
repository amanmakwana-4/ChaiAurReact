import React from 'react'
import { useDispatch } from 'react-redux'
import { FALLBACK_IMAGE, removePost } from '../features/posts/postsSlice'

const PostCard = ({post}) => {
    const dispatch = useDispatch()
  return (
    <>
      <div className='card'>
        <button
         className='close-btn'
         onClick={()=>{
            dispatch(removePost(post.id))
         }}>X</button>
         <img 
            src={post.image|| FALLBACK_IMAGE}
            alt={post.title}
            className='card-image'
            onError={(e)=>{e.target.src=FALLBACK_IMAGE}}
        />
        <h4>{post.title}</h4>
        <p>{post.description}</p>
        <span>{post.date}</span>
      </div>
    </>
  )
}

export default PostCard