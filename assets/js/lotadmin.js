import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, getDocs, getDoc,
  doc, setDoc, addDoc, updateDoc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── Firebase config ───────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyHKN...",
  authDomain: "ellidun-microlot-coffee.firebaseapp.com",
  projectId: "ellidun-microlot-coffee",
  storageBucket: "ellidun-microlot-coffee.firebasestorage.app",
  messagingSenderId: "286011718104",
  appId: "1:286011718104:web:bb4f4e018d28ffdb2c1aad"
};

// Upload images
const CLOUDINARY_CLOUD_NAME = "devkhvfvq";   // from Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESET = "farmersimages"; // the unsigned preset you created
// ── Init ──────────────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ════════════════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════════════════

// Toast notification
function showToast(msg, type = "success") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => { t.className = "toast"; }, 3500);
}

// Validate required fields — returns true if all pass
function validateFields(fields) {
  document.querySelectorAll(".field-error").forEach(el => el.classList.remove("field-error"));
  document.querySelectorAll(".error-msg").forEach(el => el.remove());
  let valid = true;
  fields.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      el.classList.add("field-error");
      const msg = document.createElement("span");
      msg.className = "error-msg";
      msg.textContent = `${label} is required`;
      el.insertAdjacentElement("afterend", msg);
      valid = false;
    }
  });
  return valid;
}

// Name formatting
// Farmer name → ALL CAPS
function formatFarmerName(val) {
  return val.trim().toUpperCase();
}
// Mother / spouse → Title Case  (e.g. "jane smith" → "Jane Smith")
function toTitleCase(val) {
  return val.trim().replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// farmerId derived from name (consistent between add and edit)
function toFarmerId(name) {
  return name.toLowerCase().replace(/\s+/g, "_");
}

// Auto-format on blur for cased fields
document.querySelectorAll("input.uppercase").forEach(el => {
  el.addEventListener("blur", () => { el.value = formatFarmerName(el.value); });
});
document.querySelectorAll("input.titlecase").forEach(el => {
  el.addEventListener("blur", () => { el.value = toTitleCase(el.value); });
});

// Upload images to Cloudinary
async function uploadImages(files, farmerId) {
  const urls = [];
  for (const file of files) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    fd.append("folder", `farmers/${farmerId}`);
    const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
    const data = await res.json();
    if (data.secure_url) urls.push(data.secure_url);
    else throw new Error("Upload failed: " + file.name);
  }
  return urls;
}

// ════════════════════════════════════════════════════════════════════════════
// LOAD FARMERS INTO ALL DATALISTS
// ════════════════════════════════════════════════════════════════════════════
const datalistIds = ["farmerList", "farmerListMicrolot", "farmerListEdit"];
let allFarmerNames = []; // cache for edit lookup

async function loadFarmers() {
  const snap = await getDocs(collection(db, "farmers"));
  snap.forEach(d => {
    const name = d.data().name;
    allFarmerNames.push({ name, id: d.id });
    datalistIds.forEach(listId => {
      const list = document.getElementById(listId);
      if (!list) return;
      const opt = document.createElement("option");
      opt.value = name;
      list.appendChild(opt);
    });
  });
}
loadFarmers();

// ════════════════════════════════════════════════════════════════════════════
// TAB SWITCHING
// ════════════════════════════════════════════════════════════════════════════
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

// ════════════════════════════════════════════════════════════════════════════
// IMAGE PREVIEW (Add Farmer)
// ════════════════════════════════════════════════════════════════════════════
function setupImagePreview(inputId, previewId) {
  document.getElementById(inputId).addEventListener("change", function () {
    const preview = document.getElementById(previewId);
    preview.innerHTML = "";
    if (this.files.length > 4) {
      showToast("Please select maximum 4 images", "error");
      this.value = "";
      return;
    }
    Array.from(this.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });
}
setupImagePreview("farmerImages", "imagePreview");
setupImagePreview("ef_farmerImages", "ef_imagePreview");

// ════════════════════════════════════════════════════════════════════════════
// TAB 1 — SAVE FARMER
// ════════════════════════════════════════════════════════════════════════════
document.getElementById("saveFarmerBtn").addEventListener("click", async () => {
  const required = [
    { id: "name",       label: "Farmer Full Name" },
    { id: "mothername", label: "Mother's Name" },
    { id: "age",        label: "Age" },
    { id: "region",     label: "Region" },
    { id: "village",    label: "Village" },
    { id: "story",      label: "Farmer Story" },
  ];
  if (!validateFields(required)) { showToast("Please fill in all required fields", "error"); return; }

  const btn = document.getElementById("saveFarmerBtn");
  btn.disabled = true; btn.textContent = "Saving…";

  try {
    const name      = formatFarmerName(document.getElementById("name").value);
    const farmerId  = toFarmerId(name);
    const imageFiles = document.getElementById("farmerImages").files;
    const imageUrls  = imageFiles.length ? await uploadImages(imageFiles, farmerId) : [];

    await setDoc(doc(db, "farmers", farmerId), {
      name,
      mothername:     toTitleCase(document.getElementById("mothername").value),
      spousename:     toTitleCase(document.getElementById("spousename").value),
      age:            Number(document.getElementById("age").value),
      altitude:       Number(document.getElementById("altitude").value) || 0,
      landsize:       Number(document.getElementById("landsize").value) || 0,
      numbersofchild: Number(document.getElementById("numbersofchild").value) || 0,
      region:         document.getElementById("region").value,
      village:        document.getElementById("village").value.trim(),
      plantationarea: document.getElementById("plantationarea").value.trim(),
      enviromental:   document.getElementById("enviromental").value.trim(),
      story:          document.getElementById("story").value.trim(),
      images:         imageUrls,
      updatedAt:      new Date().toISOString(),
    }, { merge: true });

    showToast("✅ Farmer saved successfully!");
    // Optionally clear: document.getElementById("tab-addFarmer").querySelectorAll("input,textarea,select").forEach(el=>el.value="");
  } catch (err) {
    console.error(err);
    showToast("❌ " + err.message, "error");
  } finally {
    btn.disabled = false; btn.textContent = "💾 Save Farmer Profile";
  }
});

// ════════════════════════════════════════════════════════════════════════════
// TAB 2 — SAVE MICROLOT
// ════════════════════════════════════════════════════════════════════════════
document.getElementById("saveMicrolotBtn").addEventListener("click", async () => {
  const required = [
    { id: "microlotFarmerName", label: "Farmer Name" },
    { id: "lotId",    label: "Lot ID" },
    { id: "process",  label: "Process" },
    { id: "score",    label: "Score" },
    { id: "quantity", label: "Quantity" },
    { id: "price",    label: "Price" },
  ];
  if (!validateFields(required)) { showToast("Please fill in all required fields", "error"); return; }

  const btn = document.getElementById("saveMicrolotBtn");
  btn.disabled = true; btn.textContent = "Saving…";

  try {
    const farmerName = document.getElementById("microlotFarmerName").value.trim();
    const farmerId   = toFarmerId(farmerName);

    await addDoc(collection(db, "microlot"), {
      lotId:      document.getElementById("lotId").value.trim(),
      farmerId,
      farmerName,
      process:    document.getElementById("process").value.trim(),
      cupping:    document.getElementById("cupping").value.trim(),
      score:      Number(document.getElementById("score").value),
      quantity:   Number(document.getElementById("quantity").value),
      price:      Number(document.getElementById("price").value),
      status:     document.getElementById("newLotStatus").value,
      createdAt:  new Date().toISOString(),
    });

    showToast("✅ Microlot saved successfully!");
    ["microlotFarmerName","lotId","process","cupping","score","quantity","price"].forEach(id => {
      document.getElementById(id).value = "";
    });
    document.getElementById("newLotStatus").value = "available";
  } catch (err) {
    console.error(err);
    showToast("❌ " + err.message, "error");
  } finally {
    btn.disabled = false; btn.textContent = "💾 Save Microlot";
  }
});

// ════════════════════════════════════════════════════════════════════════════
// TAB 3 — EDIT FARMER
// ════════════════════════════════════════════════════════════════════════════
document.getElementById("loadFarmerBtn").addEventListener("click", async () => {
  const search   = document.getElementById("editFarmerSearch").value.trim().toUpperCase();
  const notFound = document.getElementById("editFarmerNotFound");
  const fields   = document.getElementById("editFarmerFields");
  notFound.classList.add("hidden");
  fields.classList.add("hidden");

  if (!search) { showToast("Enter a farmer name to search", "error"); return; }

  // Find matching farmer (name is stored uppercase)
  const snap = await getDocs(collection(db, "farmers"));
  let farmerDoc = null;
  snap.forEach(d => {
    if (d.data().name === search) farmerDoc = d;
  });

  if (!farmerDoc) { notFound.classList.remove("hidden"); return; }

  const data = farmerDoc.data();
  document.getElementById("ef_farmerId").value       = farmerDoc.id;
  document.getElementById("ef_name").value           = data.name || "";
  document.getElementById("ef_mothername").value     = data.mothername || "";
  document.getElementById("ef_spousename").value     = data.spousename || "";
  document.getElementById("ef_age").value            = data.age || "";
  document.getElementById("ef_altitude").value       = data.altitude || "";
  document.getElementById("ef_landsize").value       = data.landsize || "";
  document.getElementById("ef_numbersofchild").value = data.numbersofchild || "";
  document.getElementById("ef_region").value         = data.region || "";
  document.getElementById("ef_village").value        = data.village || "";
  document.getElementById("ef_plantationarea").value = data.plantationarea || "";
  document.getElementById("ef_enviromental").value   = data.enviromental || "";
  document.getElementById("ef_story").value          = data.story || "";

  // Show existing images
  const existingDiv = document.getElementById("ef_existingImages");
  existingDiv.innerHTML = "";
  if (data.images && data.images.length) {
    const label = document.createElement("p");
    label.textContent = "Current images:";
    existingDiv.appendChild(label);
    data.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      existingDiv.appendChild(img);
    });
  }

  fields.classList.remove("hidden");
  fields.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("updateFarmerBtn").addEventListener("click", async () => {
  const required = [
    { id: "ef_name",       label: "Farmer Full Name" },
    { id: "ef_mothername", label: "Mother's Name" },
    { id: "ef_age",        label: "Age" },
    { id: "ef_region",     label: "Region" },
    { id: "ef_village",    label: "Village" },
    { id: "ef_story",      label: "Farmer Story" },
  ];
  if (!validateFields(required)) { showToast("Please fill in all required fields", "error"); return; }

  const btn = document.getElementById("updateFarmerBtn");
  btn.disabled = true; btn.textContent = "Updating…";

  try {
    const farmerId   = document.getElementById("ef_farmerId").value;
    const imageFiles = document.getElementById("ef_farmerImages").files;

    // If new images selected → upload and replace; else keep existing
    let imageUrls;
    if (imageFiles.length > 0) {
      if (imageFiles.length > 4) { showToast("Max 4 images allowed", "error"); btn.disabled = false; btn.textContent = "💾 Update Farmer"; return; }
      imageUrls = await uploadImages(imageFiles, farmerId);
    } else {
      // keep whatever is stored
      const snap = await getDoc(doc(db, "farmers", farmerId));
      imageUrls  = snap.exists() ? (snap.data().images || []) : [];
    }

    await setDoc(doc(db, "farmers", farmerId), {
      name:           formatFarmerName(document.getElementById("ef_name").value),
      mothername:     toTitleCase(document.getElementById("ef_mothername").value),
      spousename:     toTitleCase(document.getElementById("ef_spousename").value),
      age:            Number(document.getElementById("ef_age").value),
      altitude:       Number(document.getElementById("ef_altitude").value) || 0,
      landsize:       Number(document.getElementById("ef_landsize").value) || 0,
      numbersofchild: Number(document.getElementById("ef_numbersofchild").value) || 0,
      region:         document.getElementById("ef_region").value,
      village:        document.getElementById("ef_village").value.trim(),
      plantationarea: document.getElementById("ef_plantationarea").value.trim(),
      enviromental:   document.getElementById("ef_enviromental").value.trim(),
      story:          document.getElementById("ef_story").value.trim(),
      images:         imageUrls,
      updatedAt:      new Date().toISOString(),
    }, { merge: true });

    showToast("✅ Farmer updated successfully!");
  } catch (err) {
    console.error(err);
    showToast("❌ " + err.message, "error");
  } finally {
    btn.disabled = false; btn.textContent = "💾 Update Farmer";
  }
});

// ════════════════════════════════════════════════════════════════════════════
// TAB 4 — EDIT MICROLOT
// ════════════════════════════════════════════════════════════════════════════
document.getElementById("loadLotBtn").addEventListener("click", async () => {
  const search   = document.getElementById("editLotSearch").value.trim();
  const notFound = document.getElementById("editLotNotFound");
  const fields   = document.getElementById("editLotFields");
  notFound.classList.add("hidden");
  fields.classList.add("hidden");

  if (!search) { showToast("Enter a Lot ID to search", "error"); return; }

  // Query microlot collection for matching lotId
  const q    = query(collection(db, "microlot"), where("lotId", "==", search));
  const snap = await getDocs(q);

  if (snap.empty) { notFound.classList.remove("hidden"); return; }

  const lotDoc = snap.docs[0];
  const data   = lotDoc.data();

  document.getElementById("el_docId").value      = lotDoc.id;
  document.getElementById("el_lotId").value      = data.lotId || "";
  document.getElementById("el_farmerName").value = data.farmerName || data.farmerId || "";
  document.getElementById("el_process").value    = data.process || "";
  document.getElementById("el_cupping").value    = data.cupping || "";
  document.getElementById("el_score").value      = data.score || "";
  document.getElementById("el_quantity").value   = data.quantity || "";
  document.getElementById("el_price").value      = data.price || "";
  document.getElementById("el_status").value     = data.status || "available";

  fields.classList.remove("hidden");
  fields.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("updateLotBtn").addEventListener("click", async () => {
  const required = [
    { id: "el_quantity", label: "Quantity" },
    { id: "el_price",    label: "Price" },
    { id: "el_status",   label: "Status" },
  ];
  if (!validateFields(required)) { showToast("Please fill in all required fields", "error"); return; }

  const btn = document.getElementById("updateLotBtn");
  btn.disabled = true; btn.textContent = "Updating…";

  try {
    const docId = document.getElementById("el_docId").value;

    await updateDoc(doc(db, "microlot", docId), {
      process:   document.getElementById("el_process").value.trim(),
      cupping:   document.getElementById("el_cupping").value.trim(),
      score:     Number(document.getElementById("el_score").value),
      quantity:  Number(document.getElementById("el_quantity").value),
      price:     Number(document.getElementById("el_price").value),
      status:    document.getElementById("el_status").value,
      updatedAt: new Date().toISOString(),
    });

    showToast("✅ Microlot updated successfully!");
  } catch (err) {
    console.error(err);
    showToast("❌ " + err.message, "error");
  } finally {
    btn.disabled = false; btn.textContent = "💾 Update Microlot";
  }
});

// ════════════════════════════════════════════════════════════════════════════
// TAB 5 — IMPORT JSON
// ════════════════════════════════════════════════════════════════════════════

let parsedFarmers = [];

document.getElementById("parseJsonBtn").addEventListener("click", () => {
  const fileInput = document.getElementById("jsonFile");
  const file      = fileInput.files[0];

  if (!file) {
    showToast("Please select a JSON file", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      const data    = JSON.parse(content);

      // Handle both array and single object
      parsedFarmers = Array.isArray(data) ? data : [data];

      if (parsedFarmers.length === 0) {
        showToast("No valid farmer records found", "error");
        return;
      }

      // Show preview
      showJsonPreview(parsedFarmers);
      showToast(`✅ Parsed ${parsedFarmers.length} farmer(s)`, "success");

      // Enable import button
      document.getElementById("importJsonBtn").disabled = false;

    } catch (err) {
      showToast("❌ Invalid JSON: " + err.message, "error");
      parsedFarmers = [];
    }
  };
  reader.readAsText(file);
});

function showJsonPreview(farmers) {
  const preview     = document.getElementById("jsonPreview");
  const count       = document.getElementById("previewCount");
  const list        = document.getElementById("previewList");
  
  count.textContent = farmers.length;
  list.innerHTML    = "";

  farmers.forEach(f => {
    const item = document.createElement("div");
    item.className = "preview-item";
    item.innerHTML = `
      <div>
        <div class="preview-item-name">${f.name || f.document_id || "Unnamed"}</div>
        <div class="preview-item-meta">${f.region || "—"} • ${f.village || "—"}</div>
      </div>
      <span class="preview-item-status">Ready</span>
    `;
    list.appendChild(item);
  });

  preview.classList.remove("hidden");
}

document.getElementById("importJsonBtn").addEventListener("click", async () => {
  if (parsedFarmers.length === 0) {
    showToast("No farmers to import", "error");
    return;
  }

  const btn = document.getElementById("importJsonBtn");
  btn.disabled = true;
  btn.textContent = "Importing…";

  let imported = 0;
  let failed   = 0;

  for (const f of parsedFarmers) {
    try {
      // Use document_id as the ID, or derive from name
      const docId = (f.document_id || f.name || "").toLowerCase().replace(/\s+/g, "_");
      
      if (!docId) {
        failed++;
        continue;
      }

      // Format names
      const name = f.name ? formatFarmerName(f.name) : "";
      const mothername = f.mothername ? toTitleCase(f.mothername) : "";
      const spousename = f.spousename ? toTitleCase(f.spousename) : "";

      // Save to Firestore
      await setDoc(doc(db, "farmers", docId), {
        name,
        mothername,
        spousename,
        age:             Number(f.age) || 0,
        altitude:        Number(f.altitude) || 0,
        landsize:        Number(f.landsize) || 0,
        numbersofchild:  Number(f.numbersofchild) || 0,
        region:          f.region || "",
        village:         f.village || "",
        plantationarea:  f.plantationarea || "",
        enviromental:    f.enviromental || "",
        story:           f.story || "",
        images:          f.images || [],  // If JSON has image URLs
        updatedAt:       new Date().toISOString(),
      }, { merge: true });

      imported++;
    } catch (err) {
      console.error("Failed to import farmer:", f.name, err);
      failed++;
    }
  }

  showToast(`✅ Imported ${imported} farmer(s)${failed ? ` | ${failed} failed` : ""}`);
  
  // Reset
  document.getElementById("jsonFile").value = "";
  parsedFarmers = [];
  document.getElementById("jsonPreview").classList.add("hidden");
  btn.disabled = true;
  btn.textContent = "⬆️ Import All";
});
