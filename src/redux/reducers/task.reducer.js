import {createSlice} from "@reduxjs/toolkit";

const initialState={
    data:null
}

const taskReducer=createSlice({
    name:"task",
    initialState,
    reducers:{
        setTask(state,action){
            state.data=action.payload

        },
        removeTask(state,action){

        }

    }
})

export const {setTask,removeTask}=taskReducer.actions

export default taskReducer.reducer