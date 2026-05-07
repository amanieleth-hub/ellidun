document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     AIRTABLE (SAFE VERSION)
  ========================== */

  const AIRTABLE_TOKEN = "PASTE_YOUR_TOKEN";
  const BASE_ID = "PASTE_BASE_ID";
  const TABLE_NAME = "Lots";

  const container = document.getElementById("lots");

  if (container) {
    fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
    })
    .then(res => res.json())
    .then(data => {

      if (!data.records) return;

      data.records.forEach(r => {
        const f = r.fields;

        container.innerHTML += `
          <div class="lot-card">
            <img src="${f.Image?.[0]?.url || ''}">
            <div class="lot-content">
              <span class="badge">Available</span>
              <span class="sca">${f.SCA || ''} SCA</span>
              <h3>${f.Name || ''}</h3>
              <p>${f.Farm || ''} • ${f.Country || ''}</p>
              <p>${f.Notes || ''}</p>
              <div class="lot-bottom">
                <div>${f.Process || ''}</div>
                <div>${f.Available || ''}kg</div>
                <div>$${f.Price || ''}/kg</div>
              </div>
            </div>
          </div>
        `;
      });

    })
    .catch(err => console.log("Airtable error:", err));
  }

  /* =========================
     HAMBURGER MENU (SAFE)
  ========================== */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlayBg = document.getElementById("overlayBg");

  if (!hamburger || !navMenu || !overlayBg) return;

  function openMenu(){
    navMenu.classList.add("open");
    hamburger.classList.add("active");
    overlayBg.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeMenu(){
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    overlayBg.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  hamburger.addEventListener("click", () => {
    navMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlayBg.addEventListener("click", closeMenu);

  document.querySelectorAll("#navMenu a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });

  /* =========================
     SMOOTH SCROLL
  ========================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});