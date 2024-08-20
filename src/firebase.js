import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import UserService from "./service/UserService";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);



const requestPermissionAndGetToken = async () => {
  const userId= localStorage.getItem('id')
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    });

    if (token) {
      try {
        const res =await UserService.saveMessagingToken(userId, token);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};



const storage = getStorage(app);

export { requestPermissionAndGetToken, storage, messaging };