import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {

    // LOT COUNT
    const lotsSnap = await getDocs(
      query(collection(db,"microlot"), where("status","==","available"))
    );

    const lotsCountEl = document.getElementById("lotsCount");
    if (lotsCountEl) {
      lotsCountEl.innerText = lotsSnap.size;
    }

    // HOME FARMERS
    const container = document.getElementById("homeFarmers");

    if (!container) return;

    container.innerHTML = "<p style='padding:20px'>Loading farmers...</p>";

    const farmersSnap = await getDocs(
      query(collection(db,"farmers"), limit(3))
    );

    container.innerHTML = "";

    farmersSnap.forEach(doc => {
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
      setTimeout(() => card.classList.add("show"), 100);
    });

  } catch (err) {
    console.error("Home load error:", err);
  }
});
