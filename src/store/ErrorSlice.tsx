import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const errorMessage = useSelector((state) => state.comic.errorMessage)


// export const comicSlice = createSlice({
//   name: 'comic',
//   initialState: {
//       resultData: [],
//       errorMessage: "",
//   },
//   extraReducers: {
//       [getSearchResult.fulfilled]: (state, action) => {
//           state.resultData = action.payload
//       },
//       [getSearchResult.rejected]: (state, action) => {
//           state.errorMessage = action.error.message
//       }
//   }
// });

// export const {search} = comicSlice.actions;

// export default comicSlice.reducer;