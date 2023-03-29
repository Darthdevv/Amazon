import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC74DQ9dF9O-em1bCGE8fLY41Hbmw58H78",
  authDomain: "fir-8db96.firebaseapp.com",
  projectId: "fir-8db96",
  storageBucket: "fir-8db96.appspot.com",
  messagingSenderId: "640689588831",
  appId: "1:640689588831:web:c5a2a8a47ee44a705429ea",
  measurementId: "G-02V9D0E96S",
};

export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
