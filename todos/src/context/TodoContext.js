import { createContext,useContext } from "react";
export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"Sample Todo 1",
            completed:false
        }
    ],
    addTodo:(todo)=>{},
    updatedTodo:(id,newTodo)=>{},
    deleteTodo:(id)=>{},
    toggleCompleted:(id)=>{}
});


export const useTodo=()=>{
    return useContext(TodoContext);
}
export const Todoprovider=TodoContext.Provider;
