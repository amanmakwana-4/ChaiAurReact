import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalPages, setPage } from '../features/posts/postsSlice';

const Pagination = () => {
    const dispatch= useDispatch();
    const currentPage = useSelector((state)=>state.posts.currentPage)
    const totalPages = useSelector(selectTotalPages)
  return (
    <>
      <div className='pagination'>
        <button
        disabled={currentPage===1}
        onClick={()=>dispatch(setPage(currentPage-1))}
        >Prev
        </button>
        {Array.from({length: totalPages}).map((_,i)=>(
            <button
             key={i}
             className={currentPage===i+1?'active':''}
             onClick={()=>dispatch(setPage(i+1))}
             >
                {i+1}
            </button>
        ))}
        <button disabled={currentPage===totalPages}
        onClick={()=>dispatch(setPage(currentPage+1))}
        >
            next
        </button>
      </div>
    </>
  )
}

export default Pagination