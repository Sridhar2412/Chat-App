import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwINIqPAfrvOKN85hTNn3Sqju3xgfO684",
  authDomain: "chatapp-654fc.firebaseapp.com",
  projectId: "chatapp-654fc",
  storageBucket: "chatapp-654fc.appspot.com",
  messagingSenderId: "651009963674",
  appId: "1:651009963674:web:7fed25243e265cfffa1123",
  measurementId: "G-Q4J9WHSKJ8"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export { getAuth, onAuthStateChanged };
// const analytics = getAnalytics(app);
