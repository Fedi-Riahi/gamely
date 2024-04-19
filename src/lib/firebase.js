
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBs9977jPTdcHiIly5w8G92cPs0v3zPrzE",
  authDomain: "gamely-420513.firebaseapp.com",
  projectId: "gamely-420513",
  storageBucket: "gamely-420513.appspot.com",
  messagingSenderId: "1077994701697",
  appId: "1:1077994701697:web:ce5e8c9fc5460f5ccc1e80"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)