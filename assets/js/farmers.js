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
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const grid = document.getElementById("farmersGrid");

function createCard(id, farmer){
  const card = document.createElement("a");
  card.className = "farm-card reveal";
  card.href = `farmer.html?id=${id}`;

  card.innerHTML = `
  <img src="${farmer.images[0]}" alt="${farmer.name}">
  <div class="farm-info">
    <h3>${farmer.name} Farm</h3>
    <p>${farmer.region} • ${farmer.altitude}m</p>

    <canvas id="radar-${id}" class="mini-radar"></canvas>

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
function buildRadar(canvasId, f){
  const ctx = document.getElementById(canvasId);

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Aroma','Flavor','Aftertaste','Acidity','Body','Balance','Sweetness'],
      datasets: [{
        data: [
          f.fattyacid || 6,
          f.flavor || 6,
          f.aftertaste || 6,
          f.acidity || 6,
          f.body || 6,
          f.balance || 6,
          f.sweetness || 6
        ],
        fill: true,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }},
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { display: false },
          pointLabels: { display: false },
          grid: { circular: true }
        }
      }
    }
  });
}
loadFarmers();
