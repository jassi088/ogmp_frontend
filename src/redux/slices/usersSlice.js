import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        }
    }
});


export const { SetUser } = usersSlice.actions;
export default usersSlice;