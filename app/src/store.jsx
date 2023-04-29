import {configureStore} from "@reduxjs/toolkit";
import tutorialSlice from "./features/tutorialSlice";


export const store = configureStore({
    reducer : {
        posts : tutorialSlice
    }
})