import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const PAGE_SIZE=6;
export const FALLBACK_IMAGE='https://via.placeholder.com/300*200?text=No+Image';
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ()=>{
        const res = await fetch('https://dummyjson.com/posts');
        const data=await res.json();
        return data.posts.map((item)=>({
            id: item.id,
            title: item.title,
            description: item.body,
            image: `https://picsum.photos/seed/post-${item.id}/300/200`,
            date: 'Mon, 21 Dec 2020 14:57 GMT',
        }))
    }
);
const postsSlice = createSlice({
    name:'posts',
    initialState:{
        items:[],
        currentPage:1,
        loading: true,
    },
    reducers:{
        setPage(state,action){
            state.currentPage=action.payload
        },
        removePost(state,action){
            state.items=state.items.filter(
                (post)=> post.id !== action.payload
            )
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.items=action.payload
            state.loading=false
        })
    }
});
export const {setPage,removePost}=postsSlice.actions;
export const selectPaginatedPosts=(state)=>{
    const start = (state.posts.currentPage-1)* PAGE_SIZE;
    return state.posts.items.slice(start,start+PAGE_SIZE)
};
export const selectTotalPages=(state)=>{
    return Math.ceil(state.posts.items.length/PAGE_SIZE)
}
export default postsSlice.reducer;