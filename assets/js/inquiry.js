// ===============================
// ELLIDUN INQUIRY SYSTEM
// ===============================
import { db } from "assets/js/firebase.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



// ===============================
// STATE VARIABLES
// ===============================
let selectedLotId = "";
let generatedNoteText = "";

// ===============================
// CLEAN LOT ID INPUT
// ===============================
function cleanLotId(input) {
  return input
    .replace(/[^a-zA-Z0-9]/g, "") // remove symbols/spaces
    .toLowerCase();
}

// ===============================
// FORMAT PROFESSIONAL NOTE
// ===============================
function buildLotNote(d) {
  return `
Lot Confirmation

This lot "${d.lotId}" was prepared by ${d.farmerName}, one of the dedicated smallholder farmers we proudly work with at Ellidun Microlot Coffee.

The farm is located in ${d.kebele}, ${d.region}, at an altitude of ${d.altitude} meters above sea level.

The coffee was processed using the ${d.process} method and is characterized by ${d.cupNote}, achieving a cupping score of ${d.cuppingScore}.

We currently have ${d.quantity} bags (60kg each) available.

Our price for this lot is ${d.price} USD per pound.

We’re delighted to prepare a sample for you. Please confirm your inquiry before the remaining quantity is reserved.
`.trim();
}

// ===============================
// CONFIRM LOT BUTTON
// ===============================
document.getElementById("confirmLot").addEventListener("click", async () => {
  const rawInput = document.getElementById("lotInput").value;
  const lotId = cleanLotId(rawInput);

  if (!lotId) {
    alert("Please enter a valid Lot ID.");
    return;
  }

  try {
    const ref = doc(db, "microlots", lotId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Lot not found. Please check the ID.");
      return;
    }

    const data = snap.data();

    selectedLotId = data.lotId;
    generatedNoteText = buildLotNote(data);

    const noteDiv = document.getElementById("lotNote");
    noteDiv.style.display = "block";
    noteDiv.innerHTML = generatedNoteText.replace(/\n/g, "<br>");

  } catch (error) {
    console.error("Error fetching lot:", error);
    alert("Something went wrong while fetching lot data.");
  }
});

// ===============================
// FORM SUBMISSION → EMAIL
// ===============================
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!selectedLotId) {
    alert("Please confirm a Lot ID first.");
    return;
  }

  const name = this.elements[0].value;
  const email = this.elements[1].value;
  const country = this.elements[2].value;
  const message = this.elements[3].value;

  const emailBody = `
ELLIDUN MICROLot INQUIRY

Name: ${name}
Email: ${email}
Country: ${country}

Customer Message:
${message}

--------------------------------
LOT DETAILS
--------------------------------
${generatedNoteText}
  `;

  const subject = `Sample request for ${selectedLotId}`;

  window.location.href =
    `mailto:amanieleth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
});
