import { configureStore } from "@reduxjs/toolkit";
import rootSlice from './features/Quiz/quizSlice'
const store=configureStore({
    reducer:{
        rootSlice:rootSlice
    }
})

export default store