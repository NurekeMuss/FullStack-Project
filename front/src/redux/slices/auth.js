import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async(params) =>{
    const {data} = await axios.post('/auth/login', params)
    return data;
})

export const fetchRegistrer = createAsyncThunk('auth/fetchRegistrer', async(params) =>{
    const {data} = await axios.post('/auth/register', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async() =>{
    const {data} = await axios.get('/auth/me')
    return data;
})


const initialState = {
  data:null,
  status:'lodaing',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout:(state) =>{
            state.date = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]:(state) =>{
            state.status = 'loading'
            state.data=  null
        },
        [fetchAuth.fulfilled]:(state,action) =>{
            state.data = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]:(state) =>{
            state.data = 'error'
            state.data = null
        },
        [fetchAuthMe.pending]:(state) =>{
            state.status = 'loading'
            state.data=  null
        },
        [fetchAuthMe.fulfilled]:(state,action) =>{
            state.data = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]:(state) =>{
            state.data = 'error'
            state.data = null
        },
        [fetchRegistrer.pending]:(state) =>{
            state.status = 'loading'
            state.data=  null
        },
        [fetchRegistrer.fulfilled]:(state,action) =>{
            state.data = 'loaded'
            state.data = action.payload
        },
        [fetchRegistrer.rejected]:(state) =>{
            state.data = 'error'
            state.data = null
        },
        
    },
})

export const authReducer = authSlice.reducer

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const {logout} = authSlice.actions