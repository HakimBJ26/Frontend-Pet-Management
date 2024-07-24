
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAbrrReq3gHE0JBB0xHkNG7hH-77AK92O0",
  authDomain: "petagora-b6d3c.firebaseapp.com",
  projectId: "petagora-b6d3c",
  storageBucket: "petagora-b6d3c.appspot.com",
  messagingSenderId: "56109212496",
  appId: "1:56109212496:web:8e6f5e8bc8c4a56fe7c255"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };