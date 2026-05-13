import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const grid = document.getElementById("farmersGrid");

function createCard(id, farmer){
  const card = document.createElement("a");
  card.className = "farm-card reveal";
  card.href = `farmer.html?id=${id}`;

  card.innerHTML = `
    <img src="${farmer.images?.[0] || 'assets/images/placeholder.jpg'}" alt="${farmer.name}">
    <div class="farm-info">
      <h3>${farmer.name} Farm</h3>
      <p>${farmer.region} • ${farmer.altitude}m</p>
      <span class="view-story">View Story</span>
    </div>
  `;

  grid.appendChild(card);
}

async function loadFarmers(){
  const snap = await getDocs(collection(db,"farmers"));
  snap.forEach(doc=>{
    createCard(doc.id, doc.data());
  });
}

loadFarmers();
