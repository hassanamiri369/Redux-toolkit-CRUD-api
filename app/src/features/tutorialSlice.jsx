import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
    dataPosts: [],

}

export const getAllData = createAsyncThunk("posts/getAll", async () => {
    try {
        const { data } = await api.get("/posts")
        return data
    }
    catch (error) {
        console.log(error.message)
    }
})


export const createTutorial = createAsyncThunk("posts/create", async (newPost) => {
    try {
        const { data } = await api.post("/posts", newPost)
        return data;
    }
    catch (error) {
        console.log(error.message)
    }
})




export const updateToturial = createAsyncThunk("posts/update", async (newPost) => {
    try {
        const { data } = await api.put(`/posts/${newPost.id}`, newPost)
        return data
    }
    catch (error) {
        console.log(error.message)
    }
})


export const deleteTutorial = createAsyncThunk("posts/delete" , async(id)=>{
    try{
        const {data} = await api.delete(`/posts/${id}`)
        return data
    }catch(error){
        console.log(error.message)
    }
})



const tutorialSlice = createSlice({
    name: "tutorial",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllData.fulfilled]: (state, action) => {
            state.dataPosts = action.payload
        },

        [createTutorial.fulfilled]: (state, action) => {
            state.dataPosts.push(action.payload)
        },

        [updateToturial.fulfilled]: (state, action) => {
            let updatedPost = action.payload;
            const update = state.dataPosts.map(x => x.id === updatedPost.id ?
                {
                    id: updatedPost.id,
                    title: updatedPost.title
                    , skills: updatedPost.skills,
                    description: updatedPost.description
                }
                : x)
            state.dataPosts = update


        } , 

        [deleteTutorial.fulfilled] : (state , action)=>{
            if(action.payload.id){
                state.dataPosts.filter(post => post.id !== action.payload.id)
            }
          
        }
    }
})


export default tutorialSlice.reducer