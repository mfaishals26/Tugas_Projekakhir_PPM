import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApDZUGL9kk8RcDACIANl697f2h4JFpyAo",
  authDomain: "ti23f-app-7815b.firebaseapp.com",
  projectId: "ti23f-app-7815b",
  storageBucket: "ti23f-app-7815b.firebasestorage.app",
  messagingSenderId: "995822008592",
  appId: "1:995822008592:web:0585eca16193e2ba060d95"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbCloud = getFirestore(app); // Ini untuk akses Firestore