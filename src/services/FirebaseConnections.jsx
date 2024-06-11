import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBQyLy-IT2FUFP_RVGsYFok56lwDaB7wPA",
   authDomain: "tickets-6bbcb.firebaseapp.com",
   projectId: "tickets-6bbcb",
   storageBucket: "tickets-6bbcb.appspot.com",
   messagingSenderId: "129891623030",
   appId: "1:129891623030:web:c5c6940257f9546f5bff57",
   measurementId: "G-5GN5BBQMT7"
};

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)