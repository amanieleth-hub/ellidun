// ================= HAMBURGER =================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// ================= SAFE REVEAL SYSTEM =================
const farmCards = document.querySelectorAll(".farm-card");
const revealItems = document.querySelectorAll(".reveal");
const statsSection = document.querySelector(".stats");
const counters = document.querySelectorAll(".stats h2");

let statsStarted = false;

// Reveal elements
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  farmCards.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });

  revealItems.forEach(el => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });

  // stats
  if (statsSection) {
    const statsTop = statsSection.getBoundingClientRect().top;
    if (statsTop < trigger) {
      statsSection.classList.add("show");

      if (!statsStarted) {
        counters.forEach(counter => {
          const target = +counter.getAttribute("data-target");
          let count = 0;
          const step = target / 80;

          function update() {
            count += step;
            if (count < target) {
              counter.innerText = Math.floor(count);
              requestAnimationFrame(update);
            } else {
              counter.innerText = target + "+";
            }
          }

          update();
        });

        statsStarted = true;
      }
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
