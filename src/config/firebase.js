import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB012hOVmAEyM-_74Zc3ULznFCSh1eHSxo",
  authDomain: "fir-project-91cb2.firebaseapp.com",
  projectId: "fir-project-91cb2",
  storageBucket: "fir-project-91cb2.firebasestorage.app",
  messagingSenderId: "458166510594",
  appId: "1:458166510594:web:50e642df2dd7c0fb5a731b"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)