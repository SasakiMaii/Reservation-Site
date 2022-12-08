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

  const reservateConfirmSlice = createSlice({
    name: "inputValue",
    initialState: {
      contact: "",
      paymentItem: radioItem,
      payment: radioItem,
      lodgeFirstName: "",
      lodgeLastName: ""
    },
    reducers: {
      contactInput: (state,action) => {
        state.contact = action.payload;
      },
      addPayment: (state,action) => {
        state.paymentItem.push(action.payload)
      },
      select: (state,action) => {
        state.payment = action.payload;
      },
      lodgeFirstName: (state,action) => {
        state.lodgeFirstName = action.payload;
      },
      lodgeLastName: (state,action) => {
        state.lodgeLastName = action.payload;
      }
    }
  })



export const { contactInput,select,addPayment,lodgeFirstName,lodgeLastName } = reservateConfirmSlice.actions;
export default reservateConfirmSlice.reducer;
