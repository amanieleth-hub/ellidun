// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config (keep yours here)
const firebaseConfig = {
      apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
      authDomain: "ellidun-microlot-coffee.firebaseapp.com",
      projectId: "ellidun-microlot-coffee",
      storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
      messagingSenderId: "286011718104",
      appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lotsBody = document.getElementById("lotsBody");

// Helper: build row
function createRow(lot, farmer) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${lot.lotId}</td>
    <td>
      <a href="farmers/${farmer.name.toLowerCase().replace(/\s/g,'')}.html">
        ${farmer.name}
      </a>
    </td>
    <td>${farmer.region}</td>
    <td>${farmer.altitude} m</td>
    <td>${lot.process}</td>
    <td>${lot.cupping}</td>
    <td>${lot.score ?? "-"}</td>
    <td>${lot.quantity}</td>
    <td>$${lot.price}</td>
    <td>
      <a href="inquiry.html?lot=${lot.lotId}" class="table-btn">
        Request Sample
      </a>
    </td>
  `;

  lotsBody.appendChild(tr);
}

// Main loader
async function loadLots() {
  const q = query(
    collection(db, "microlots"),
    where("status", "==", "available")
  );

  const querySnapshot = await getDocs(q);

  for (const lotDoc of querySnapshot.docs) {
    const lot = lotDoc.data();

    // Fetch farmer using farmerId
    const farmerRef = doc(db, "farmers", lot.farmerId);
    const farmerSnap = await getDoc(farmerRef);

    if (farmerSnap.exists()) {
      const farmer = farmerSnap.data();
      createRow(lot, farmer);
    }
  }
}

loadLots();
