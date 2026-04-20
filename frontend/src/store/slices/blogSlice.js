import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
    input: "",
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setBlogLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBlogError: (state, action) => {
            state.error = action.payload;
        },
        setInput: (state, action) => {
            state.input = action.payload;
        },
    },
});

export const { setBlogs, setBlogLoading, setBlogError,setInput } = blogSlice.actions;
export default blogSlice.reducer;