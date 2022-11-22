import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { create } from 'domain'

export const registerSlice = createSlice({
  name: "telValue",
  initialState: {
    value: "",
  },
  reducers:{
    input: (state,action) => {
      state.value += action.payload;
    }
  }
})

export const {input} = registerSlice.actions;
export default registerSlice.reducer;
