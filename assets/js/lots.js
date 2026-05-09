<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tbody = document.querySelector("#lotsTable tbody");

async function loadLots(){
  const querySnapshot = await getDocs(collection(db, "microlots"));

  querySnapshot.forEach((doc) => {
    const lot = doc.data();

    // show only available
    if(lot.status !== "available" || lot.quantity <= 0) return;

    const row = `
      <tr>
        <td>${lot.lotid}</td>
        <td>
          <a href="farmer-${lot.farmer}.html" class="farmer-link">
            ${lot.farmer}
          </a>
        </td>
        <td>${lot.region}</td>
        <td>${lot.altitude} m</td>
        <td>${lot.process}</td>
        <td>${lot.cupscore}</td>
        <td>${lot.cupnotes}</td>
        <td>${lot.quantity}</td>
        <td>${lot.price}</td>
        <td>
          <a href="contact.html?lot=${lot.lotid}" class="inquire-btn">
            Inquire
          </a>
        </td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}

loadLots();




