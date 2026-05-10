import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, getDocs,
  doc, setDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = { /* YOUR CONFIG */ };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Load farmer names for autocomplete
const farmerList = document.getElementById("farmerList");

async function loadFarmers(){
  const snap = await getDocs(collection(db,"farmers"));
  snap.forEach(d=>{
    const opt = document.createElement("option");
    opt.value = d.data().name;
    farmerList.appendChild(opt);
  });
}
loadFarmers();

// Upload images
async function uploadImages(files, farmerId){
  const urls=[];
  for(const file of files){
    const imageRef = ref(storage,`farmers/${farmerId}/${file.name}`);
    await uploadBytes(imageRef,file);
    const url = await getDownloadURL(imageRef);
    urls.push(url);
  }
  return urls;
}

// Save button
document.getElementById("saveBtn").addEventListener("click", async ()=>{

  const name = document.getElementById("name").value.trim();
  const farmerId = name.toLowerCase().replace(/\s/g,'');

  const imageFiles = document.getElementById("images").files;
  const imageUrls = await uploadImages(imageFiles, farmerId);

  // Save Farmer
  await setDoc(doc(db,"farmers",farmerId),{
    name,
    mothername: mothername.value,
    spousename: spousename.value,
    age: Number(age.value),
    altitude: Number(altitude.value),
    landsize: Number(landsize.value),
    numbersofchild: Number(numbersofchild.value),
    region: region.value,
    village: village.value,
    plantationarea: plantationarea.value,
    enviromental: enviromental.value,
    story: story.value,
    images: imageUrls
  },{merge:true});

  // Save Microlot
  await addDoc(collection(db,"microlot"),{
    lotId: lotId.value,
    farmerId,
    process: process.value,
    cupping: cupping.value,
    score: Number(score.value),
    quantity: Number(quantity.value),
    price: Number(price.value),
    status: "available"
  });

  alert("Saved Successfully!");
});
