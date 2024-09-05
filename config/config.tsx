import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
////////////////
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkQE3PlCyHXGQfgSoj4OtzhrGTDlFR4lg",
  authDomain: "proyectofinal-a26d2.firebaseapp.com",
  databaseURL: "https://proyectofinal-a26d2-default-rtdb.firebaseio.com",
  projectId: "proyectofinal-a26d2",
  storageBucket: "proyectofinal-a26d2.appspot.com",
  messagingSenderId: "1022275961971",
  appId: "1:1022275961971:web:f58508d0a99554734c9606"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app)
export const db = getDatabase(app);
export const storage = getStorage(app);
////////////
//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
