import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, getDoc,
  collection, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyHKN...",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

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
  document.getElementById("img0").src = f.images[0];
  document.getElementById("img2").src = f.images[2];
  document.getElementById("img3").src = f.images[3];

  loadLots();
}

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

loadFarmer();
