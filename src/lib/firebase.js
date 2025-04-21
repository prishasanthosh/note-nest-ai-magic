
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB-vJi5FtMarKRCj4AGva0WPoBeCS3ioe8",
//   authDomain: "notenest-app.firebaseapp.com",
//   projectId: "notenest-app",
//   storageBucket: "notenest-app.appspot.com",
//   messagingSenderId: "748588517565",
//   appId: "1:748588517565:web:bfabe756e917232b89e35e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, db, googleProvider };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB2U0J5w3vJIDiW4UAjrR0FH5FoD5WKeRU",
  authDomain: "notes-e725d.firebaseapp.com",
  projectId: "notes-e725d",
  storageBucket: "notes-e725d.firebasestorage.app",
  messagingSenderId: "424038777159",
  appId: "1:424038777159:web:8590d4a2967a2a3d9d8c62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 
const googleProvider = new GoogleAuthProvider();

export { app, db, auth,googleProvider  }; 