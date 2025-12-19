import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    value: 0
}
export const counterSlice= createSlice({
    name:'counter',
    initialState,
    reducers:{
        increaseValue: (state)=>{
            state.value +=1
        },
        decrementValue: (state)=>{
            state.value -=1
        },
        resetValue: (state)=>{
            state.value =0
        },
        increaseByAmt:(state,action)=>{
            state.value += action.payload
        },
        decreaseByAmt:(state,action)=>{
            state.value -= action.payload
        }
    },
})
export const {increaseValue,decrementValue,resetValue,increaseByAmt,decreaseByAmt}= counterSlice.actions
export default counterSlice.reducer