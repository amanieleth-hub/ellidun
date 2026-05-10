import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, getDocs,
  doc, setDoc, addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = { const firebaseConfig = {
      apiKey: "AIzaSyAHKnemdl-A2p_dHK43LpwTAxmcAbyFZGk",
      authDomain: "ellidun-microlot-coffee.firebaseapp.com",
      projectId: "ellidun-microlot-coffee",
      storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
      messagingSenderId: "286011718104",
      appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
    } };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
const CLOUDINARY_CLOUD_NAME = "devkhvfvq";   // from Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = "farmersimages"; // the unsigned preset you created

async function uploadImages(files, farmerId) {
  const urls = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `farmers/${farmerId}`); // organizes by farmer

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();
    if (data.secure_url) {
      urls.push(data.secure_url);
    } else {
      console.error("Cloudinary upload failed:", data);
      throw new Error("Image upload failed");
    }
  }
  return urls;
}
// IMAGE PREVIEW BEFORE UPLOAD
const imageInput = document.getElementById("farmerImages");
const preview = document.getElementById("imagePreview");

imageInput.addEventListener("change", () => {
  preview.innerHTML = "";

  const files = imageInput.files;

  if(files.length > 4){
    alert("Please select maximum 4 images");
    imageInput.value = "";
    return;
  }

  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };

    reader.readAsDataURL(file);
  });
});
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
