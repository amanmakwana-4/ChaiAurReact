import React from 'react'
import { useSelector } from 'react-redux'
import { selectPaginatedPosts } from '../features/posts/postsSlice'
import PostCard from './PostCard'

const PostsGrid = () => {
    const posts = useSelector(selectPaginatedPosts)
  return (
    <>
      <div className='grid'>
        {posts.map((post)=>(
            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsGrid