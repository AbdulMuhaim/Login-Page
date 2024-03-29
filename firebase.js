import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC25is-5fXSkYapKR272SvL-nXK3K_yPCE",
  authDomain: "smagesystems-e92ce.firebaseapp.com",
  projectId: "smagesystems-e92ce",
  storageBucket: "smagesystems-e92ce.appspot.com",
  messagingSenderId: "786671776978",
  appId: "1:786671776978:web:03fff3a0dc0bff51f1690b"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)