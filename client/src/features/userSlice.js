import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
    forest : "forest",
    cupcake : "cupcake",
}

const getThemeFromLocalStorage = () =>{
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? themes.forest : themes.cupcake;
    localStorage.setItem("theme",theme);
    return theme;
}

const getUserFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem("user")) || null;
}

const initialState ={
    user:getUserFromLocalStorage(),
    theme:getThemeFromLocalStorage(),
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        loginUser:(state,action)=>{
            const user ={...action.payload.user};
            state.user=user;
            localStorage.setItem("user",JSON.stringify(user));
        },
        logoutUser : (state)=>{
            state.user=null;
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
        },
        toggleTheme:(state)=>{
            const theme = state.theme === themes.forest ? themes.cupcake : themes.forest;
            document.documentElement.setAttribute("data-theme", theme);
            state.theme = theme;
            localStorage.setItem("theme",theme);
        }
    }
});

export const {loginUser,logoutUser,toggleTheme} = userSlice.actions;
export default userSlice.reducer;