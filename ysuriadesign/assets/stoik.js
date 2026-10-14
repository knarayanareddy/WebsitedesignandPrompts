	(function() {
		var CHAMFER = 14;
		var clip = 'polygon(0 0, calc(100% - ' + CHAMFER + 'px) 0, 100% ' + CHAMFER + 'px, 100% 100%, 0 100%)';
		var aboutLockState = null;

		function injectSpline() {
			// Mobile: skip the 3D scene entirely. Spline is the single
			// largest contributor to LCP on mobile; on viewports < 810px
			// the carousel + tweet ticker carry the hero visually.
			if (window.innerWidth < 810) return false;
			var hero = document.querySelector('[data-framer-name="section-hero"]');
			if (!hero || hero.getBoundingClientRect().height === 0) return false;
			// Find or create the hero overlay wrap (managed by the inline script).
			var wrap = document.getElementById('stoik-hero-overlays');
			if (!wrap) {
				wrap = document.createElement('div');
				wrap.id = 'stoik-hero-overlays';
				wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:visible;';
				if (window.getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
				try { hero.appendChild(wrap); } catch (e) { return false; }
			}
			if (wrap.querySelector('spline-viewer.stoik-spline-body')) {
				fixSplineInteraction();
				return true;
			}
			hero.style.backgroundColor = '#E1E1E1';
			hero.style.color = '#000';
			var allEls = hero.querySelectorAll('*');
			for (var k = 0; k < allEls.length; k++) {
				if (window.getComputedStyle(allEls[k]).color === 'rgb(255, 255, 255)') {
					allEls[k].style.color = '#000';
				}
			}
			var viewer = document.createElement('spline-viewer');
			viewer.className = 'stoik-spline-body';
			viewer.setAttribute('url', './assets/scene.splinecode');
			// Position inside the wrapper, which fills hero (inset:0).
			viewer.style.cssText =
				'position:absolute;left:50%;top:0;bottom:0;' +
				'transform:translateX(-50%);' +
				'width:clamp(420px, 80vw, 1100px);' +
				'height:100%;max-width:100%;pointer-events:auto;z-index:8;';
			wrap.appendChild(viewer);
			fixSplineInteraction();
			return true;
		}

		function removeHeroCarousel() {
			var overlays = document.querySelectorAll('.stoik-carousel-overlay');
			for (var i = 0; i < overlays.length; i++) overlays[i].remove();
		}

		function ensureHeroCarousel() {
			var heroSection = document.querySelector('[data-framer-name="section-hero"]');
			if (!heroSection || heroSection.querySelector('.stoik-carousel-overlay')) return;

			var host = heroSection.querySelector('[data-framer-name="hero-image"] [data-framer-background-image-wrapper="true"]') || heroSection;
			var images = [
				'/assets/framer/images/KhuBBhFaqXWDtnaLIfyVHJKpmdQ.webp?width=2640&height=534',
				'/assets/framer/images/YZ29rzRSgAiWec6tcTOzQ2eds.webp?width=800&height=800',
				'/assets/framer/images/8FefnrdMowkf1ToR3ACngDHlJAo.webp?width=1320&height=1000',
				'/assets/framer/images/Am9QvLWZNXrY5M7cdchoCs8Z4M.webp?width=1476&height=1040',
				'/assets/framer/images/CMpDE67oycKwmUwU3XeLRWoQUdg.webp?width=1476&height=1040',
				'/assets/framer/images/Lfh4zktuKEZ7Qe4NOEGDc7aSc0.webp?width=1476&height=1040'
			];

			function buildRow(directionClass, sequence) {
				var row = document.createElement('div');
				row.className = 'stoik-carousel-row ' + directionClass;
				var track = document.createElement('div');
				track.className = 'stoik-carousel-track';

				var list = sequence.concat(sequence);
				for (var i = 0; i < list.length; i++) {
					var card = document.createElement('div');
					card.className = 'stoik-carousel-card';
					var img = document.createElement('img');
					img.loading = 'lazy';
					img.decoding = 'async';
					img.src = list[i];
					img.alt = 'Project preview ' + ((i % sequence.length) + 1);
					card.appendChild(img);
					track.appendChild(card);
				}
				row.appendChild(track);
				return row;
			}

			var overlay = document.createElement('div');
			overlay.className = 'stoik-carousel-overlay';
			overlay.appendChild(buildRow('is-top', images));
			overlay.appendChild(buildRow('is-bottom', images.slice().reverse()));
			host.appendChild(overlay);
		}

		function fixHeroHeading() {
			var wrapper = document.querySelector('.framer-1669zf9');
			if (!wrapper || wrapper.dataset.headingFixed) return;
			var heroSection = document.querySelector('[data-framer-name="section-hero"]');
			if (!heroSection) return;
			// Ensure hero section is the positioning context
			heroSection.style.position = 'relative';
			wrapper.style.cssText += ';position:absolute!important;bottom:28px!important;right:32px!important;left:auto!important;top:auto!important;width:auto!important;transform:none!important;';
			var h1 = wrapper.querySelector('h1');
			if (h1) h1.style.cssText += ';font-size:28px!important;line-height:1.2!important;white-space:nowrap!important;text-align:right!important;';
			wrapper.dataset.headingFixed = '1';
		}

		function fixSplineInteraction() {
			var heroSection = document.querySelector('[data-framer-name="section-hero"]');
			if (!heroSection) return;
			// Let pointer events pass through static content to Spline underneath
			var container = heroSection.querySelector('[data-framer-name="container"]');
			if (container) {
				container.style.pointerEvents = 'none';
				var interactive = container.querySelectorAll('a, button, [role="button"]');
				for (var i = 0; i < interactive.length; i++) {
					interactive[i].style.pointerEvents = 'auto';
				}
			}
			var heading = heroSection.querySelector('[data-framer-name="heading"]');
			if (heading) heading.style.pointerEvents = 'none';
			// Forward EVERY window-level mousemove to the Spline canvas so the
			// bust tracks the cursor regardless of where it is on the page —
			// not just when hovering the spline-viewer's own bounds.
			setupGlobalSplineCursorForward();
		}

		function setupGlobalSplineCursorForward() {
			if (window._stoikSplineCursorBound) return;
			window._stoikSplineCursorBound = true;

			function getSplineTarget() {
				var v = document.querySelector('spline-viewer');
				if (!v) return null;
				// Try the canvas inside the shadow DOM first (Spline's canvas
				// listens for mouse events directly).
				var canvas = v.shadowRoot ? v.shadowRoot.querySelector('canvas') : null;
				return canvas || v;
			}

			function forward(e) {
				var t = getSplineTarget();
				if (!t) return;
				// Only forward when the cursor is inside the hero section.
				var hero = document.querySelector('[data-framer-name="section-hero"]');
				if (hero) {
					var hr = hero.getBoundingClientRect();
					if (e.clientX < hr.left || e.clientX > hr.right ||
						e.clientY < hr.top  || e.clientY > hr.bottom) {
						return;
					}
				}
				try {
					var fwd = new MouseEvent(e.type, {
						bubbles: true,
						cancelable: true,
						clientX: e.clientX,
						clientY: e.clientY,
						screenX: e.screenX,
						screenY: e.screenY,
						movementX: e.movementX,
						movementY: e.movementY,
						button: e.button,
						buttons: e.buttons,
						view: window
					});
					t.dispatchEvent(fwd);
				} catch (_) {}
			}

			// Use capture so we see the event before any element calls
			// stopPropagation (and we don't preventDefault, so original handlers
			// still receive the real event normally).
			window.addEventListener('mousemove', forward, true);
			window.addEventListener('pointermove', forward, true);
		}

		function replaceText() {
			var map = [
				['Building ', ''],
				['Bright Futures, ', ''],
				['Hand in Hand', ''],
				['Luther Cooper', 'Yogi Suria'],
				['Stoik Agency', 'Yogi Suria'],
				['Stoik®', 'Yogi Suria®'],
				['[ STOIK 2026 ]', '[ YOGI SURIA 2026 ]'],
				['stoik@gmail.com', 'reachout@yogindersuria.live'],
				['\u00a92026 stoik. All Rights Reserved', '\u00a92026 Yogi Suria. All Rights Reserved'],
				['\u00a92026 Stoik. All Rights Reserved', '\u00a92026 Yogi Suria. All Rights Reserved'],
				['Team', 'Testimonials'],
				['Want to join our team?', 'Words from people I have shipped with'],
				// Replace any leftover "What our clients say" rendering with the no-our version
				['What our clients say', 'Words from people I have shipped with'],
				// Solo-studio rewrite of remaining "Our…" / "We agency…" template copy
				['Our focus is on creating functional, fast, & well-structured websites that meet business goals without unnecessary complexity.',
				 'My focus is shipping work that ships — Web3 + AI products, end-to-end, no busywork.'],
				['We begin every project with in-depth research and a clear, data-driven strategy, ensuring our agency delivers focused, impactful solutions aligned with each client’s goals.',
				 'Every project starts with deep research and a clear strategy, so the work I ship lands focused, on-brand, and aligned with the goals you came in with.'],
				['Still have questions? Contact us or ask our', 'Still have questions? Drop me a note.'],
				['Contact us', 'Email me'],
				// Stat-card labels — match the new numbers (template uses these exact strings)
				['Years of service', 'Years of experience'],
				['Experies & Experience', 'Years of experience'],
				['Expertise & Experience', 'Years of experience'],
				['Agency Awards', 'TVL across protocols'],
				['Awards & Achievements', 'TVL across protocols'],
				['Completed Projects', 'Web3 protocols'],
				['Projects', 'Web3 protocols'],
				// Repurpose team cards as testimonial cards
				['Higuen Berlie', 'Stanislav Buynovskiy'],
				['Developer', 'Art Director, Lido'],
				['Jackie Markgoz', 'Rick Bagshaw'],
				['Senior Officer', 'CMO, P2P.org'],
				['Marry Gomez', 'Filip Berger'],
				['Marketing Manager', 'Marketing, RedStone'],
				['Vicky Fernandez', 'WhyShock'],
				['Designer', 'Founder, WhyShock'],
				// Hide the join-our-team CTA copy (we'll replace it with testimonials intro)
				['If you’re ready to create and collaborate, we’d love',
				 'A few words from the people I’ve shipped work with.'],
				['to hear from you.', ''],
				['Apply Now', ''],
				// Solutions section — rebrand to what we actually do
				['Solution', 'Solutions'],
				['Brand & Strategy', 'Brand & Identity'],
				['UI/UX', 'Product Design'],
				['Development', 'Frontend & Prototyping'],
				['Marketing', 'Motion & Animation'],
				['Our branding service builds clear identity, sharp positioning, and unified messaging to guide effective marketing decisions.',
				 'Identity systems, naming, and visual language tuned for Web3 and AI products that need to feel distinct from day one.'],
				['Our team builds seamless, intuitive experiences that enhance clarity, usability, and user delight for any digital product.',
				 'End-to-end product design for landing pages, dashboards, and apps. Research, IA, prototyping, and pixel-tight UI.'],
				['Our team builds secure, scalable digital products—from websites to apps—designed around your specific objectives.',
				 'Working prototypes and shipped frontends in React, Framer, and Webflow — fast iterations from Figma to production.'],
				['We craft data-backed, targeted marketing strategies designed to grow your brand, boost visibility, and attract the right customers at every stage.',
				 'Motion language for product onboarding, marketing reels, and brand films — subtle, considered, on-brand.']
			];
			var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
			var node;
			while (node = walker.nextNode()) {
				for (var i = 0; i < map.length; i++) {
					if (node.nodeValue === map[i][0]) {
						node.nodeValue = map[i][1];
					}
				}
			}
		}

		function fixHeadline() {
			var h1 = document.querySelector('h1');
			if (!h1 || h1.dataset.stoikDone) return;
			// Replace all animated letter spans with plain text to avoid clipping/offset issues
			h1.innerHTML = 'Yogi Suria';
			h1.style.whiteSpace = 'normal';
			h1.style.fontKerning = 'normal';
			h1.dataset.stoikDone = '1';
		}

		function injectHeroDisplay() {
			var hero = document.querySelector('[data-framer-name="section-hero"]');
			if (!hero) return;
			if (hero.querySelector('.stoik-hero-display')) return;
			var h = document.createElement('h1');
			h.className = 'stoik-hero-display';
			h.innerHTML = 'Yogi Suria<sup>®</sup>';
			// ensure hero is positioning context for absolute child
			var cs = window.getComputedStyle(hero);
			if (cs.position === 'static') hero.style.position = 'relative';
			hero.appendChild(h);
		}

		function removeFramerBadge() {
			var badgeIds = ['__framer-badge-container', 'framer-badge-container'];
			for (var i = 0; i < badgeIds.length; i++) {
				var badge = document.getElementById(badgeIds[i]);
				if (badge) badge.remove();
			}
			var links = document.querySelectorAll('a');
			for (var j = 0; j < links.length; j++) {
				var link = links[j];
				var txt = (link.textContent || '').toLowerCase();
				var label = (link.getAttribute('aria-label') || '').toLowerCase();
				var href = (link.getAttribute('href') || '').toLowerCase();
				var cs = window.getComputedStyle(link);
				var fixedLike = cs.position === 'fixed' || cs.position === 'sticky';
				if (
					txt.indexOf('made in framer') !== -1 ||
					txt.indexOf('create a free website with framer') !== -1 ||
					label.indexOf('create a free website with framer') !== -1 ||
					(href.indexOf('framer.com') !== -1 && fixedLike)
				) {
					if (link.closest('#main')) {
						link.remove();
					}
				}
			}
		}

		function cleanupFooterAndBrand() {
			var footers = document.querySelectorAll('footer');
			for (var f = 0; f < footers.length; f++) {
				var footer = footers[f];

				var addressBlocks = footer.querySelectorAll('[data-framer-name="address"]');
				for (var a = 0; a < addressBlocks.length; a++) addressBlocks[a].style.display = 'none';

				var footerImages = footer.querySelectorAll('[data-framer-name="image"]');
				for (var im = 0; im < footerImages.length; im++) footerImages[im].style.display = 'none';

				var links = footer.querySelectorAll('a');
				for (var l = 0; l < links.length; l++) {
					var txt = (links[l].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
					var href = (links[l].getAttribute('href') || '').toLowerCase();
					if (txt.indexOf('framer expert') !== -1 || href.indexOf('framer.com/experts') !== -1 || href.indexOf('google.com/maps') !== -1) {
						var wrap = links[l].closest('[class*="framer-"]');
						if (wrap && footer.contains(wrap)) wrap.style.display = 'none';
						else links[l].style.display = 'none';
					}
				}

				var texts = footer.querySelectorAll('.framer-text, p, span, h2, h3, h4');
				for (var t = 0; t < texts.length; t++) {
					var raw = (texts[t].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
					if (raw.indexOf('made with love') !== -1) texts[t].style.display = 'none';
				}
			}

			var brand = document.getElementById('stoik-vertical-brand');
			if (brand) brand.remove();
		}

		function alignHeroHeading() {
			var heroSection = getVisibleHeroSection();
			if (!heroSection) return;
			var heading = heroSection.querySelector('[data-framer-name="heading-wrapper"] [data-framer-name="heading"], [data-framer-name="heading"]');
			if (heading) { heading.style.display = 'none'; heading.style.pointerEvents = 'none'; }
			var sticky = document.getElementById('stoik-sticky-card');
			if (sticky) sticky.remove();
			setupHeroLogoScroll(heroSection);
		}

		// While the hero is in view, the Talk-to-Yogi card sits center-right.
		// Once the hero scrolls past, it pins to top-right and stays there for
		// the rest of the page. Reverses cleanly on scroll back up.
		function setupHeroCardScrollPin(cardEl) {
			if (window._stoikCardPinBound) return;
			window._stoikCardPinBound = true;
			function onScroll() {
				var card = cardEl || document.querySelector('.stoik-hero-card');
				if (!card) return;
				var hero = document.querySelector('[data-framer-name="section-hero"]');
				if (!hero) return;
				var rect = hero.getBoundingClientRect();
				// Pin when ~70% of the hero has scrolled past the top of the
				// viewport — gives the transition time to finish before the
				// next section content reaches the card position.
				var pastHero = rect.bottom < window.innerHeight * 0.45;
				card.classList.toggle('stoik-card-pinned-top', pastHero);
			}
			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('resize', onScroll);
			setTimeout(onScroll, 200);
		}

		function setupHeroLogoScroll(heroSection) {
			if (window._stoikLogoScrollBound) return;
			window._stoikLogoScrollBound = true;
			function onScroll() {
				var logoEl = document.querySelector('.stoik-heading-top');
				if (!logoEl) return;
				var heroH = heroSection.offsetHeight;
				if (heroH < 100) return; // not rendered yet
				var heroBottom = heroSection.offsetTop + heroH;
				if (window.scrollY > heroBottom - 80) {
					logoEl.classList.add('stoik-nav-mode');
				} else {
					logoEl.classList.remove('stoik-nav-mode');
				}
			}
			window.addEventListener('scroll', onScroll, { passive: true });
			// Defer initial check until hero is painted
			setTimeout(onScroll, 400);
		}

		function setupProjectCardTilt() {
			if (window._stoikCardTiltBound) return;
			// Verify the wrapper exists before binding
			if (!document.querySelector('[data-framer-name="Project-wrapper"]')) return;
			window._stoikCardTiltBound = true;

			function onScroll() {
				// Query fresh every tick — Framer re-renders replace stale refs
				var wrapper = document.querySelector('[data-framer-name="Project-wrapper"]');
				if (!wrapper) return;
				var cards = Array.from(wrapper.children);
				if (cards.length < 2) return;

				var wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
				var wrapperH = wrapper.offsetHeight;
				var cardH = cards[0].offsetHeight || 806;
				// Scroll range allocated to each card transition
				var scrollPerCard = (wrapperH - cardH) / Math.max(1, cards.length - 1);
				var scrolledIntoWrapper = window.scrollY - wrapperTop;
				// Disable hide-below-fold trick on small screens (only desktop)
				var hideBelow = window.innerWidth >= 1100;

				for (var i = 0; i < cards.length; i++) {
					var transforms = [];

					// ── Incoming animation (cards i > 0) ─────────────────
					// Each card starts pushed off-screen below (translateY 100%)
					// and slides up to its natural position as the PREVIOUS
					// card progresses through its outgoing-tilt slot. This
					// stops the "bottom card peeking" while card i-1 is locked.
					if (i > 0 && hideBelow) {
						var prevSlotStart = (i - 1) * scrollPerCard;
						var prevT = (scrolledIntoWrapper - prevSlotStart) / scrollPerCard;
						prevT = Math.max(0, Math.min(1, prevT));
						// Ease-in so it stays hidden longer, then snaps up
						// during the back half of the prev slot.
						var inEase = prevT * prevT;
						var translateY = (1 - inEase) * 100; // 100% → 0%
						transforms.push('translateY(' + translateY + '%)');
					}

					// ── Outgoing animation (cards i < N-1) ───────────────
					if (i < cards.length - 1) {
						var slotStart = i * scrollPerCard;
						var t = (scrolledIntoWrapper - slotStart) / scrollPerCard;
						t = Math.max(0, Math.min(1, t));
						var ease = 1 - Math.pow(1 - t, 2.2);
						var rotX = ease * 65;
						var SCALE_KICK = 0.32;
						var scaleT = Math.max(0, (t - SCALE_KICK) / (1 - SCALE_KICK));
						var scaleEase = scaleT * scaleT * scaleT;
						var scale = 1 - scaleEase * 0.42;
						transforms.push('perspective(1100px) rotateX(' + rotX + 'deg) scale(' + scale + ')');
					}

					cards[i].style.transform = transforms.length ? transforms.join(' ') : '';
					cards[i].style.filter = '';
					cards[i].style.opacity = '';
				}
			}

			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('resize', onScroll, { passive: true });
			setTimeout(onScroll, 300);
		}

		function setupSectionGrids() {
			var main = document.querySelector('main') || document.querySelector('[data-framer-name="main"]');
			if (!main) return;
			var cols = window.innerWidth < 810 ? 2 : 6;
			var gutter = window.innerWidth < 810 ? 10 : 14;
			var gridSize = window.innerWidth < 810 ? 92 : 128;
			var ref =
				document.querySelector('[data-framer-name="section-hero"] [data-framer-name="container"]') ||
				document.querySelector('[data-framer-name="container"]') ||
				main;
			var mRect = main.getBoundingClientRect();
			var rRect = ref.getBoundingClientRect();
			var left = Math.max(8, Math.round(rRect.left - mRect.left));
			var right = Math.max(8, Math.round(mRect.right - rRect.right));

			main.classList.add('stoik-main-grid');
			main.style.setProperty('--stoik-grid-left', left + 'px');
			main.style.setProperty('--stoik-grid-right', right + 'px');
			main.style.setProperty('--stoik-grid-cols', String(cols));
			main.style.setProperty('--stoik-grid-gutter', gutter + 'px');
			main.style.setProperty('--stoik-grid-size', gridSize + 'px');
		}

		function cleanupLegacyUI() {
			var oldToggle = document.getElementById('stoik-theme-toggle');
			if (oldToggle) oldToggle.remove();
			var oldGrid = document.getElementById('stoik-grid-overlay');
			if (oldGrid) oldGrid.remove();
			document.documentElement.classList.remove('stoik-stencil-on');
			var oldSidebar = document.getElementById('stoik-side-nav');
			if (oldSidebar) oldSidebar.remove();
		}

		// Find every small blue accent square (the brand-blue dots scattered
		// through About / stat cards / etc.) and tag it for the rotation
		// animation. Squares within the same parent get staggered delays.
		function setupBlueSquareRotation() {
			var squares = [];
			var all = document.querySelectorAll('div, span');
			for (var i = 0; i < all.length; i++) {
				var el = all[i];
				if (el.classList.contains('stoik-rot-square')) { squares.push(el); continue; }
				if (el.children.length > 0) continue;
				var rect = el.getBoundingClientRect();
				if (rect.width < 4 || rect.width > 28) continue;
				if (rect.height < 4 || rect.height > 28) continue;
				if (Math.abs(rect.width - rect.height) > 6) continue;
				var bg = window.getComputedStyle(el).backgroundColor;
				var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
				if (!m) continue;
				var r = +m[1], g = +m[2], b = +m[3];
				// Brand blue: high B, low R, mid-to-low G (matches #0052FF and similar)
				if (b < 180) continue;
				if (r > 80) continue;
				if (g > 130) continue;
				el.classList.add('stoik-rot-square');
				squares.push(el);
			}
			// Stagger: group by nearest meaningful ancestor (section / article)
			var groups = new Map();
			squares.forEach(function(el) {
				var anc = el.closest('section, article, [data-framer-name^="section-"]') || document.body;
				if (!groups.has(anc)) groups.set(anc, []);
				groups.get(anc).push(el);
			});
			groups.forEach(function(list) {
				list.forEach(function(el, idx) {
					// 0.4s stagger between siblings, wrapping every 5 to keep delays small
					el.style.setProperty('--stoik-rot-delay', (idx % 5 * 0.4).toFixed(2) + 's');
				});
			});
		}

		function convertAccentSquaresToAsterisks() {
			var candidates = document.querySelectorAll('.framer-text, [data-framer-name="."]');
			var squareLike = new Set(['.', '•', '▪', '■', '◼', '◾', '⬛', '▪︎', '∙']);
			for (var i = 0; i < candidates.length; i++) {
				var node = candidates[i];
				var raw = (node.textContent || '').replace(/\s+/g, ' ').trim();
				if (!raw) continue;
				if (squareLike.has(raw)) {
					node.textContent = '*';
					node.classList.add('stoik-accent-asterisk');
				}
			}
		}

		var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\|{}[]';
		function scrambleReveal(el, target, duration) {
			var frames = Math.round(duration / 35);
			var revealed = new Array(target.length).fill(false);
			var frame = 0;
			if (el._scrambleTimer) clearInterval(el._scrambleTimer);
			el._scrambleTimer = setInterval(function() {
				frame++;
				var progress = frame / frames;
				// Progressively lock letters left-to-right
				var lockCount = Math.floor(progress * target.length * 1.3);
				var out = '';
				for (var i = 0; i < target.length; i++) {
					if (target[i] === ' ') { out += ' '; continue; }
					if (i < lockCount || revealed[i]) {
						revealed[i] = true;
						out += target[i];
					} else {
						out += CHARS[Math.floor(Math.random() * CHARS.length)];
					}
				}
				el.textContent = out;
				if (revealed.every(Boolean) || frame >= frames + 6) {
					clearInterval(el._scrambleTimer);
					el.textContent = target;
				}
			}, 35);
		}

		function getVisibleHeroSection() {
			var sections = document.querySelectorAll('[data-framer-name="section-hero"]');
			for (var i = 0; i < sections.length; i++) {
				var s = sections[i];
				var cs = window.getComputedStyle(s);
				var r = s.getBoundingClientRect();
				if (cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0) {
					return s;
				}
			}
			return sections.length ? sections[0] : null;
		}

		function remodelHero() {
			var heroSection = getVisibleHeroSection();
			if (!heroSection) return;

			// 1) Remove top-right quote button
			var links = document.querySelectorAll('a');
			for (var i = 0; i < links.length; i++) {
				var txt = (links[i].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				var rect = links[i].getBoundingClientRect();
				if ((txt === 'get a quote' || txt.indexOf('get a quote') !== -1) && rect.top < 200) {
					links[i].classList.add('stoik-hide');
				}
			}

			// 2) Header nav links black (Home / About / Project)
			var headerNavLinks = document.querySelectorAll('a');
			for (var j = 0; j < headerNavLinks.length; j++) {
				var t = (headerNavLinks[j].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				var navRect = headerNavLinks[j].getBoundingClientRect();
				if ((t.indexOf('home') !== -1 || t.indexOf('about') !== -1 || t.indexOf('project') !== -1 || t.indexOf('stoik') !== -1) && navRect.top < 180) {
					headerNavLinks[j].style.color = '#000';
					var navTexts = headerNavLinks[j].querySelectorAll('.framer-text');
					for (var jt = 0; jt < navTexts.length; jt++) {
						navTexts[jt].style.color = '#000';
					}
				}
			}
			var logos = document.querySelectorAll('a[data-framer-name="logo"]');
			for (var lg = 0; lg < logos.length; lg++) {
				logos[lg].classList.add('stoik-hide');
			}

			// 3) Remove left helper texts
			var year = heroSection.querySelector('[data-framer-name="year"]') || heroSection.querySelector('.framer-x3rh5a');
			if (year) year.classList.add('stoik-hide');
			var stoic = heroSection.querySelector('[data-framer-name="heading-wrapper"] .framer-kwkfcy');
			if (stoic) stoic.classList.add('stoik-hide');

			// Move heading to top-right
			var heading = heroSection.querySelector('[data-framer-name="heading-wrapper"] [data-framer-name="heading"]');
			if (heading) {
				if (heading.parentElement !== heroSection) {
					heroSection.appendChild(heading);
				}
				heading.classList.add('stoik-heading-top');
			}

			// 4) Move Yogi card to where heading used to be (bottom-right).
			// Deduplicate — Framer re-renders can create a fresh card inside
			// the hero. Keep the one we already moved to body, hide any
			// duplicates it spawns inside the hero.
			var allCards = document.querySelectorAll('[data-framer-name="hero-card-wrapper"]');
			var bodyCard = null;
			for (var bc = 0; bc < allCards.length; bc++) {
				if (allCards[bc].parentElement === document.body) { bodyCard = allCards[bc]; break; }
			}
			if (bodyCard) {
				// Hide any other duplicates that Framer recreated
				for (var dc = 0; dc < allCards.length; dc++) {
					if (allCards[dc] !== bodyCard) {
						allCards[dc].style.display = 'none';
						allCards[dc].setAttribute('aria-hidden', 'true');
					}
				}
			}
			var cardWrap = bodyCard || heroSection.querySelector('[data-framer-name="hero-card-wrapper"]');
			if (cardWrap) {
				if (cardWrap.parentElement !== document.body) {
					document.body.appendChild(cardWrap);
				}
				cardWrap.classList.add('stoik-hero-card');
				cardWrap.style.position = 'fixed';
				cardWrap.style.right = 'clamp(22px, 2.8vw, 44px)';
				// Initial state: center-right; scroll handler toggles top-right
				cardWrap.style.top = '';
				cardWrap.style.left = 'auto';
				cardWrap.style.bottom = 'auto';
				cardWrap.style.opacity = '1';
				cardWrap.style.transform = '';
				cardWrap.style.zIndex = '2147483000';
				setupHeroCardScrollPin(cardWrap);
				cardWrap.style.willChange = 'auto';
				var leftBlock = cardWrap.querySelector('.framer-l5aw9-container');
				if (leftBlock) leftBlock.classList.add('stoik-hide');
				var card = cardWrap.querySelector('.framer-64hzh7');
				if (card && !card.dataset.stoikRebuilt) {
					card.innerHTML = '';
					var avatar = document.createElement('video');
					avatar.className = 'stoik-yogi-avatar';
					avatar.src = 'assets/yogi.webm';
					avatar.autoplay = true;
					avatar.muted = true;
					avatar.loop = true;
					avatar.playsInline = true;
					avatar.setAttribute('playsinline', '');
					avatar.preload = 'metadata';
					var content = document.createElement('div');
					content.className = 'stoik-cta-content';
					var title = document.createElement('p');
					title.className = 'stoik-cta-title';
					title.textContent = 'Talk to Yogi';
					var cta = document.createElement('a');
					cta.className = 'stoik-cta-button';
					cta.href = 'mailto:reachout@yogindersuria.live?subject=Project%20enquiry';
					cta.textContent = 'Mail me';
					var arrow = document.createElement('span');
					arrow.className = 'stoik-cta-arrow';
					arrow.textContent = '→';
					cta.appendChild(arrow);
					content.appendChild(title);
					content.appendChild(cta);
					card.appendChild(avatar);
					card.appendChild(content);

					// Decorative floral watermark in bottom-right; the SVG is
					// applied as a CSS background and clipped by the card's
					// overflow. A shimmer band sweeps across via mask animation.
					var floral = document.createElement('div');
					floral.className = 'stoik-cta-floral';
					floral.setAttribute('aria-hidden', 'true');
					card.appendChild(floral);
					// Make sure the card is a positioning context AND clips
					// the floral when it overflows the corner.
					try {
						if (getComputedStyle(card).position === 'static') { card.style.position = 'relative'; }
						card.classList.add('stoik-cta-floral-clip');
						card.style.setProperty('overflow', 'hidden', 'important');
					} catch(e) {}

					card.dataset.stoikRebuilt = '1';
				}
				}

			// 5) Keep original bottom hero panel (services holder)
			var services = heroSection.querySelector('[data-framer-name="services holder"]');
			if (services) {
				services.classList.remove('stoik-hide');
			}
			var ticker = heroSection.querySelector('.stoik-ticker-strip');
			if (ticker) ticker.remove();
		}

		function removeAboutPromoRow() {
			var paras = document.querySelectorAll('[data-framer-name="section-about"] p, [data-framer-name="section-about"] h2, [data-framer-name="section-about"] h3');
			for (var i = 0; i < paras.length; i++) {
				var txt = (paras[i].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				if (txt.indexOf('our focus is on creating functional') !== -1 || txt.indexOf('rated 4.9/5 from over 1600 reviews') !== -1) {
					var row = paras[i].closest('[data-framer-name="bottom"]');
					if (row) row.classList.add('stoik-hide');
				}
			}
		}

		function resetAboutHighlightSection() {
			var sections = document.querySelectorAll('[data-framer-name="section-about"]');
			for (var si = 0; si < sections.length; si++) {
				var section = sections[si];
				section.classList.remove('stoik-about-cards-ready');
				section.classList.remove('stoik-about-words-ready');

				var heading = section.querySelector('[data-framer-name="top"] h2');
				if (heading && heading.dataset.stoikWordSource) {
					heading.textContent = heading.dataset.stoikWordSource;
					heading.removeAttribute('data-stoikWordsBuilt');
				}

				var cards = section.querySelectorAll('[data-framer-name="card-wrapper"] > *');
				for (var i = 0; i < cards.length; i++) {
					cards[i].classList.add('stoik-about-card-stagger');
					cards[i].style.removeProperty('opacity');
					cards[i].style.removeProperty('transform');
					cards[i].style.removeProperty('transition-delay');
				}
			}
			aboutLockState = null;
		}

		function setupAboutWordReveal() {
			var about = document.querySelector('[data-framer-name="section-about"]');
			if (!about) return;

			var heading = about.querySelector('[data-framer-name="top"] h2');
			if (!heading) return;
			heading.classList.add('stoik-about-heading-font');

			// Override the original Framer template copy with brand-aligned text.
			// One designer, one package — brand, product, marketing, motion, AI.
			var SOURCE = 'Design that ships at the pace Web3 and AI builders move.';
			if (heading.dataset.stoikWordSource !== SOURCE) {
				heading.dataset.stoikWordSource = SOURCE;
				delete heading.dataset.stoikWordsBuilt;  // force rebuild with new copy
			}
			var source = SOURCE;

			if (!heading.dataset.stoikWordsBuilt) {
				heading.textContent = '';
				var words = source.split(' ');
				for (var wi = 0; wi < words.length; wi++) {
					var span = document.createElement('span');
					span.className = 'stoik-about-word';
					span.textContent = words[wi];
					span.style.transitionDelay = (wi * 90) + 'ms';
					heading.appendChild(span);
					if (wi < words.length - 1) heading.appendChild(document.createTextNode(' '));
				}
				heading.dataset.stoikWordsBuilt = '1';
			}

			var cardsWrap = about.querySelector('[data-framer-name="card-wrapper"]');
			if (cardsWrap) {
				for (var ci = 0; ci < cardsWrap.children.length; ci++) {
					var card = cardsWrap.children[ci];
					card.classList.add('stoik-about-card-stagger');
					card.style.transitionDelay = (ci * 140) + 'ms';
				}
				var statTexts = cardsWrap.querySelectorAll('.framer-text');
				for (var si = 0; si < statTexts.length; si++) {
					var raw = (statTexts[si].textContent || '').trim();
					if (/^[0-9]+[+]?$/.test(raw)) {
						statTexts[si].classList.add('stoik-about-number-font');
					}
				}
			}

			if (about.dataset.stoikAboutObserver) return;
			about.dataset.stoikAboutObserver = '1';
			var io = new IntersectionObserver(function(entries, obs) {
				for (var ei = 0; ei < entries.length; ei++) {
					if (!entries[ei].isIntersecting) continue;
					about.classList.add('stoik-about-words-ready');
					var wait = source.split(' ').length * 90 + 550;
					setTimeout(function() {
						about.classList.add('stoik-about-cards-ready');
					}, wait);
					obs.disconnect();
					break;
				}
			}, { threshold: 0.35 });
			io.observe(about);
		}

		function applyClientsHeadingClass() {
			var nodes = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, .framer-text');
			for (var i = 0; i < nodes.length; i++) {
				var text = (nodes[i].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				if (text === 'what our clients say') {
					nodes[i].classList.add('heading-clients-say');
				}
			}
		}

		function applyServicesHeadingClientsClass() {
			var section = document.querySelector('[data-framer-name="section-services"]');
			if (!section) return;
			var valid = {
				'brand & strategy': true,
				'ui/ux': true,
				'development': true,
				'marketing': true
			};
			var nodes = section.querySelectorAll('h1, h2, h3, h4, h5, p, span, .framer-text');
			for (var i = 0; i < nodes.length; i++) {
				var text = (nodes[i].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				if (valid[text]) nodes[i].classList.add('heading-clients-say');
			}
		}

		function setupSolutionAutoOpen() {
			var solution = document.querySelector('[data-framer-name="section-services"]');
			if (!solution) {
				var sections = document.querySelectorAll('section, [data-framer-name^="section-"]');
				for (var i = 0; i < sections.length; i++) {
					var txt = (sections[i].textContent || '').toLowerCase();
					if (txt.indexOf('brand & strategy') !== -1 && txt.indexOf('ui/ux') !== -1 && txt.indexOf('development') !== -1) {
						solution = sections[i];
						break;
					}
				}
			}
			if (!solution) return;
			if (solution.dataset.stoikSolutionInit === '1') return;
			solution.dataset.stoikSolutionInit = '1';

			// Each row uses an asset pulled from the hero carousel reels —
			// matched roughly to the discipline. .mp4 entries auto-render as
			// muted/looping videos; image extensions fall back to <img>.
			var rows = [
				{ title: 'Brand Identity',     img: 'assets/hero-reels/brand/redstone_2.webm' },
				{ title: 'Product Design',     img: 'assets/hero-reels/product/featured_screen_2026_05_03.webm' },
				{ title: 'Web Development',    img: 'assets/hero-reels/product/loopdesk.webm' },
				{ title: 'Motion & Animation', img: 'assets/hero-reels/brand/suria_017_2002411630865547709.webm' },
				{ title: 'Design Systems',     img: 'assets/hero-reels/product/aight.webm' },
				{ title: 'Prototyping',        img: 'assets/hero-reels/product/suria_008_2023592931295396007.webm' },
				{ title: 'Landing Pages',      img: 'assets/hero-reels/product/suria_014_2006755979766149394.webm' },
				{ title: 'Pitch & Decks',      img: 'assets/hero-reels/brand/suria_034_1980940236927496480.webm' }
			];

			// Fix overflow on ancestors so position:sticky works
			var anc = solution;
			for (var a = 0; a < 8 && anc; a++) {
				var s = window.getComputedStyle(anc);
				if (s.overflow === 'hidden' || s.overflowY === 'hidden') {
					anc.style.overflow = 'visible';
				}
				anc.style.height = 'auto';
				anc = anc.parentElement;
			}

			var host = solution.querySelector('[data-framer-name="container"]') || solution;
			host.style.overflow = 'visible';
			host.style.height = 'auto';

			// Remove old custom if re-initialising
			var oldCustom = host.querySelector('.stoik-solutions-custom');
			if (oldCustom) oldCustom.remove();

			// Hide all Framer children inside host
			var hostKids = Array.from(host.children);
			hostKids.forEach(function(c) { c.classList.add('stoik-sol-hide'); });

			/* ── Build DOM ── */
			var custom = document.createElement('div');
			custom.className = 'stoik-solutions-custom';

			var sticky = document.createElement('div');
			sticky.className = 'stoik-sol-sticky';

			// Left: "Solution" heading
			var left = document.createElement('div');
			left.className = 'stoik-sol-v2-left';
			left.innerHTML = '<h2 class="stoik-sol-v2-heading">Solutions</h2>';

			// Centre: service name list (h4 subheadings, pushed to the side)
			var list = document.createElement('div');
			list.className = 'stoik-sol-v2-list';
			rows.forEach(function(row, i) {
				var item = document.createElement('h4');
				item.className = 'stoik-sol-v2-item' + (i === 0 ? ' active' : '');
				item.setAttribute('data-sol', i);
				item.textContent = row.title;
				list.appendChild(item);
			});

			// Right: rotating image wheel
			var wheelWrap = document.createElement('div');
			wheelWrap.className = 'stoik-sol-wheel-wrap';

			// Tactile dial (SVG) — sits behind the wheel, rotates with it
			var dial = document.createElement('div');
			dial.className = 'stoik-sol-dial';
			var dialRot = document.createElement('div');
			dialRot.className = 'stoik-sol-dial-rot';
			(function buildDialSvg() {
				var N_DIAL = rows.length; // 8
				var MINOR = 96;
				var rOuter = 478, rMinor = 466, rMajor = 446;
				var s = '<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">';
				// minor ticks
				for (var k = 0; k < MINOR; k++) {
					var ang = (k / MINOR) * 360 - 90;
					var rad = ang * Math.PI / 180;
					var x1 = (500 + rMinor * Math.cos(rad)).toFixed(2);
					var y1 = (500 + rMinor * Math.sin(rad)).toFixed(2);
					var x2 = (500 + rOuter * Math.cos(rad)).toFixed(2);
					var y2 = (500 + rOuter * Math.sin(rad)).toFixed(2);
					s += '<line class="tick" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
				}
				// major ticks at each service position
				for (var k = 0; k < N_DIAL; k++) {
					var ang = (k / N_DIAL) * 360 - 90;
					var rad = ang * Math.PI / 180;
					var x1 = (500 + rMajor * Math.cos(rad)).toFixed(2);
					var y1 = (500 + rMajor * Math.sin(rad)).toFixed(2);
					var x2 = (500 + rOuter * Math.cos(rad)).toFixed(2);
					var y2 = (500 + rOuter * Math.sin(rad)).toFixed(2);
					s += '<line class="tick major" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
				}
				s += '</svg>';
				dialRot.innerHTML = s;
			})();
			dial.appendChild(dialRot);
			wheelWrap.appendChild(dial);

			var wheel = document.createElement('div');
			wheel.className = 'stoik-sol-wheel';
			wheelWrap.appendChild(wheel);

			// Progress dots (rightmost)
			var dotsEl = document.createElement('div');
			dotsEl.className = 'stoik-sol-dots';
			rows.forEach(function(_, i) {
				var d = document.createElement('div');
				d.className = 'stoik-sol-dot' + (i === 0 ? ' active' : '');
				dotsEl.appendChild(d);
			});

			// Place images on a circle. RADIUS is computed responsively from
			// the wheel-wrap's actual size so images always fit inside it,
			// never bleeding into the heading/subhead column. Recomputed
			// on resize via fitWheelRadius().
			var STEP = 360 / rows.length;
			var VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;
			rows.forEach(function(row, i) {
				var imgEl = document.createElement('div');
				imgEl.className = 'stoik-sol-wheel-img' + (i === 0 ? ' active' : '');
				imgEl.setAttribute('data-sol', i);
				imgEl.dataset.angle = (i * STEP).toString();
				imgEl.dataset.bx = '0';
				imgEl.dataset.by = '0';
				var inner = document.createElement('div');
				inner.className = 'stoik-sol-wheel-img-inner';
				var media;
				if (VIDEO_EXT.test(row.img)) {
					media = document.createElement('video');
					media.src = row.img;
					media.muted = true;
					media.loop = true;
					media.autoplay = true;
					media.playsInline = true;
					media.setAttribute('muted', '');
					media.setAttribute('playsinline', '');
					media.setAttribute('webkit-playsinline', '');
					media.setAttribute('autoplay', '');
					media.setAttribute('loop', '');
					media.preload = 'metadata';
					media.controls = false;
					media.disablePictureInPicture = true;
					media.draggable = false;
					media.addEventListener('canplay', function(){
						var p = media.play();
						if (p && p.catch) p.catch(function(){});
					}, { once: true });
				} else {
					media = document.createElement('img');
					media.src = row.img;
					media.alt = row.title;
					media.loading = 'lazy';
					media.draggable = false;
				}
				inner.appendChild(media);
				imgEl.appendChild(inner);
				wheel.appendChild(imgEl);
			});
			// Kick videos that didn't fire canplay (Safari quirk)
			wheel.querySelectorAll('video').forEach(function(v){
				try { var p = v.play(); if (p && p.catch) p.catch(function(){}); } catch (e) {}
			});

			sticky.appendChild(left);
			sticky.appendChild(list);
			sticky.appendChild(wheelWrap);
			sticky.appendChild(dotsEl);
			custom.appendChild(sticky);
			host.appendChild(custom);

			/* ── Scroll-driven continuous rotation + idx-snap highlight ── */
			var N = rows.length;
			var STEP_DEG = 360 / N;
			var itemEls = Array.from(list.querySelectorAll('.stoik-sol-v2-item'));
			var imgEls  = Array.from(wheel.querySelectorAll('.stoik-sol-wheel-img'));
			var dotEls  = Array.from(dotsEl.querySelectorAll('.stoik-sol-dot'));
			var current = -1;

			// Active position = 270° (leftmost). Continuous mapping:
			//   wheelDeg(p) = 270 - p * (N-1) * STEP_DEG
			// This way every scroll tick — even within an idx step — produces
			// a small visible rotation. CSS transition (140ms ease) smooths it.
			var initialDeg = 270;
			var totalSweep = (N - 1) * STEP_DEG;
			var wheelDeg = initialDeg;

			function applyTransforms() {
				var deg = wheelDeg.toFixed(2);
				wheel.style.transform = 'rotate(' + deg + 'deg)';
				if (dialRot) dialRot.style.transform = 'rotate(' + deg + 'deg)';
				var inv = (-wheelDeg).toFixed(2);
				imgEls.forEach(function(imgEl) {
					var bx = imgEl.dataset.bx;
					var by = imgEl.dataset.by;
					imgEl.style.transform =
						'translate(calc(-50% + ' + bx + 'px), calc(-50% + ' + by + 'px)) rotate(' + inv + 'deg)';
				});
			}

			function setActiveItem(idx) {
				if (idx === current) return;
				current = idx;
				itemEls.forEach(function(el, i) { el.classList.toggle('active', i === idx); });
				dotEls .forEach(function(el, i) { el.classList.toggle('active', i === idx); });
				imgEls .forEach(function(el, i) { el.classList.toggle('active', i === idx); });
			}

			// Magnetic detent: maps a smooth 0..N-1 input to a stepped curve that
			// slows near each integer (snap point) and accelerates through the
			// midpoint — the "lock into place" feel right before each highlight.
			function magnetIdx(raw) {
				var i = Math.round(raw);
				var d = raw - i;          // -0.5 .. 0.5
				var s = d < 0 ? -1 : 1;
				var a = Math.abs(d) * 2;  // 0..1
				// Cubic ease-in: stays near 0 for small distances, ramps fast near ±0.5
				var eased = Math.pow(a, 3) * 0.5;
				return i + s * eased;
			}

			function onScroll() {
				var rect = custom.getBoundingClientRect();
				var totalScroll = custom.offsetHeight - window.innerHeight;
				if (totalScroll <= 0) return;
				var progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
				// Magnet-driven rotation: continuous, but bites into each snap
				var rawIdx = progress * (N - 1);
				var magIdx = magnetIdx(rawIdx);
				var newDeg = initialDeg - magIdx * STEP_DEG;
				if (Math.abs(newDeg - wheelDeg) > 0.05) {
					wheelDeg = newDeg;
					applyTransforms();
				}
				// Discrete active highlight (snaps to nearest)
				var idx = Math.round(rawIdx);
				idx = Math.max(0, Math.min(N - 1, idx));
				setActiveItem(idx);
			}

			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('resize', onScroll);

			// Lenis (or other smooth-scroll libs) may not fire window 'scroll'.
			// Run a rAF poll while the section is anywhere near the viewport.
			var nearViewport = false;
			var io = new IntersectionObserver(function(entries) {
				entries.forEach(function(en) { nearViewport = en.isIntersecting; });
			}, { rootMargin: '200px 0px 200px 0px' });
			io.observe(custom);

			// Scale dial up when the section is in view, back to 0 when it leaves
			var dialIO = new IntersectionObserver(function(entries) {
				entries.forEach(function(en) {
					dial.classList.toggle('in-view', en.isIntersecting);
				});
			}, { threshold: 0.18 });
			dialIO.observe(custom);

			function pollLoop() {
				if (nearViewport) onScroll();
				requestAnimationFrame(pollLoop);
			}
			requestAnimationFrame(pollLoop);

			// Compute image RADIUS from the wheel-wrap's actual rendered size
			// and rewrite each image's bx/by accordingly, then re-apply the
			// rotation transforms so positions update live.
			function fitWheelRadius() {
				if (!wheelWrap) return;
				var size = wheelWrap.offsetWidth;
				if (size < 50) return;
				// 0.42 keeps a small margin between image edge and wheel edge
				var RADIUS = size * 0.42;
				imgEls.forEach(function(imgEl) {
					var ang = parseFloat(imgEl.dataset.angle) || 0;
					var rad = ang * Math.PI / 180;
					imgEl.dataset.bx = (RADIUS * Math.sin(rad)).toFixed(2);
					imgEl.dataset.by = (-RADIUS * Math.cos(rad)).toFixed(2);
				});
				applyTransforms();
			}

			// Dynamically size the dial so its tick ring lands between the
			// "Solution" heading and the subheading column on any viewport.
			function fitDialBetweenHeadingAndList() {
				if (!dial || !wheelWrap) return;
				var headEl = left;
				var listEl = list;
				if (!headEl || !listEl) return;
				var headRect = headEl.getBoundingClientRect();
				var listRect = listEl.getBoundingClientRect();
				var wrapRect = wheelWrap.getBoundingClientRect();
				if (wrapRect.width < 10) return;
				var wheelCenterX = (wrapRect.left + wrapRect.right) / 2;
				// Target left edge of the tick ring = midpoint of the gap
				var targetX = (headRect.right + listRect.left) / 2;
				var ringRadius = wheelCenterX - targetX;
				if (ringRadius < 80) return; // sanity floor
				// SVG ticks sit at r=478 of a 1000-unit viewBox = 95.6% of dial radius
				var dialDiameter = (ringRadius / 0.956) * 2;
				var insetPx = (wrapRect.width - dialDiameter) / 2;
				var v = insetPx + 'px';
				dial.style.top = v;
				dial.style.left = v;
				dial.style.right = v;
				dial.style.bottom = v;
			}

			// Initialise — set transforms synchronously
			setActiveItem(0);
			fitWheelRadius();
			applyTransforms();
			onScroll();
			fitDialBetweenHeadingAndList();
			window.addEventListener('resize', function() {
				fitWheelRadius();
				fitDialBetweenHeadingAndList();
			});
			[120, 400, 1200].forEach(function(t) {
				setTimeout(function() { fitWheelRadius(); fitDialBetweenHeadingAndList(); }, t);
			});
			document.addEventListener('visibilitychange', function() {
				if (!document.hidden) { onScroll(); fitWheelRadius(); fitDialBetweenHeadingAndList(); }
			});
		}

		function setupProcessSplit() {
			var sections = document.querySelectorAll('section, [data-framer-name^="section-"]');
			var processSection = null;
			var bestScore = -1;
			for (var i = 0; i < sections.length; i++) {
				var sectionName = sections[i].getAttribute('data-framer-name') || '';
				var txt = (sections[i].textContent || '').toLowerCase();
				var score = 0;
				if (txt.indexOf('process') !== -1) score += 3;
				if (txt.indexOf('approach') !== -1) score += 3;
				if (txt.indexOf('timeline') !== -1) score += 2;
				if (txt.indexOf('discovery') !== -1 || txt.indexOf('research') !== -1) score += 2;
				if (txt.indexOf('traditional') !== -1 || txt.indexOf('just bring it') !== -1) score += 3;
				if (txt.indexOf('pricing') !== -1 || txt.indexOf('plan') !== -1) score -= 3;
				if (sectionName === 'section-pricing') score -= 8;
				if (score > bestScore) {
					bestScore = score;
					processSection = sections[i];
				}
			}
			if (bestScore < 4) {
				processSection = null;
				for (var pi = 0; pi < sections.length; pi++) {
					var nameFallback = sections[pi].getAttribute('data-framer-name') || '';
					var txtFallback = (sections[pi].textContent || '').toLowerCase();
					if (nameFallback !== 'section-pricing' && txtFallback.indexOf('process') !== -1) {
						processSection = sections[pi];
						break;
					}
				}
			}
			if (!processSection) return;

			var host = processSection.querySelector('[data-framer-name="container"]');
			if (!host) {
				var bottomWrap = processSection.querySelector('[data-framer-name="bottom"]');
				host = bottomWrap && bottomWrap.parentElement ? bottomWrap.parentElement : processSection;
			}
			if (!host) return;
			processSection.style.overflow = 'visible';
			host.style.overflow = 'visible';

			var steps = [];
			var cards = processSection.querySelectorAll('[data-highlight="true"], [data-framer-name*="open"], [data-framer-name*="Desktop-open"]');
			for (var c = 0; c < cards.length; c++) {
				var card = cards[c];
				if (window.getComputedStyle(card).display === 'none') continue;
				var titleEl = card.querySelector('h4, h3, .framer-styles-preset-1v8q4nq, .framer-styles-preset-18pmrus');
				if (!titleEl) continue;
				var title = (titleEl.textContent || '').replace(/\s+/g, ' ').trim();
				if (!title || title.toLowerCase() === 'process' || title.toLowerCase() === 'approach') continue;
				if (steps.some(function(item) { return item.title === title; })) continue;

				var allText = card.querySelectorAll('p, .framer-text');
				var desc = '';
				var timeline = '';
				for (var t = 0; t < allText.length; t++) {
					var v = (allText[t].textContent || '').replace(/\s+/g, ' ').trim();
					if (!v) continue;
					if (!timeline && /(timeline|day|days|week|weeks)/i.test(v)) timeline = v;
					if (v.length > desc.length && v.length > 48 && !/(timeline|day|days|week|weeks)/i.test(v)) desc = v;
				}
				steps.push({ title: title, desc: desc, timeline: timeline });
			}

			if (steps.length < 2) {
				steps = [
					{ title: 'Discovery & Research', desc: 'We audit context, user intent, and constraints before touching production. This keeps momentum high while reducing avoidable rework.', timeline: 'Timeline - 1 Day' },
					{ title: 'Strategy & Direction', desc: 'We define priorities, scope, and execution order so decisions are clear and each iteration compounds toward outcomes.', timeline: 'Timeline - 1 Day' },
					{ title: 'Build & Iterate', desc: 'We ship in focused increments, test quickly, and adjust in real time so quality and speed stay aligned.', timeline: 'Timeline - 1-2 Days' },
					{ title: 'Launch & Scale', desc: 'We finalize performance, polish, and document a practical system so the team can keep shipping confidently.', timeline: 'Timeline - Ongoing' }
				];
			}
			if (steps.length > 4) steps = steps.slice(0, 4);

			var oldAll = document.querySelectorAll('.stoik-process-hide');
			for (var oh = 0; oh < oldAll.length; oh++) oldAll[oh].classList.remove('stoik-process-hide');
			var strayMounts = document.querySelectorAll('.stoik-process-split');
			for (var sm = 0; sm < strayMounts.length; sm++) {
				if (!processSection.contains(strayMounts[sm])) strayMounts[sm].remove();
			}

			var oldBottom = processSection.querySelector('[data-framer-name="bottom"]');
			if (oldBottom) oldBottom.classList.add('stoik-process-hide');

			var oldApproach = processSection.querySelectorAll('.framer-text, p, span');
			for (var a = 0; a < oldApproach.length; a++) {
				var raw = (oldApproach[a].textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
				if (raw === 'approach') oldApproach[a].textContent = 'Traditional / Just bring it';
			}

			var mount = processSection.querySelector('.stoik-process-split');
			if (!mount) {
				mount = document.createElement('div');
				mount.className = 'stoik-process-split';
				host.appendChild(mount);
			}
			// Idempotent guard — if the cards (and videos) are already built,
			// don't rewrite innerHTML on every MutationObserver tick. Doing so
			// would tear down and re-create the <video> elements, restarting
			// playback from scratch each time and causing visible glitching.
			if (mount.dataset.stoikBuilt === '1' && mount.querySelectorAll('.stoik-process-box').length === 2) {
				return;
			}
			if (mount._stoikProcessTimer) clearInterval(mount._stoikProcessTimer);
			if (mount._stoikOnScroll) {
				window.removeEventListener('scroll', mount._stoikOnScroll);
				window.removeEventListener('resize', mount._stoikOnScroll);
			}

			mount.innerHTML =
				'<div class="stoik-process-stage">' +
					'<div class="stoik-process-two-boxes">' +
						'<section class="stoik-process-box stoik-pbox">' +
							'<span class="stoik-process-approach-chip">Approach 1</span>' +
							'<p class="stoik-process-label">Traditional</p>' +
							'<p class="stoik-pbox-copy">' +
								'We design the orthodox way. Discovery, scoping, sprints, ' +
								'checkpoints, reviews, the documented playbook every ' +
								'stakeholder already knows. Predictable cadence, clean ' +
								'paper trail, zero surprises at delivery. The dependable ' +
								'lane when the brief calls for one.' +
							'</p>' +
							'<video class="stoik-pbox-video" autoplay muted loop playsinline preload="metadata" src="assets/traditional.webm"></video>' +
						'</section>' +
						'<section class="stoik-process-box stoik-pbox">' +
							'<span class="stoik-process-approach-chip">Approach 2</span>' +
							'<p class="stoik-process-label">Just bring it</p>' +
							'<p class="stoik-pbox-copy">' +
								'I break every barrier and just create. No process, no ' +
								'permission slips, no waiting around. The brief lands and ' +
								'the work starts. Restless and detail-obsessed, I lock ' +
								'onto the problem and refine until it physically can’t ' +
								'be improved. Pure instinct, shipped sharp.' +
							'</p>' +
							'<video class="stoik-pbox-video" autoplay muted loop playsinline preload="metadata" src="assets/justbringit.webm"></video>' +
						'</section>' +
					'</div>' +
				'</div>';
			mount.dataset.stoikBuilt = '1';
		}

		function resetProjectsSection() {
			var stack = document.getElementById('stoik-card-stack');
			if (stack) stack.remove();
			var section = document.querySelector('[data-framer-name="section-projects"]');
			if (section) section.style.removeProperty('display');
		}

		function applyChamfer() {
			var tags = document.querySelectorAll('a, button');
			for (var i = 0; i < tags.length; i++) {
				var el = tags[i];
				if (el.dataset.chamfered) continue;
				var label = (el.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
				if (label === 'VIEW') {
					el.style.clipPath = 'none';
					el.style.borderRadius = '0';
					el.dataset.chamfered = '1';
					continue;
				}
				var w = el.offsetWidth, h = el.offsetHeight;
				if (w > 30 && h > 20) {
					el.style.clipPath = clip;
					el.dataset.chamfered = '1';
				}
			}
			// Card/box elements with background (including small white CTA inner box)
			var framerEls = document.querySelectorAll('[class*="framer-"]');
			for (var j = 0; j < framerEls.length; j++) {
				var el = framerEls[j];
				if (el.dataset.chamfered) continue;
				var w = el.offsetWidth, h = el.offsetHeight;
				var cs = window.getComputedStyle(el);
				var bg = cs.backgroundColor;
				var hasRealBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
				if (hasRealBg && w > 30 && h > 20 && w < 900 && h < 700) {
					el.style.clipPath = clip;
					el.dataset.chamfered = '1';
				}
			}
		}

		// Testimonial entries — drive the section-team cards (now repurposed
		// into "What our clients say"). Each card index 0..3 maps to one entry.
		var STOIK_TESTIMONIALS = [
			{
				name: 'Stanislav Buynovskiy',
				role: 'Art Director, Lido',
				image: 'assets/testimonials/stanislav.webp',
				quote: 'Yogi was on my team at P2P.org. Sharp eye, fast turnaround, and zero hand-holding — exactly the kind of designer you trust to ship.'
			},
			{
				name: 'Rick Bagshaw',
				role: 'Ex-CMO, P2P.org',
				image: 'assets/testimonials/rick.webp',
				quote: 'Yogi anchored marketing design at P2P.org. Strong taste, fast turnarounds, and a real sense of ownership over the brand — he raised the bar for everything the team shipped.'
			},
			{
				name: 'Filip Berger',
				role: 'Marketing, RedStone',
				image: 'assets/testimonials/filip.webp',
				quote: 'Whenever I needed graphics for campaigns or social posts, Yogi turned them around fast, often same day. He gets the brief on first read and adapts when context changes.'
			},
			{
				name: 'WhyShock',
				role: 'DeFi Analyst, Kelp',
				image: 'assets/testimonials/whyshock.webp',
				quote: 'Yogi just gets it. Brief in, banger out.'
			}
		];

		function fixReviewsAndTeam() {
			// Hide the Reviews section (first section-testimonials with star ratings)
			var allTestimonials = document.querySelectorAll('[data-framer-name="section-testimonials"]');
			for (var i = 0; i < allTestimonials.length; i++) {
				var sec = allTestimonials[i];
				var h = sec.querySelector('h2, h3');
				if (h && h.innerText.trim() === 'Reviews') {
					sec.style.display = 'none';
					break;
				}
			}

			// Convert section-team cards into testimonial cards
			var teamSection = document.querySelector('[data-framer-name="section-team"]');
			if (!teamSection) return;
			var imageContainers = teamSection.querySelectorAll('[data-framer-name="image-container"]');
			if (imageContainers.length < 4) return;

			// We have 4 cards × 3 breakpoint variants = up to 12 image-containers.
			// Map each container to a testimonial by its order within its variant.
			// Simplest: walk children of each [data-framer-name="right"] grid.
			var rights = teamSection.querySelectorAll('[data-framer-name="right"]');
			rights.forEach(function(grid){
				var cards = Array.from(grid.children);
				cards.forEach(function(card, idx){
					var meta = STOIK_TESTIMONIALS[idx];
					if (!meta) return;
					var imgContainer = card.querySelector('[data-framer-name="image-container"]');
					var img = imgContainer && imgContainer.querySelector('img');
					if (img) {
						img.src = meta.image;
						if (img.removeAttribute) img.removeAttribute('srcset');
						img.style.objectFit = 'cover';
					}
					// Hide social-icon-wrapper (X, etc.)
					var social = card.querySelector('[data-framer-name="social-icon-wrapper"]');
					if (social) social.style.display = 'none';
					// Hide the original white info block — name/role go inside the image overlay now
					var info = card.querySelector('[data-framer-name="info"]');
					if (info) info.style.display = 'none';
					// Inject card overlay INSIDE image-container — quote + name + role
					if (imgContainer && !imgContainer.querySelector(':scope > .stoik-test-card')) {
						var ov = document.createElement('div');
						ov.className = 'stoik-test-card';
						ov.innerHTML =
							'<p class="stoik-test-quote-in">' + '“' + meta.quote + '”' + '</p>' +
							'<div class="stoik-test-meta">' +
								'<p class="stoik-test-name">' + meta.name + '</p>' +
								'<p class="stoik-test-role">' + meta.role + '</p>' +
							'</div>';
						try { imgContainer.appendChild(ov); } catch (e) {}
					}
				});
			});
		}

		function setupNavScramble() {
			// Use document-level delegation — survives React re-renders
			if (window._stoikNavScrambleDelegated) return;
			window._stoikNavScrambleDelegated = true;
			var CHARS = '!@#%^&*<>?/|~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			function scramble(el, original) {
				cancelAnimationFrame(el._stoikRaf);
				var frame = 0, totalFrames = 22;
				function tick() {
					frame++;
					var revealed = Math.floor((frame / totalFrames) * original.length);
					var out = '';
					for (var i = 0; i < original.length; i++) {
						out += i < revealed ? original[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
					}
					el.textContent = out;
					el._stoikRaf = frame < totalFrames ? requestAnimationFrame(tick) : (el.textContent = original, undefined);
				}
				requestAnimationFrame(tick);
			}
			document.addEventListener('mouseover', function(e) {
				var a = e.target && e.target.closest && e.target.closest('[data-framer-name="nav-wrapper"] a');
				if (!a || a._stoikOver) return;
				a._stoikOver = true;
				a.querySelectorAll('p').forEach(function(p) {
					var orig = p.getAttribute('data-stoik-orig');
					if (!orig) { orig = p.textContent.trim(); p.setAttribute('data-stoik-orig', orig); }
					scramble(p, orig);
				});
			});
			document.addEventListener('mouseout', function(e) {
				var a = e.target && e.target.closest && e.target.closest('[data-framer-name="nav-wrapper"] a');
				if (!a) return;
				var to = e.relatedTarget;
				if (to && a.contains(to)) return; // still inside link
				a._stoikOver = false;
				a.querySelectorAll('p').forEach(function(p) {
					cancelAnimationFrame(p._stoikRaf);
					p.textContent = p.getAttribute('data-stoik-orig') || p.textContent;
				});
			});
		}

		// Rewrite the digits inside the 3 stat cards. Idempotent — gated by
		// dataset.stoikNum so React rerenders that put back the original digits
		// get caught and replaced by the next applyAll tick (via MutationObserver).
		function setStatCardNumbers() {
			// Match BOTH original template labels and post-replacement labels.
			// Order matters: more specific keys first.
			var statValues = [
				{ keys: ['Years of', 'Experies', 'Expertise', 'Experience'], value: '8+' },
				{ keys: ['TVL', 'Awards', 'Achievements'],                   value: '$12B+' },
				{ keys: ['Web3', 'Completed', 'Projects'],                   value: '10+' }
			];
			var cards = document.querySelectorAll('.framer-1bhz4ma');
			cards.forEach(function(card) {
				var p = card.querySelector('.framer-m2h5ew p, .framer-m2h5ew .framer-text');
				if (!p) return;
				var t = (p.textContent || '').trim();
				var match = null;
				for (var s = 0; s < statValues.length && !match; s++) {
					for (var k = 0; k < statValues[s].keys.length; k++) {
						if (t.indexOf(statValues[s].keys[k]) >= 0) {
							match = statValues[s].value;
							break;
						}
					}
				}
				if (!match) return;
				var numContainer = card.querySelector('.framer-1w63x84-container');
				if (!numContainer) return;
				if (numContainer.dataset.stoikNum === match) return;
				var firstSpan = numContainer.querySelector('span');
				var style = firstSpan ? firstSpan.getAttribute('style') || '' : '';
				// Sizes set in CSS via !important — keep inline values consistent.
				style = style.replace(/font-size:\s*\d+(?:\.\d+)?px/, 'font-size:52px');
				style = style.replace(/line-height:\s*\d+(?:\.\d+)?px/, 'line-height:1');
				style = style.replace(/letter-spacing:\s*-?\d+(?:\.\d+)?px/, 'letter-spacing:0.04em');
				numContainer.innerHTML = '<span style="' + style + '">' + match + '</span>';
				numContainer.dataset.stoikNum = match;
			});
		}

		function run() {
			var done = injectSpline();
			ensureHeroCarousel();
			replaceText();
			setStatCardNumbers();
			fixHeadline();
			alignHeroHeading();
			remodelHero();
			injectHeroDisplay();
			removeAboutPromoRow();
				setupAboutWordReveal();
				resetProjectsSection();
				removeFramerBadge();
				cleanupFooterAndBrand();
				applyChamfer();
				fixReviewsAndTeam();
			cleanupLegacyUI();
			setupSolutionAutoOpen();
			setupProcessSplit();
			setupSectionGrids();
			convertAccentSquaresToAsterisks();
			setupBlueSquareRotation();
			applyClientsHeadingClass();
			applyServicesHeadingClientsClass();
			setupNavScramble();
			setupProjectCardTilt();
			if (!done) setTimeout(run, 200);
		}

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function() { setTimeout(run, 100); });
		} else {
			setTimeout(run, 100);
		}

		var paused = false;
		var observer = new MutationObserver(function() {
			if (paused) return;
			paused = true;
				setTimeout(function() {
					injectSpline();
					ensureHeroCarousel();
					replaceText();
							setStatCardNumbers();
							fixHeadline();
							alignHeroHeading();
							remodelHero();
							injectHeroDisplay();
							removeAboutPromoRow();
								setupAboutWordReveal();
								resetProjectsSection();
								removeFramerBadge();
								cleanupFooterAndBrand();
								fixReviewsAndTeam();
							applyChamfer();
							cleanupLegacyUI();
							setupSolutionAutoOpen();
							setupProcessSplit();
							setupSectionGrids();
							convertAccentSquaresToAsterisks();
							setupBlueSquareRotation();
							applyClientsHeadingClass();
							applyServicesHeadingClientsClass();
					paused = false;
				}, 50);
		});
		observer.observe(document.body, { childList: true, subtree: true });
		window.addEventListener('resize', function() {
			alignHeroHeading();
			remodelHero();
			setupAboutWordReveal();
			setupSectionGrids();
			applyServicesHeadingClientsClass();
		});
		})();


