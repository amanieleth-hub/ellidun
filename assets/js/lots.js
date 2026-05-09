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

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyHKN...",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lotsBody = document.getElementById("lotsBody");

// safe farmer fetch with cache (VERY IMPORTANT)
const farmerCache = {};

// helper: get farmer
async function getFarmer(farmerId) {
  if (!farmerId) return null;

  if (farmerCache[farmerId]) return farmerCache[farmerId];

  const snap = await getDoc(doc(db, "farmers", farmerId));

  if (snap.exists()) {
    farmerCache[farmerId] = snap.data();
    return farmerCache[farmerId];
  }

  return null;
}

function createRow(lot, farmer) {
  const tr = document.createElement("tr");

  const farmerName = farmer?.name || "Unknown Farmer";
  const region = farmer?.region || "-";
  const altitude = farmer?.altitude ? farmer.altitude + " m" : "-";

  tr.innerHTML = `
    <td>${lot.lotId || "-"}</td>

    <td>
      <a class="farm-link" href="farmers/${farmerName.toLowerCase().replace(/\s/g,'')}.html">
        ${farmerName}
      </a>
    </td>

    <td>${region}</td>
    <td>${altitude}</td>
    <td>${lot.process || "-"}</td>
    <td>${lot.cupping || "-"}</td>
    <td>${lot.score ?? "-"}</td>
    <td>${lot.quantity ?? "-"}</td>
    <td>$${lot.price ?? "-"}</td>

    <td>
      <span class="status ${lot.status}">
        ${lot.status}
      </span>
      <br/>
      <a href="inquiry.html?lot=${lot.lotId}" class="action-btn">
        Request
      </a>
    </td>
  `;

  lotsBody.appendChild(tr);
}

// main loader (FIXED)
async function loadLots() {
  try {
    const q = query(
      collection(db, "microlots"),
      where("status", "==", "available")
    );

    const snapshot = await getDocs(q);

    const lots = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // IMPORTANT: parallel resolve farmers
    await Promise.all(
      lots.map(async (lot) => {
        const farmer = await getFarmer(lot.farmerId);
        createRow(lot, farmer);
      })
    );

  } catch (error) {
    console.error("Error loading lots:", error);
  }
}

loadLots();
