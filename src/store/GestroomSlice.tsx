import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const GestroomSlice = createSlice({
  name: "search",
  initialState: {
    roomSelect: "",
    upSelect: "",
    downSelect:"",
    descCrick:false,
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
    setDescCrick: (state, action: PayloadAction<boolean>) => {
      state.descCrick = true;
    },

  },
  //アクションの中身をかく
});

export const { setRoomSelect, setUpSelect,setDownSelect,setDescCrick} = GestroomSlice.actions;

export default GestroomSlice.reducer;