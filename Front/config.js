import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCiM05Wj6OZTC0tWGTjw8i8Lcg0dKxLN58",
  authDomain: "xchange-99d63.firebaseapp.com",
  projectId: "xchange-99d63",
  storageBucket: "xchange-99d63.appspot.com",
  messagingSenderId: "944488279318",
  appId: "1:944488279318:web:522224070abe4727313437",
  measurementId: "G-0Z4X597LJB"
};

const app = initializeApp(firebaseConfig)
  
export const storage = getStorage(app)
export const db = getFirestore(app)