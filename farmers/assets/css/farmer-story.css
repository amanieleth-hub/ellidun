/* ═══════════════════════════════════════════════════════════════════════════
   farmer-story.css
   Red coffee cherry farm aesthetic — deep crimson, parchment, forest green
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
  /* Palette */
  --cherry:       #8b1a1a;
  --cherry-dark:  #5c0f0f;
  --cherry-mid:   #b03030;
  --cherry-glow:  rgba(139,26,26,0.18);
  --parchment:    #f8f2e6;
  --parchment-dk: #ede4ce;
  --ink:          #1e130c;
  --ink-soft:     #3d2b1f;
  --ink-muted:    #7a5c48;
  --sage:         #3a5c3a;
  --sage-light:   #d4e8d0;
  --gold:         #c9922a;
  --gold-light:   #f5e4bc;
  --white:        #fff;

  /* Type */
  --serif:  'Cormorant Garamond', Georgia, serif;
  --sans:   'Jost', sans-serif;

  /* Spacing */
  --max:    1120px;
  --pad:    clamp(1rem, 5vw, 3rem);
}

/* ── Base ───────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--sans);
  background: var(--parchment);
  color: var(--ink);
  overflow-x: hidden;
}

img { display: block; max-width: 100%; }
a   { color: inherit; text-decoration: none; }

/* ── Loading ────────────────────────────────────────────────────────────── */
.loading-screen {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--ink-muted);
  font-family: var(--sans);
  font-size: 1rem;
}
.loading-cherry {
  font-size: 3rem;
  animation: cherryBob 1.2s ease-in-out infinite;
}
@keyframes cherryBob {
  0%,100% { transform: translateY(0);    }
  50%      { transform: translateY(-10px); }
}

.error-screen {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.1rem;
  color: var(--ink-muted);
}
.btn-back-error {
  padding: 0.65rem 1.4rem;
  background: var(--cherry);
  color: #fff;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s;
}
.btn-back-error:hover { background: var(--cherry-dark); }

.hidden { display: none !important; }

/* ── Shared label ────────────────────────────────────────────────────────── */
.section-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--sans);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cherry);
  margin-bottom: 0.85rem;
}
.cherry-dot { font-size: 0.55rem; color: var(--cherry); }

/* ══════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  height: 92vh;
  min-height: 540px;
  max-height: 860px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.06);
  transition: transform 8s ease;
}
.hero:hover .hero-bg { transform: scale(1); }

/* deep gradient overlay — dark at bottom, lighter at top */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(30,19,12,0.25) 0%,
    rgba(30,19,12,0.15) 40%,
    rgba(92,15,15,0.75) 75%,
    rgba(30,19,12,0.95) 100%
  );
}

/* film grain texture via SVG noise */
.hero-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--pad) 3.5rem;
  animation: heroReveal 0.9s ease both;
}
@keyframes heroReveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.btn-back {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.45rem 1rem;
  border-radius: 2px;
  margin-bottom: 1.4rem;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.btn-back:hover { color: #fff; border-color: #fff; background: rgba(255,255,255,0.08); }

.hero-tag {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.6rem;
}

.hero-name {
  font-family: var(--serif);
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 24px rgba(0,0,0,0.4);
}

.hero-region {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
}

/* scroll cue chevrons */
.scroll-cue {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.scroll-cue span {
  display: block;
  width: 12px;
  height: 12px;
  border-right: 2px solid rgba(255,255,255,0.5);
  border-bottom: 2px solid rgba(255,255,255,0.5);
  transform: rotate(45deg);
  animation: scrollCue 1.6s ease-in-out infinite;
}
.scroll-cue span:nth-child(2) { animation-delay: 0.2s; opacity: 0.6; }
.scroll-cue span:nth-child(3) { animation-delay: 0.4s; opacity: 0.3; }
@keyframes scrollCue {
  0%,100% { opacity: 0.7; } 50% { opacity: 0.1; }
}

/* ══════════════════════════════════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════════════════════════════════ */
.gallery-section {
  background: var(--ink);
  padding: 3rem var(--pad);
}

.gallery-label {
  max-width: var(--max);
  margin: 0 auto 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cherry-mid);
}

.gallery-main {
  max-width: var(--max);
  margin: 0 auto 1rem;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 7;
  background: #111;
}
.gallery-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.35s ease;
}

.gallery-thumbs {
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.gallery-thumbs img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0.55;
  border: 2px solid transparent;
  transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
}
.gallery-thumbs img:hover   { opacity: 0.85; transform: translateY(-2px); }
.gallery-thumbs img.active  { opacity: 1; border-color: var(--cherry-mid); }

/* ══════════════════════════════════════════════════════════════════════════
   STORY + DETAILS
══════════════════════════════════════════════════════════════════════════ */
.story-section {
  background: var(--parchment);
  padding: 5rem var(--pad);
}

.story-layout {
  max-width: var(--max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;
  align-items: start;
}

/* Story text */
.story-pull {
  font-family: var(--serif);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-style: italic;
  font-weight: 600;
  line-height: 1.35;
  color: var(--cherry-dark);
  border-left: 4px solid var(--cherry);
  padding-left: 1.4rem;
  margin-bottom: 1.8rem;
}

.story-body {
  font-size: 1.02rem;
  line-height: 1.85;
  color: var(--ink-soft);
  font-weight: 300;
}

.env-block {
  margin-top: 2.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--sage-light);
  border-left: 4px solid var(--sage);
  border-radius: 4px;
  padding: 1.2rem 1.4rem;
}
.env-icon { font-size: 1.5rem; line-height: 1; }
.env-block h4 {
  font-family: var(--sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 0.4rem;
}
.env-block p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--ink-soft);
}

/* Stats sidebar */
.story-stats { position: sticky; top: 2rem; }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background: #fff;
  border: 1px solid var(--parchment-dk);
  border-radius: 6px;
  padding: 0.9rem 1rem;
  box-shadow: 0 1px 6px rgba(139,26,26,0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover {
  box-shadow: 0 4px 16px rgba(139,26,26,0.1);
  transform: translateY(-2px);
}
.stat-card.full { grid-column: 1 / -1; }

.stat-icon  { font-size: 1.1rem; margin-bottom: 0.1rem; }
.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.stat-value {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--cherry-dark);
  line-height: 1.2;
}

/* ══════════════════════════════════════════════════════════════════════════
   MICROLOTS
══════════════════════════════════════════════════════════════════════════ */
.lots-section {
  background: var(--parchment-dk);
  padding: 5rem var(--pad);
}

.lots-header {
  max-width: var(--max);
  margin: 0 auto 2.5rem;
}
.lots-header h2 {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--ink);
}

.lots-grid {
  max-width: var(--max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
}

.lot-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid var(--parchment-dk);
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(139,26,26,0.06);
  transition: box-shadow 0.25s, transform 0.25s;
  animation: cardIn 0.5s ease both;
}
.lot-card:hover {
  box-shadow: 0 8px 28px rgba(139,26,26,0.14);
  transform: translateY(-4px);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.lot-card-top {
  background: var(--cherry-dark);
  padding: 1rem 1.2rem 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.lot-id {
  font-family: var(--sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}
.lot-process {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-top: 0.15rem;
}

/* status badge */
.lot-status {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.28rem 0.65rem;
  border-radius: 20px;
  white-space: nowrap;
}
.status-available { background: #d4f5d4; color: #1a6b1a; }
.status-reserved  { background: var(--gold-light); color: #7a4e00; }
.status-sold      { background: #f0d0d0; color: #8b1a1a; }

.lot-card-body {
  padding: 1.1rem 1.2rem 1.3rem;
}

.lot-cupping {
  font-family: var(--serif);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--ink-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.lot-meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}
.lot-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.lot-meta-label {
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.lot-meta-value {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--cherry-dark);
}

.lot-inquiry {
  display: block;
  margin: 1rem 1.2rem 0;
  padding: 0.6rem;
  text-align: center;
  background: var(--cherry);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-bottom: 1.2rem;
  transition: background 0.2s;
  text-decoration: none;
}
.lot-inquiry:hover { background: var(--cherry-dark); }
.lot-inquiry.sold-btn {
  background: #ccc;
  color: #666;
  cursor: default;
  pointer-events: none;
}

.no-lots {
  max-width: var(--max);
  margin: 0 auto;
  text-align: center;
  color: var(--ink-muted);
  font-style: italic;
  font-size: 1rem;
  padding: 2rem;
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA FOOTER BAND
══════════════════════════════════════════════════════════════════════════ */
.cta-section {
  position: relative;
  background: var(--cherry-dark);
  padding: 5rem var(--pad);
  text-align: center;
  overflow: hidden;
}
.cta-grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px;
}
.cta-content { position: relative; z-index: 1; }
.cta-sub {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin-bottom: 0.6rem;
}
.cta-title {
  font-family: var(--serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.8rem;
}
.cta-btn {
  display: inline-block;
  padding: 0.85rem 2.2rem;
  background: var(--gold);
  color: var(--ink);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  border-radius: 3px;
  transition: background 0.2s, transform 0.15s;
}
.cta-btn:hover { background: #e0a83a; transform: translateY(-2px); }

/* ══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════════════════════════════ */
@media (max-width: 860px) {
  .story-layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .story-stats { position: static; }
}

@media (max-width: 600px) {
  .hero { height: 80vh; }

  .gallery-main { aspect-ratio: 4 / 3; }
  .gallery-thumbs img { width: 72px; height: 52px; }

  .stats-grid { grid-template-columns: 1fr 1fr; }

  .lots-grid { grid-template-columns: 1fr; }

  .lot-meta { grid-template-columns: 1fr 1fr; }
  .lot-meta-item:last-child { grid-column: 1 / -1; }
}

@media (max-width: 400px) {
  .stats-grid { grid-template-columns: 1fr; }
  .stat-card.full { grid-column: 1; }
}
