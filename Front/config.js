import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC47NKEHSw0QAb73bOj95Us-QwxvllScK4",
    authDomain: "xchange-b1d49.firebaseapp.com",
    projectId: "xchange-b1d49",
    storageBucket: "xchange-b1d49.appspot.com",
    messagingSenderId: "429518042687",
    appId: "1:429518042687:web:43ab6bffe501e130f72a8a",
    measurementId: "G-6KWGZDCGJ9"
  };

  const app = initializeApp(firebaseConfig)
  
  export const storage = getStorage(app)
  export const db = getFirestore(app)
