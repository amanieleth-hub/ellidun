import { db } from "./firebase.js";
import {
  getFirestore, doc, getDoc,
  collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Get farmerId from URL
const params = new URLSearchParams(window.location.search);
const farmerId = params.get("id");

async function loadFarmer() {
  const snap = await getDoc(doc(db, "farmers", farmerId));
  if (!snap.exists()) return;

  const f = snap.data();

  // HERO
  document.getElementById("hero").style.backgroundImage = `url(${f.images[1]})`;
  document.getElementById("farmerNameHero").textContent = f.name;

  // STORY
  document.getElementById("farmerStory").textContent = f.story;

  // PROFILE
  document.getElementById("farmerProfile").innerHTML = `
    <p><strong>Mother:</strong> ${f.mothername}</p>
    <p><strong>Spouse:</strong> ${f.spousename}</p>
    <p><strong>Age:</strong> ${f.age}</p>
    <p><strong>Children:</strong> ${f.numbersofchild}</p>
    <p><strong>Region:</strong> ${f.region}</p>
    <p><strong>Village:</strong> ${f.village}</p>
    <p><strong>Altitude:</strong> ${f.altitude} masl</p>
    <p><strong>Land Size:</strong> ${f.landsize} ha</p>
    <p><strong>Plantation Area:</strong> ${f.plantationarea}</p>
    <p><strong>Environmental Practice:</strong> ${f.enviromental}</p>
  `;
  
  // GALLERY
  const imgs = f.images || [];

  document.getElementById("hero").style.backgroundImage =
    `url(${imgs[1] || imgs[0] || 'assets/images/placeholder.jpg'})`;
  document.getElementById("img0").src = imgs[0] || 'assets/images/placeholder.jpg';
  document.getElementById("img2").src = imgs[2] || 'assets/images/placeholder.jpg';
  document.getElementById("img3").src = imgs[3] || 'assets/images/placeholder.jpg';

  loadLots();
}

card.innerHTML = `
  <img src="${farmer.images[0]}" alt="${farmer.name}">
  <div class="farm-info">
    <h3>${farmer.name} Farm</h3>
    <p>${farmer.region} • ${farmer.altitude}m</p>

    <canvas id="radar-${id}" class="mini-radar"></canvas>

    <span class="view-story">View Story</span>
  </div>
`;

async function loadLots(){
  const q = query(
    collection(db,"microlot"),
    where("farmerId","==",farmerId),
    where("status","==","available")
  );
  const snap = await getDocs(q);
  const box = document.getElementById("lotsContainer");

  snap.forEach(d=>{
    const l=d.data();
    box.innerHTML+=`
      <div class="lot-card">
        <h3>${l.lotId}</h3>
        <p><strong>Process:</strong> ${l.process}</p>
        <p><strong>Score:</strong> ${l.score}</p>
        <p><strong>Qty:</strong> ${l.quantity} kg</p>
        <p><strong>Price:</strong> $${l.price}</p>
      </div>
    `;
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
loadFarmer();
