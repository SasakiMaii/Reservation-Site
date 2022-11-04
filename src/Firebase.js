import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA5Fd_9792kFQ4H1FR50WvvoW8khWyv8lk",
  authDomain: "tough-shelter-363703.firebaseapp.com",
  projectId: "tough-shelter-363703",
  storageBucket: "tough-shelter-363703.appspot.com",
  messagingSenderId: "313227634415",
  appId: "1:313227634415:web:aa487c82faeddcfb5e1d1a",
  measurementId: "G-VP442568LF"
};

// firebase.initializeApp(firebaseConfig);

const app = initializeApp (firebaseConfig);
const db = getFirestore(app);
// export const auth = firebase.auth();

export default db;
