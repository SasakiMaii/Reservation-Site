// import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage"


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
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
