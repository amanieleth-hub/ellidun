import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = { /* your config */ };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Autocomplete farmers
const farmerList = document.getElementById("farmerList");
const farmerNameInput = document.getElementById("farmerName");

async function loadFarmers() {
  const snap = await getDocs(collection(db, "farmers"));
  snap.forEach(doc => {
    const option = document.createElement("option");
    option.value = doc.data().name;
    farmerList.appendChild(option);
  });
}

loadFarmers();

// Upload images
async function uploadImages(files, farmerId) {
  const urls = [];
  for (const file of files) {
    const imageRef = ref(storage, `farmers/${farmerId}/${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    urls.push(url);
  }
  return urls;
}

// Save
document.getElementById("saveBtn").addEventListener("click", async () => {
  const name = farmerNameInput.value.trim();
  const farmerId = name.toLowerCase().replace(/\s/g,'');

  const region = document.getElementById("region").value;
  const village = document.getElementById("village").value;
  const altitude = Number(document.getElementById("altitude").value);
  const story = document.getElementById("story").value;

  const imagesFiles = document.getElementById("images").files;
  const imageUrls = await uploadImages(imagesFiles, farmerId);

  // Save farmer (only if new)
  await setDoc(doc(db, "farmers", farmerId), {
    name,
    region,
    village,
    altitude,
    story,
    images: imageUrls
  }, { merge: true });

  // Save microlot
  await addDoc(collection(db, "microlot"), {
    lotId: document.getElementById("lotId").value,
    farmerId,
    process: document.getElementById("process").value,
    cupping: document.getElementById("cupping").value,
    score: Number(document.getElementById("score").value),
    quantity: Number(document.getElementById("quantity").value),
    price: Number(document.getElementById("price").value),
    status: "available"
  });

  alert("Microlot added successfully!");
});
