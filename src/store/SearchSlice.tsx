import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    adultInput: "",
    childInput: "",
    adultCount:"1",
    checked:""
  }, //初期値
  reducers: {
    setAdultInput: (state, action: PayloadAction<string>) => {
      state.adultInput = action.payload;
    },
    setChildInput: (state, action: PayloadAction<string>) => {
      state.childInput = action.payload;
    },
    setAdultCount: (state, action: PayloadAction<string>) => {
      state.adultCount = action.payload;
    },
    setChecked: (state, action: PayloadAction<string>) => {
      state.checked = action.payload;
    },
  },
  //アクションの中身をかく
});

export const { setAdultInput, setChildInput,setAdultCount,setChecked } = SearchSlice.actions;

export default SearchSlice.reducer;
