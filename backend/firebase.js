// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0vntRVl-WSxZzMuKS_0omxDWiLD9CClU",
  authDomain: "uploadfile-998a7.firebaseapp.com",
  projectId: "uploadfile-998a7",
  storageBucket: "uploadfile-998a7.appspot.com",
  messagingSenderId: "574640119713",
  appId: "1:574640119713:web:34544a01629ffae0d375e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Storage
export const storage = getStorage(app);
