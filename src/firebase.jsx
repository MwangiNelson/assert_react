// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDSsuz8dZGfqIYXDE0Ttqcz3Vib3CYpWI8",
    authDomain: "assert-f4412.firebaseapp.com",
    projectId: "assert-f4412",
    storageBucket: "assert-f4412.appspot.com",
    messagingSenderId: "148732286231",
    appId: "1:148732286231:web:63a9a66bd3839a13cf1352",
    measurementId: "G-FLN6SGV0VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

export { storage }