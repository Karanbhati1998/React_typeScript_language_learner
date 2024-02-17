import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState:StateType={
    loading:false,
    word:[],
    result:[],
}
const rootSlice=createSlice({
    name:"root",
    initialState,
    reducers:{
        getWordRequest:(state)=>{
            state.loading=true
        },
        getWordSuccess:(state,actions:PayloadAction<WordType[]>)=>{
            state.loading=false
            state.word=actions.payload
        },
        getWordFail:(state,actions:PayloadAction<string>)=>{
            state.loading=false
            state.error=actions.payload
        },
        saveResult:(state,actions:PayloadAction<string[]>)=>{
            state.loading=false
            state.result=actions.payload
        },
        clearState:(state)=>{
            state.loading=false
            state.error=undefined,
            state.word=[],
            state.result=[]
        },

    }
})
export const {getWordRequest,getWordSuccess,getWordFail,clearState,saveResult}=rootSlice.actions
export default rootSlice.reducer