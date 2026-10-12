# Pixel Muse (`pixel-muse`)

- **ID:** `pixel-muse`
- **Category:** Creative Studio
- **Type:** `hero` (Page Type: `hero`, Tags: `hero`)
- **Tier:** Premium
- **Video / Animated Preview:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/pixel_muse_ai_creative_studio.mp4
- **Poster / Image Preview:** https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260820_090437_9eadf986-a1bb-4521-904c-92c26b727790.png&w=1920&q=85
- **Live URL:** `https://motionsites.ai/?prompt=pixel-muse`

## Visual & Architectural DNA (`design_similarity`)

> <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Atelier — AI Creative Studio</title>
  <link href="https://db.onlinewebfonts.com/c/1e129bd49263cbc8354756df5045168f?family=Bodoni" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body {
      font-family: Inter, sans-serif;
      background: #f8f6f1;
      color: #2c2f24;
    }
    a { text-decoration: none; color: inherit; }
    button { border: none; background: none; cursor: pointer; font: inherit; }

    :root {
      --cream: #f8f6f1;
      --cream-notch: #FDFBF7;
      --rose: #d4637a;
      --rose-hover: #c4566c;
      --olive: #2c2f24;
      --olive-darker: #1f2118;
      --line-x: #e0ddd6;
      --line-y: #e8e5de;
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
      --max: 1400px;
    }

    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes reveal-line-x {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes reveal-line-y {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
    @keyframes nav-slide-down {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in-up {
      opacity: 0;
      animation: fade-in-up 0.8s var(--ease) forwards;
    }
    .animate-fade-in {
      opacity: 0;
      animation: fade-in 1s ease forwards;
    }
    .animate-reveal-line-x {
      transform: scaleX(0);
      animation: reveal-line-x 0.8s var(--ease) forwards;
    }
    .animate-reveal-line-y {
      transform: scaleY(0);
      animation: reveal-line-y 0.8s var(--ease) forwards;
    }
    .animate-nav-slide-down {
      opacity: 0;
      animation: nav-slide-down 0.6s var(--ease) forwards;
    }

    /* NAV */
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      border-bottom: 1px solid var(--line-y);
    }
    .nav-inner {
      max-width: var(--max);
      margin: 0 auto;
      padding: 0 24px;
    }
    .nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .nav-links {
      display: none;
      flex: 1;
      align-items: center;
      justify-content: center;
      list-style: none;
      gap: 24px;
    }
    .nav-links a {
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.15em;
      color: var(--olive);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--olive-darker); }
    .nav-login-wrap { display: none; }

    .btn-login,
    .btn-login-mobile {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--olive);
      color: #fff;
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.15em;
      padding: 10px 20px;
      transition: background 0.2s;
    }
    .btn-login:hover,
    .btn-login-mobile:hover { background: var(--olive-darker); }
    .btn-login svg,
    .btn-login-mobile svg { display: block; }

    .notch {
      position: absolute;
      top: 0; right: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
    .notch-sm { width: 10px; height: 10px; }
    .notch-lg { width: 14px; height: 14px; }
    .notch span:nth-child(1),
    .notch span:nth-child(4) { background: transparent; }
    .notch span:nth-child(2) { background: #fff; }
    .notch span:nth-child(3) { background: var(--cream-notch); }

    .hamburger {
      margin-left: auto;
      position: relative;
      z-index: 50;
      padding: 8px;
      color: var(--olive);
    }
    .icon-box {
      position: relative;
      width: 24px;
      height: 24px;
    }
    .icon-box svg {
      position: absolute;
      inset: 0;
      transition: opacity 0.3s, transform 0.3s;
    }
    .icon-menu { opacity: 1; transform: rotate(0) scale(1); }
    .icon-x { opacity: 0; transform: rotate(-90deg) scale(0.75); }
    .nav.is-open .icon-menu { opacity: 0; transform: rotate(90deg) scale(0.75); }
    .nav.is-open .icon-x { opacity: 1; transform: rotate(0) scale(1); }

    .overlay {
      position: fixed;
      inset: 0;
      background: var(--cream);
      z-index: 40;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s var(--ease);
    }
    .nav.is-open .overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .overlay ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .overlay a {
      font-family: "Space Mono", monospace;
      font-size: 14px;
      letter-spacing: 0.2em;
      color: var(--olive);
      transition: color 0.2s;
    }
    .overlay a:hover { color: var(--olive-darker); }
    .overlay li {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
    }
    .nav.is-open .overlay li {
      opacity: 1;
      transform: translateY(0);
    }
    .overlay li:nth-child(1) { transition-delay: 80ms; }
    .overlay li:nth-child(2) { transition-delay: 160ms; }
    .overlay li:nth-child(3) { transition-delay: 240ms; }
    .overlay li:nth-child(4) { transition-delay: 320ms; }
    .overlay li:nth-child(5) { transition-delay: 400ms; }
    .overlay li:nth-child(6) { transition-delay: 480ms; margin-top: 16px; }
    .nav:not(.is-open) .overlay li { transition-delay: 0ms; }
    .btn-login-mobile { padding: 12px 24px; }

    /* HERO */
    .hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      overflow: hidden;
    }
    .hero video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation-delay: 0.1s;
    }
    .line {
      position: absolute;
      z-index: 10;
    }
    .line-top {
      top: 0; left: 0; right: 0;
      height: 1px;
      background: var(--line-x);
      transform-origin: left;
      animation-delay: 0.3s;
    }
    .line-left,
    .line-right {
      top: 0; bottom: 0;
      width: 1px;
      background: var(--line-y);
      transform-origin: top;
    }
    .line-left { left: 24px; animation-delay: 0.5s; }
    .line-right { right: 24px; animation-delay: 0.6s; }
    .line-bottom {
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: var(--line-x);
      transform-origin: right;
      animation-delay: 0.7s;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      height: 100%;
      max-width: var(--max);
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-copy {
      max-width: 42rem;
      padding-top: 80px;
    }
    .hero h1 {
      font-family: Bodoni, serif;
      font-weight: 400;
      font-size: 2.75rem;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--olive);
      animation-delay: 0.4s;
    }
    .hero h1 .break { display: none; }
    .tagline {
      margin-top: 24px;
      font-family: Inter, sans-serif;
      font-size: 14px;
      letter-spacing: 0.025em;
      color: rgba(44, 47, 36, 0.8);
      animation-delay: 0.6s;
    }
    .body-copy {
      margin-top: 20px;
      font-family: Inter, sans-serif;
      font-size: 14px;
      line-height: 1.625;
      max-width: 28rem;
      color: rgba(44, 47, 36, 0.7);
      animation-delay: 0.8s;
    }
    .cta-wrap {
      margin-top: 32px;
      animation-delay: 1s;
    }
    .btn-cta {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: var(--rose);
      color: #fff;
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.2em;
      padding: 16px 28px;
      transition: background 0.2s;
    }
    .btn-cta:hover { background: var(--rose-hover); }

    @media (min-width: 640px) {
      .hero h1 { font-size: 3.5rem; }
      .hero h1 .break { display: block; }
    }
    @media (min-width: 768px) {
      .nav-inner { padding: 0 40px; }
      .nav-bar { height: 80px; }
      .nav-links { display: flex; }
      .nav-login-wrap { display: block; }
      .hamburger, .overlay { display: none; }
      .line-left { left: 40px; }
      .line-right { right: 40px; }
      .hero-content { padding: 0 40px; }
      .hero-copy { padding-top: 0; }
      .hero h1 { font-size: 4rem; }
      .tagline { font-size: 16px; }
      .body-copy { font-size: 15px; }
    }
    @media (min-width: 1024px) {
      .nav-inner { padding: 0 64px; }
      .nav-links { gap: 40px; }
      .line-left { left: 64px; }
      .line-right { right: 64px; }
      .hero-content { padding: 0 64px; }
      .hero h1 { font-size: 4.5rem; }
    }
  </style>
</head>
<body>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <div class="nav-bar">
        <ul class="nav-links">
          <li><a class="animate-nav-slide-down" style="animation-delay:0.2s" href="#feature">FEATURE</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.28s" href="#the-process">THE PROCESS</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.36s" href="#gallery">GALLERY</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.44s" href="#pricing">PRICING</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.52s" href="#story">STORY</a></li>
        </ul>

        <div class="nav-login-wrap animate-nav-slide-down" style="animation-delay:0.7s">
          <a class="btn-login" href="#login">
            LOG IN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span class="notch notch-sm" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          </a>
        </div>

        <button class="hamburger animate-nav-slide-down" style="animation-delay:0.3s" type="button" aria-label="Toggle menu" id="menu-btn">
          <span class="icon-box">
            <svg class="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h16"/></svg>
            <svg class="icon-x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </span>
        </button>
      </div>
    </div>

    <div class="overlay">
      <ul>
        <li><a href="#feature">FEATURE</a></li>
        <li><a href="#the-process">THE PROCESS</a></li>
        <li><a href="#gallery">GALLERY</a></li>
        <li><a href="#pricing">PRICING</a></li>
        <li><a href="#story">STORY</a></li>
        <li>
          <a class="btn-login-mobile" href="#login">
            LOG IN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <video
      class="animate-fade-in"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_214632_c6e637b5-308a-4f13-b06c-354e9dbda842.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>

    <div class="line line-top animate-reveal-line-x"></div>
    <div class="line line-left animate-reveal-line-y"></div>
    <div class="line line-right animate-reveal-line-y"></div>

    <div class="hero-content">
      <div class="hero-copy">
        <h1 class="animate-fade-in-up">Visions before they<span class="break"></span> find their shape</h1>
        <p class="tagline animate-fade-in-up">Think freely. Create boldly.</p>
        <p class="body-copy animate-fade-in-up">An open studio where imagination flows alongside machine insight — built for painters, thinkers, and restless creators turning raw impulses into tangible concepts.</p>
        <div class="cta-wrap animate-fade-in-up">
          <a class="btn-cta" href="#explore">
            ENTER THE STUDIO
            <span class="notch notch-lg" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          </a>
        </div>
      </div>
    </div>

    <div class="line line-bottom animate-reveal-line-x"></div>
  </section>

  <script>
    const nav = document.getElementById("nav");
    const btn = document.getElementById("menu-btn");
    btn.addEventListener("click", () => nav.classList.toggle("is-open"));
    nav.querySelectorAll(".overlay a").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  </script>
</body>
</html>

## Reconstructed Build Prompt

```markdown
Build a high-craft Creative Studio (hero) website titled "Pixel Muse" using React + TypeScript + Vite + Tailwind CSS + Framer Motion (motion/react) + lucide-react.

### Visual Direction & Aesthetic DNA
- **Style & Atmosphere:** <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Atelier — AI Creative Studio</title>
  <link href="https://db.onlinewebfonts.com/c/1e129bd49263cbc8354756df5045168f?family=Bodoni" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body {
      font-family: Inter, sans-serif;
      background: #f8f6f1;
      color: #2c2f24;
    }
    a { text-decoration: none; color: inherit; }
    button { border: none; background: none; cursor: pointer; font: inherit; }

    :root {
      --cream: #f8f6f1;
      --cream-notch: #FDFBF7;
      --rose: #d4637a;
      --rose-hover: #c4566c;
      --olive: #2c2f24;
      --olive-darker: #1f2118;
      --line-x: #e0ddd6;
      --line-y: #e8e5de;
      --ease: cubic-bezier(0.22, 1, 0.36, 1);
      --max: 1400px;
    }

    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes reveal-line-x {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes reveal-line-y {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
    @keyframes nav-slide-down {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in-up {
      opacity: 0;
      animation: fade-in-up 0.8s var(--ease) forwards;
    }
    .animate-fade-in {
      opacity: 0;
      animation: fade-in 1s ease forwards;
    }
    .animate-reveal-line-x {
      transform: scaleX(0);
      animation: reveal-line-x 0.8s var(--ease) forwards;
    }
    .animate-reveal-line-y {
      transform: scaleY(0);
      animation: reveal-line-y 0.8s var(--ease) forwards;
    }
    .animate-nav-slide-down {
      opacity: 0;
      animation: nav-slide-down 0.6s var(--ease) forwards;
    }

    /* NAV */
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      border-bottom: 1px solid var(--line-y);
    }
    .nav-inner {
      max-width: var(--max);
      margin: 0 auto;
      padding: 0 24px;
    }
    .nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .nav-links {
      display: none;
      flex: 1;
      align-items: center;
      justify-content: center;
      list-style: none;
      gap: 24px;
    }
    .nav-links a {
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.15em;
      color: var(--olive);
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--olive-darker); }
    .nav-login-wrap { display: none; }

    .btn-login,
    .btn-login-mobile {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--olive);
      color: #fff;
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.15em;
      padding: 10px 20px;
      transition: background 0.2s;
    }
    .btn-login:hover,
    .btn-login-mobile:hover { background: var(--olive-darker); }
    .btn-login svg,
    .btn-login-mobile svg { display: block; }

    .notch {
      position: absolute;
      top: 0; right: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
    .notch-sm { width: 10px; height: 10px; }
    .notch-lg { width: 14px; height: 14px; }
    .notch span:nth-child(1),
    .notch span:nth-child(4) { background: transparent; }
    .notch span:nth-child(2) { background: #fff; }
    .notch span:nth-child(3) { background: var(--cream-notch); }

    .hamburger {
      margin-left: auto;
      position: relative;
      z-index: 50;
      padding: 8px;
      color: var(--olive);
    }
    .icon-box {
      position: relative;
      width: 24px;
      height: 24px;
    }
    .icon-box svg {
      position: absolute;
      inset: 0;
      transition: opacity 0.3s, transform 0.3s;
    }
    .icon-menu { opacity: 1; transform: rotate(0) scale(1); }
    .icon-x { opacity: 0; transform: rotate(-90deg) scale(0.75); }
    .nav.is-open .icon-menu { opacity: 0; transform: rotate(90deg) scale(0.75); }
    .nav.is-open .icon-x { opacity: 1; transform: rotate(0) scale(1); }

    .overlay {
      position: fixed;
      inset: 0;
      background: var(--cream);
      z-index: 40;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s var(--ease);
    }
    .nav.is-open .overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .overlay ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    .overlay a {
      font-family: "Space Mono", monospace;
      font-size: 14px;
      letter-spacing: 0.2em;
      color: var(--olive);
      transition: color 0.2s;
    }
    .overlay a:hover { color: var(--olive-darker); }
    .overlay li {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
    }
    .nav.is-open .overlay li {
      opacity: 1;
      transform: translateY(0);
    }
    .overlay li:nth-child(1) { transition-delay: 80ms; }
    .overlay li:nth-child(2) { transition-delay: 160ms; }
    .overlay li:nth-child(3) { transition-delay: 240ms; }
    .overlay li:nth-child(4) { transition-delay: 320ms; }
    .overlay li:nth-child(5) { transition-delay: 400ms; }
    .overlay li:nth-child(6) { transition-delay: 480ms; margin-top: 16px; }
    .nav:not(.is-open) .overlay li { transition-delay: 0ms; }
    .btn-login-mobile { padding: 12px 24px; }

    /* HERO */
    .hero {
      position: relative;
      height: 100vh;
      min-height: 700px;
      overflow: hidden;
    }
    .hero video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation-delay: 0.1s;
    }
    .line {
      position: absolute;
      z-index: 10;
    }
    .line-top {
      top: 0; left: 0; right: 0;
      height: 1px;
      background: var(--line-x);
      transform-origin: left;
      animation-delay: 0.3s;
    }
    .line-left,
    .line-right {
      top: 0; bottom: 0;
      width: 1px;
      background: var(--line-y);
      transform-origin: top;
    }
    .line-left { left: 24px; animation-delay: 0.5s; }
    .line-right { right: 24px; animation-delay: 0.6s; }
    .line-bottom {
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: var(--line-x);
      transform-origin: right;
      animation-delay: 0.7s;
    }

    .hero-content {
      position: relative;
      z-index: 10;
      height: 100%;
      max-width: var(--max);
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-copy {
      max-width: 42rem;
      padding-top: 80px;
    }
    .hero h1 {
      font-family: Bodoni, serif;
      font-weight: 400;
      font-size: 2.75rem;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--olive);
      animation-delay: 0.4s;
    }
    .hero h1 .break { display: none; }
    .tagline {
      margin-top: 24px;
      font-family: Inter, sans-serif;
      font-size: 14px;
      letter-spacing: 0.025em;
      color: rgba(44, 47, 36, 0.8);
      animation-delay: 0.6s;
    }
    .body-copy {
      margin-top: 20px;
      font-family: Inter, sans-serif;
      font-size: 14px;
      line-height: 1.625;
      max-width: 28rem;
      color: rgba(44, 47, 36, 0.7);
      animation-delay: 0.8s;
    }
    .cta-wrap {
      margin-top: 32px;
      animation-delay: 1s;
    }
    .btn-cta {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: var(--rose);
      color: #fff;
      font-family: "Space Mono", monospace;
      font-size: 12px;
      letter-spacing: 0.2em;
      padding: 16px 28px;
      transition: background 0.2s;
    }
    .btn-cta:hover { background: var(--rose-hover); }

    @media (min-width: 640px) {
      .hero h1 { font-size: 3.5rem; }
      .hero h1 .break { display: block; }
    }
    @media (min-width: 768px) {
      .nav-inner { padding: 0 40px; }
      .nav-bar { height: 80px; }
      .nav-links { display: flex; }
      .nav-login-wrap { display: block; }
      .hamburger, .overlay { display: none; }
      .line-left { left: 40px; }
      .line-right { right: 40px; }
      .hero-content { padding: 0 40px; }
      .hero-copy { padding-top: 0; }
      .hero h1 { font-size: 4rem; }
      .tagline { font-size: 16px; }
      .body-copy { font-size: 15px; }
    }
    @media (min-width: 1024px) {
      .nav-inner { padding: 0 64px; }
      .nav-links { gap: 40px; }
      .line-left { left: 64px; }
      .line-right { right: 64px; }
      .hero-content { padding: 0 64px; }
      .hero h1 { font-size: 4.5rem; }
    }
  </style>
</head>
<body>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <div class="nav-bar">
        <ul class="nav-links">
          <li><a class="animate-nav-slide-down" style="animation-delay:0.2s" href="#feature">FEATURE</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.28s" href="#the-process">THE PROCESS</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.36s" href="#gallery">GALLERY</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.44s" href="#pricing">PRICING</a></li>
          <li><a class="animate-nav-slide-down" style="animation-delay:0.52s" href="#story">STORY</a></li>
        </ul>

        <div class="nav-login-wrap animate-nav-slide-down" style="animation-delay:0.7s">
          <a class="btn-login" href="#login">
            LOG IN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span class="notch notch-sm" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          </a>
        </div>

        <button class="hamburger animate-nav-slide-down" style="animation-delay:0.3s" type="button" aria-label="Toggle menu" id="menu-btn">
          <span class="icon-box">
            <svg class="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h16"/></svg>
            <svg class="icon-x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </span>
        </button>
      </div>
    </div>

    <div class="overlay">
      <ul>
        <li><a href="#feature">FEATURE</a></li>
        <li><a href="#the-process">THE PROCESS</a></li>
        <li><a href="#gallery">GALLERY</a></li>
        <li><a href="#pricing">PRICING</a></li>
        <li><a href="#story">STORY</a></li>
        <li>
          <a class="btn-login-mobile" href="#login">
            LOG IN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <video
      class="animate-fade-in"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_214632_c6e637b5-308a-4f13-b06c-354e9dbda842.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>

    <div class="line line-top animate-reveal-line-x"></div>
    <div class="line line-left animate-reveal-line-y"></div>
    <div class="line line-right animate-reveal-line-y"></div>

    <div class="hero-content">
      <div class="hero-copy">
        <h1 class="animate-fade-in-up">Visions before they<span class="break"></span> find their shape</h1>
        <p class="tagline animate-fade-in-up">Think freely. Create boldly.</p>
        <p class="body-copy animate-fade-in-up">An open studio where imagination flows alongside machine insight — built for painters, thinkers, and restless creators turning raw impulses into tangible concepts.</p>
        <div class="cta-wrap animate-fade-in-up">
          <a class="btn-cta" href="#explore">
            ENTER THE STUDIO
            <span class="notch notch-lg" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          </a>
        </div>
      </div>
    </div>

    <div class="line line-bottom animate-reveal-line-x"></div>
  </section>

  <script>
    const nav = document.getElementById("nav");
    const btn = document.getElementById("menu-btn");
    btn.addEventListener("click", () => nav.classList.toggle("is-open"));
    nav.querySelectorAll(".overlay a").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  </script>
</body>
</html>
- **Reference Preview / Loop Media:** https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/pixel_muse_ai_creative_studio.mp4
- **Reference Poster / Layout Frame:** https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260820_090437_9eadf986-a1bb-4521-904c-92c26b727790.png&w=1920&q=85

### Technical & Motion Requirements
- Use semantic React components with Tailwind CSS utility classes and smooth Framer Motion (`motion/react`) entrance/scroll animations.
- If using an HLS (`.m3u8`) or MP4 background video, attach `hls.js` (for `.m3u8`) or native `<video autoPlay muted loop playsInline className="w-full h-full object-cover" />`.
- Ensure responsive typography, liquid glass / frosted surfaces where indicated by the visual DNA, and accessible interactive states.
```
