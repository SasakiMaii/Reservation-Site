import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "ress";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { configureStore } from '@reduxjs/toolkit';
import { Provider} from 'react-redux';
import reginsterReducer from "./store/RegisterSlice"
import reservateConfirmReducer from "./store/ReservateConfirmSlice";

import searchReducer from "./store/SearchSlice"
import gestroomReducer from "./store/GestroomSlice"
import { HelmetProvider } from 'react-helmet-async';

// redux store

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Fd_9792kFQ4H1FR50WvvoW8khWyv8lk",
  authDomain: "tough-shelter-363703.firebaseapp.com",
  projectId: "tough-shelter-363703",
  storageBucket: "tough-shelter-363703.appspot.com",
  messagingSenderId: "313227634415",
  appId: "1:313227634415:web:aa487c82faeddcfb5e1d1a",
  measurementId: "G-VP442568LF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// eslint-disable-next-line import/first


// redux store
const store = configureStore({
  reducer: {
    inputValue: reservateConfirmReducer,
    registerInput:reginsterReducer,
    searchInput:searchReducer,
    gestroom:gestroomReducer,
  },
});
    
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// 全てのコンポーネントでstoreを共有
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {store}
