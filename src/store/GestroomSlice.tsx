import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GestroomSlice = createSlice({
  name: "search",
  initialState: {
    roomSelect: "",
    upSelect: "",
    downSelect: "",
    descClick: false,
    ascClick: false,
  }, //初期値
  reducers: {
    setRoomSelect: (state, action: PayloadAction<string>) => {
      state.roomSelect = action.payload;
    },
    setUpSelect: (state, action: PayloadAction<string>) => {
      state.upSelect = action.payload;
    },
    setDownSelect: (state, action: PayloadAction<string>) => {
      state.downSelect = action.payload;
    },
    setDescclick: (state, action:any) => {
      state.descClick = action.true;
      state.ascClick=action.false
    },
    setAscclick: (state, action:any) => {
      state.ascClick = action.true;
      state.descClick = action.false;
    },
  },
  //アクションの中身をかく
});

export const {
  setRoomSelect,
  setUpSelect,
  setDownSelect,
  setDescclick,
  setAscclick,
} = GestroomSlice.actions;

export default GestroomSlice.reducer;
