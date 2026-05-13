import { db } from "assets/js/firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const teamGrid = document.getElementById("teamGrid");

export async function loadTeam() {
  const q = query(collection(db, "team"), orderBy("order"));
  const snap = await getDocs(q);

  snap.forEach(doc => {
    const t = doc.data();
    teamGrid.innerHTML += `
      <div class="team-card office-vibe">
        <img src="${t.photo}" alt="${t.name}">
        <h3>${t.name}</h3>
        <h4>${t.role}</h4>
        <p>${t.bio}</p>
      </div>
    `;
  });
}
