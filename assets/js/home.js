import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("home.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ------------------ LOT COUNT ------------------
async function loadLotsCount(){
  const q = query(
    collection(db,"microlot"),
    where("status","==","available")
  );

  const snap = await getDocs(q);
  document.getElementById("lotsCount").innerText = snap.size;
}

// ------------------ 3 FARMERS ------------------
async function loadHomeFarmers(){
  const container = document.getElementById("homeFarmers");

  const snap = await getDocs(
    query(collection(db,"farmers"), limit(3))
  );

  snap.forEach(doc=>{
    const f = doc.data();

    const card = document.createElement("div");
    card.className = "farm-card";

    card.innerHTML = `
      <img src="${f.images?.[0]}" alt="${f.name}">
      <div class="farm-info">
        <h3>${f.name} Farm</h3>
        <p>${f.region} • ${f.altitude}m</p>
        <a href="farmer.html?id=${doc.id}" class="more-btn">View Story</a>
      </div>
    `;

    container.prepend(card);
  });
}

loadLotsCount();
loadHomeFarmers();
