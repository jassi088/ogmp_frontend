import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./slices/loaderSlice";
import usersSlice from "./slices/usersSlice";

const store = configureStore({
    reducer: {
        [loaderSlice.name]: loaderSlice.reducer,
        [usersSlice.name]: usersSlice.reducer,
    }
});

export default store;