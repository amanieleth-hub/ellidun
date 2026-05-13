import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const db  = getFirestore(app);

    // LOT COUNT
    const lotsSnap = await getDocs(
      query(collection(db,"microlot"), where("status","==","available"))
    );
    document.getElementById("lotsCount").innerText = lotsSnap.size;

    // HOME FARMERS
    const container = document.getElementById("homeFarmers");
    container.innerHTML = "<p style='padding:20px'>Loading farmers...</p>";

    const farmersSnap = await getDocs(
      query(collection(db,"farmers"), limit(3))
    );

    container.innerHTML = "";

    farmersSnap.forEach(doc=>{
      const f = doc.data();

      const card = document.createElement("div");
      card.className = "farm-card";

      card.innerHTML = `
        <img src="${f.images?.[0] || 'assets/images/placeholder.jpg'}">
        <div class="farm-info">
          <h3>${f.name} Farm</h3>
          <p>${f.region} • ${f.altitude}m</p>
          <a href="farmer.html?id=${doc.id}" class="more-btn">View Story</a>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Home load error:", err);
  }
});
