import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 apiKey: "AIzaSyCr4WxnH7paMvQh1u40LW3RMcP2A9k7rI8",
  authDomain: "logindevecommerce.firebaseapp.com",
  projectId: "logindevecommerce",
  storageBucket: "logindevecommerce.appspot.com",
  messagingSenderId: "1570897960",
  appId: "1:1570897960:web:fdb57faff62eb5f6b3751d",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ VERY IMPORTANT

export { auth, provider };
