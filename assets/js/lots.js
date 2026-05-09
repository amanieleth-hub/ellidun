import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// YOUR CONFIG
const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const lotsBody = document.getElementById("lotsBody");

async function loadLots(){
  const q = query(
    collection(db, "microlots"),
    where("status", "==", "available")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const lot = doc.data();

    const row = `
      <tr>
        <td>${lot.lotId}</td>
        <td><a href="farmer.html?name=${lot.farmerName}">${lot.farmerName}</a></td>
        <td>${lot.region}</td>
        <td>${lot.altitude} m</td>
        <td>${lot.process}</td>
        <td>${lot.cuppingScore}</td>
        <td>${lot.cupNotes}</td>
        <td>${lot.quantity}</td>
        <td>$${lot.price}/kg</td>
        <td>
          <a class="lot-action" href="contact.html?lot=${lot.lotId}">
            Inquire
          </a>
        </td>
      </tr>
    `;

    lotsBody.innerHTML += row;
  });
}

loadLots();
