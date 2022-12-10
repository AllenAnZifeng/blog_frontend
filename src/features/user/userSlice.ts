import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';
import {ip_addr} from "../../App";
import {userPayload} from "../../components/Header/Header";


type userState = {
    name: string;
    status: 'Guest' | 'LoggedIn' ;
    token: string;
}

const user_initialState:userState = {
    name:"",
    status: 'Guest',
    token:""
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: user_initialState,
    reducers: {
        loadFromCookie:(state) =>{
            const cookie = document.cookie.split(";").map((x) => x.trim());
            const token = cookie.find((x) => x.startsWith("token="));
            const name = cookie.find((x) => x.startsWith("username="));
            if (token !== undefined && name !== undefined) {
                state.token = token.slice(6);
                state.name = name.slice(9);
                state.status = "LoggedIn";
            }else{
                state.status = "Guest";
            }
        },
        signOut:(state) =>{
            state.name = "";
            state.token = "";
            state.status = "Guest";
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'Guest'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {

                state.name = action.payload.name
                state.token = action.payload.token
                state.status = 'LoggedIn'
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'Guest'
            })
    }

})


export const fetchUser = createAsyncThunk('user/fetchUser', async (payload:userPayload) => {

    let res = await fetch(ip_addr + "/api/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
    });
    const response = await res.json()
    console.log(response)
    alert(response.message)
    let user:userState;
    if (response.status===200){
        document.cookie = "token=" + response.token;
        document.cookie = "username=" + response.message;
         user = {
            name:response.message,
            status: 'LoggedIn',
            token:response.token
        }
    }
    else{
        return Promise.reject(response.message)
    }
    return user
})


export const registerUser = createAsyncThunk('user/fetchUser', async (payload:userPayload) => {

    let res = await fetch(ip_addr + "/api/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
    })
    const response = await res.json()
    console.log(response)
    alert(response.message)

    return Promise.reject(response.message)

})

export const selectUserStatus = (state: RootState) => state.users.status;
export const selectUserName = (state: RootState) => state.users.name;
export const selectUserToken = (state: RootState) => state.users.token;
export const {loadFromCookie,signOut} = userSlice.actions
export default userSlice.reducer