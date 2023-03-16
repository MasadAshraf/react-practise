import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthPayload(state, action) {
            state.isAuth = action.payload
        },
        setAuthToken(state,action){
            window.localStorage.setItem('user-token', action.payload);
        }
    },
})
export const { setAuthPayload ,setAuthToken} = authSlice.actions
export default authSlice.reducer