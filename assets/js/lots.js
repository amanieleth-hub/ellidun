// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Your Firebase config here
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

// Reference table body
const tableBody = document.getElementById("lotsTableBody");

// Load microlots
async function loadLots() {
  const q = query(
    collection(db, "microlots"),
    where("status", "==", "available")
  );

  const snapshot = await getDocs(q);

  for (const lotDoc of snapshot.docs) {
    const lot = lotDoc.data();

    // Fetch farmer using farmerId
    const farmerRef = doc(db, "farmers", lot.farmerId);
    const farmerSnap = await getDoc(farmerRef);
    const farmer = farmerSnap.data();

    // Build row
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${lot.lotId}</td>

      <td>
        <a href="farmers/${lot.farmerId}.html" class="farmer-link">
          ${farmer.name}
        </a>
      </td>

      <td>${farmer.region}</td>
      <td>${farmer.altitude} m</td>
      <td>${lot.process}</td>
      <td>${lot.cupping}</td>
      <td>${lot.quantity} kg</td>
      <td>$${lot.price}</td>

      <td>
        <a href="inquiry.html?lot=${lot.lotId}" class="btn-brown-outline">
          Inquire
        </a>
      </td>
    `;

    tableBody.appendChild(row);
  }
}

loadLots();
