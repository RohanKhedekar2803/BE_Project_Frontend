import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${user.name}`)
        .then(response => response.data)

        if(response){
            localStorage.setItem('user', JSON.stringify(response))
        }

        console.log(response)
        return response
    } catch (error) {
        const message = error.response && error.response.data && error.response.data.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(register.fulfilled, (state, action) => {
                console.log(action.payload)
                state.user = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null; 
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer
