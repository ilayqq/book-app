import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    email: string | null;
    token: string | null;
}

const initialState: AuthState = {
    email: null,
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: string; token: string }>
        ) => {
            state.email = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.email = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;