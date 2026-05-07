// ==========================
// HAMBURGER MENU
// ==========================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.onclick = () => {
  navMenu.classList.toggle("show");
};


// ==========================
// FARM CARD SCROLL REVEAL
// ==========================
const cards = document.querySelectorAll(".farm-card");

function revealCards(){
  cards.forEach(card => {
    if(card.getBoundingClientRect().top < window.innerHeight * 0.85){
      card.classList.add("show");
    }
  });
}


// ==========================
// STATS ANIMATION (ONLY ONCE)
// ==========================
const statsSection = document.querySelector(".stats");
const counters = document.querySelectorAll(".stats h2");

let statsStarted = false;

function animateStats(){
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = target / 80;

    function update(){
      count += speed;
      if(count < target){
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + "+";
      }
    }

    update();
  });
}


// ==========================
// MASTER SCROLL HANDLER
// ==========================
function onScroll(){
  revealCards();

  const statsTop = statsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.85;

  if(statsTop < triggerPoint){
    statsSection.classList.add("show");

    if(!statsStarted){
      animateStats();
      statsStarted = true;
    }
  }
}

window.addEventListener("scroll", onScroll);
function revealOnScroll(){
  const items = document.querySelectorAll(".reveal");

  items.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight * 0.85){
      el.classList.add("show");
    }
  });
}
// =========================
// FARMERS REVEAL ON SCROLL
// =========================

const farmCards = document.querySelectorAll(".farm-card");

function revealFarmers(){
  farmCards.forEach(card=>{
    const top = card.getBoundingClientRect().top;
    if(top < window.innerHeight * 0.85){
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealFarmers);
window.addEventListener("load", ()=>{
  farmCards.forEach(c=>{
    c.style.opacity = "0";
    c.style.transform = "translateY(40px)";
    c.style.transition = "0.8s ease";
  });
});
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
