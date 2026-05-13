import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("farmersGrid");

  // show instant UI so no white screen
  grid.innerHTML = "<p style='padding:40px'>Loading farmers...</p>";

  try {
    const app = initializeApp(firebaseConfig);
    const db  = getFirestore(app);

    const snap = await getDocs(collection(db,"farmers"));

    grid.innerHTML = ""; // clear loading text

    snap.forEach(doc=>{
      const farmer = doc.data();

      const card = document.createElement("a");
      card.className = "farm-card reveal";
      card.href = `farmer.html?id=${doc.id}`;

      card.innerHTML = `
        <img src="${farmer.images?.[0] || 'assets/images/placeholder.jpg'}">
        <div class="farm-info">
          <h3>${farmer.name} Farm</h3>
          <p>${farmer.region} • ${farmer.altitude}m</p>
          <span class="view-story">View Story</span>
        </div>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = "<p style='padding:40px;color:red'>Failed to load farmers.</p>";
    console.error(err);
  }
});
