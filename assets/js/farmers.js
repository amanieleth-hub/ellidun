import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("farmersGrid");

  grid.innerHTML = "<p style='padding:40px'>Loading farmers...</p>";

  try {
    const snap = await getDocs(collection(db, "farmers"));

    grid.innerHTML = "";

    snap.forEach(doc => {
      const farmer = doc.data();

      const card = document.createElement("a");
      card.className = "farm-card";

      // IMPORTANT: correct routing (no farmer-name URLs)
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
    console.error(err);
    grid.innerHTML = "<p style='padding:40px;color:red'>Failed to load farmers.</p>";
  }
});
