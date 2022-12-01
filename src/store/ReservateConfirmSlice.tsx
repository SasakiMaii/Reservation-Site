import { createSlice } from "@reduxjs/toolkit";

export const reservateConfirmSlice = createSlice({
    name: "contact",
    initialState: {
        value: "",
    },
    reducers: {
        input: (state,action) => {
            state.value = action.payload;
        }
    }
})

export const {input} = reservateConfirmSlice.actions;
export default reservateConfirmSlice.reducer;
