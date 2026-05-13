import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHK...",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
