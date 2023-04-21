import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};

const loaderSlice = createSlice({
    name: 'loaders',
    initialState,
    reducers: {
        SetLoader: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { SetLoader } = loaderSlice.actions;

export default loaderSlice;