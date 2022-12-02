import { createSlice } from "@reduxjs/toolkit";

const radioItem = [
    {
      id: "localpay",
      title: "現地にて精算（現金・クレジット）",
      value: "cash",
    },
    {
      id: "creditpay",
      title: "オンラインでのクレジット精算",
      value: "credit",
    },
  ];


const reservateConfirmContactSlice = createSlice({
  name: "contact",
  initialState: {
    value: "",
  },
  reducers: {
    input: (state, action) => {
      state.value = action.payload;
    },
  },
});

const reservateConfirmPaymentItemSlice = createSlice({
    name: "paymentItem",
    initialState: {
        value: radioItem,
    },
    reducers: {
        addPayment: (state,action) => {
            state.value.push(action.payload)
        }
    }
})

const reservateConfirmPaymentSlice = createSlice({
  name: "payment",
  initialState: {
    value: radioItem,
  },
  reducers: {
    select: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { input } = reservateConfirmContactSlice.actions;
export const { select } = reservateConfirmPaymentSlice.actions;
export const { addPayment } = reservateConfirmPaymentItemSlice.actions;
export const reservateConfirmContactReducer = reservateConfirmContactSlice.reducer;
export const reservateConfirmPaymentReducer = reservateConfirmPaymentSlice.reducer;
export const reservateConfirmPaymentItemReducer = reservateConfirmPaymentItemSlice.reducer;
