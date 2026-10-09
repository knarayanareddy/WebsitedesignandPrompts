const cardsView = document.querySelector("#cardsView");
const indexYearView = document.querySelector("#indexYearView");
const indexTypeView = document.querySelector("#indexTypeView");
const typeIndexGroups = document.querySelector("#typeIndexGroups");
const viewButtons = [...document.querySelectorAll("[data-view-button]")];
const indexViewButtons = [...document.querySelectorAll("[data-index-view-button]")];
const allViewOptions = document.querySelector("#allViewOptions");

function renderPortfolioViews() {
  const markup = portfolioViewMarkup();
  const projectGrid = document.querySelector("#projects");
  const bioCard = document.querySelector(".site-footer-note");
  // Generated builds already contain the cards; source previews can fill them.
  if (!projectGrid.querySelector("[data-project-id]")) projectGrid.innerHTML = markup.cards;
  if (bioCard) {
    bioCard.classList.add("project", "project--bio", "project--paper");
    bioCard.dataset.accent = "paper";
    projectGrid.append(bioCard);
  }
  if (!indexYearView.querySelector("[data-project-id]")) indexYearView.innerHTML = markup.chronology;
  if (!typeIndexGroups.querySelector("[data-project-id]")) typeIndexGroups.innerHTML = markup.types;
}

renderPortfolioViews();

const projects = [...document.querySelectorAll(".project[data-category]")];

document.documentElement.classList.add("masonry-ready");

let layoutFrame;

const cardAccentPalette = ["red", "blue", "teal", "olive", "orange", "rose", "paper"];

function setCardAccent(card, accent) {
  card.classList.remove(...cardAccentPalette.map((color) => `project--${color}`));
  card.classList.add(`project--${accent}`);
}

function balanceAdjacentCardColors(grid) {
  const cards = [...grid.querySelectorAll(".project")];
  if (cards.length < 2) return;

  cards.forEach((card) => setCardAccent(card, card.dataset.accent));

  const cardLayout = cards.map((card) => ({
    card,
    bounds: card.getBoundingClientRect()
  }));
  const columns = [...new Set(cardLayout.map(({ bounds }) => Math.round(bounds.left)))].sort((a, b) => a - b);
  const neighbours = new Map(cards.map((card) => [card, new Set()]));

  const connect = (first, second) => {
    neighbours.get(first.card).add(second.card);
    neighbours.get(second.card).add(first.card);
  };

  columns.forEach((columnLeft) => {
    const columnCards = cardLayout
      .filter(({ bounds }) => Math.abs(bounds.left - columnLeft) < 2)
      .sort((first, second) => first.bounds.top - second.bounds.top);

    columnCards.slice(0, -1).forEach((card, index) => connect(card, columnCards[index + 1]));
  });

  columns.slice(0, -1).forEach((columnLeft, index) => {
    const nextColumnLeft = columns[index + 1];
    const columnCards = cardLayout.filter(({ bounds }) => Math.abs(bounds.left - columnLeft) < 2);
    const nextColumnCards = cardLayout.filter(({ bounds }) => Math.abs(bounds.left - nextColumnLeft) < 2);

    columnCards.forEach((first) => {
      nextColumnCards.forEach((second) => {
        const verticalOverlap = Math.min(first.bounds.bottom, second.bounds.bottom)
          - Math.max(first.bounds.top, second.bounds.top);
        if (verticalOverlap > 12) connect(first, second);
      });
    });
  });

  const chosenColors = new Map();
  cards.forEach((card) => {
    const unavailableColors = new Set(
      [...neighbours.get(card)].map((neighbour) => chosenColors.get(neighbour)).filter(Boolean)
    );
    const preferredColor = card.dataset.accent;
    const colorOptions = [preferredColor, ...cardAccentPalette.filter((color) => color !== preferredColor)];
    const chosenColor = colorOptions.find((color) => !unavailableColors.has(color)) || preferredColor;
    chosenColors.set(card, chosenColor);
    setCardAccent(card, chosenColor);
  });
}

function layoutMasonry() {
  window.cancelAnimationFrame(layoutFrame);
  layoutFrame = window.requestAnimationFrame(() => {
    if (cardsView.hidden) return;

    cardsView.querySelectorAll(".project-grid").forEach((grid) => {
      const gridStyle = window.getComputedStyle(grid);
      const rowHeight = Number.parseFloat(gridStyle.gridAutoRows);
      const rowGap = Number.parseFloat(gridStyle.rowGap);
      const cards = [...grid.querySelectorAll(".project")];

      cards.forEach((project) => {
        project.classList.remove("project--aligned-last-row");
        project.style.gridRowEnd = "auto";
        const cardHeight = project.querySelector(".project-card, .site-footer-note-card").getBoundingClientRect().height;
        const rowSpan = Math.ceil((cardHeight + rowGap) / (rowHeight + rowGap));
        project.style.gridRowEnd = `span ${rowSpan}`;
      });

      balanceAdjacentCardColors(grid);

      const columns = [...new Set(cards.map((card) => Math.round(card.getBoundingClientRect().left)))];
      if (columns.length === 3 && cards.length >= 3 && cards.length % 3 === 0) {
        const finalRow = cards.slice(-3);
        const targetBottom = Math.max(...finalRow.map((card) => card.getBoundingClientRect().bottom));

        finalRow.forEach((card) => {
          const bounds = card.getBoundingClientRect();
          const targetHeight = targetBottom - bounds.top;
          const targetSpan = Math.ceil((targetHeight + rowGap) / (rowHeight + rowGap));
          card.style.gridRowEnd = `span ${targetSpan}`;
          card.classList.add("project--aligned-last-row");
          setCardAccent(card, card.dataset.accent);
        });
      }
    });
  });
}

let currentIndexView = "year";

function setPortfolioView(view, indexView = currentIndexView) {
  const curatedActive = view === "curated";
  currentIndexView = indexView;
  cardsView.hidden = !curatedActive;
  allViewOptions.hidden = curatedActive;
  indexYearView.hidden = curatedActive || currentIndexView !== "year";
  indexTypeView.hidden = curatedActive || currentIndexView !== "type";

  viewButtons.forEach((button) => {
    const active = button.dataset.viewButton === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  indexViewButtons.forEach((button) => {
    const active = button.dataset.indexViewButton === currentIndexView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (curatedActive) layoutMasonry();
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setPortfolioView(button.dataset.viewButton));
});

indexViewButtons.forEach((button) => {
  button.addEventListener("click", () => setPortfolioView("all", button.dataset.indexViewButton));
});

projects.flatMap((project) => [...project.querySelectorAll("img")]).forEach((image) => {
  if (!image.complete) image.addEventListener("load", layoutMasonry, { once: true });
});

window.addEventListener("resize", layoutMasonry);
window.addEventListener("load", layoutMasonry);

if (document.fonts?.ready) document.fonts.ready.then(layoutMasonry);

setPortfolioView("curated");

const profileIntro = document.querySelector(".profile-intro");
const profileIntroSummary = profileIntro?.querySelector("summary");
const profileIntroCopy = profileIntro?.querySelector(".profile-intro-card p");
const profileIntroLinks = profileIntro?.querySelector(".profile-intro-links");
const profileIntroMark = document.querySelector(".title-mark");
const frenchWebsiteLink = profileIntroLinks?.querySelector('a[href="https://www.mariedrouvin.com/"]');
const englishWebsiteLink = profileIntroLinks?.querySelector('a[href="https://notes.mariedrouvin.com/"]');
const isFrenchPage = document.documentElement.lang.startsWith("fr");
let profileIntroHelp = null;

if (profileIntro && profileIntroMark) {
  const titleEnd = profileIntroMark.parentElement;
  profileIntro.id = "profile-intro";
  profileIntroHelp = document.createElement("button");
  profileIntroHelp.className = "title-mark";
  profileIntroHelp.type = "button";
  profileIntroHelp.textContent = "?";
  profileIntroHelp.setAttribute("aria-label", isFrenchPage ? "Lire la note de Marie" : "Open Marie’s note");
  profileIntroHelp.setAttribute("aria-controls", profileIntro.id);
  profileIntroHelp.setAttribute("aria-expanded", "false");
  profileIntroMark.remove();
  titleEnd.after(profileIntroHelp);
}

frenchWebsiteLink?.remove();

if (englishWebsiteLink) {
  profileIntroLinks?.prepend(englishWebsiteLink);
  englishWebsiteLink.setAttribute("aria-label", isFrenchPage ? "Site de Marie" : "Marie’s website");
  const websiteLabel = englishWebsiteLink.querySelector("span:last-child");
  const websiteIcon = englishWebsiteLink.querySelector(".profile-intro-icon");
  if (websiteLabel) websiteLabel.textContent = isFrenchPage ? "Site" : "Website";
  if (websiteIcon) {
    websiteIcon.classList.remove("profile-intro-icon--text");
    websiteIcon.textContent = "";
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconSvg.setAttribute("aria-hidden", "true");
    iconSvg.setAttribute("viewBox", "0 0 24 24");
    iconPath.setAttribute("d", "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.04 8.04 0 0 1 18.93 8ZM12 4c.83 1.2 1.47 2.54 1.82 4H10.18A13.7 13.7 0 0 1 12 4ZM4.26 14a7.8 7.8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4h-3.4Zm.81 2h2.95a15.7 15.7 0 0 0 1.38 3.56A8.04 8.04 0 0 1 5.07 16ZM8.02 8H5.07A8.04 8.04 0 0 1 9.4 4.44 15.7 15.7 0 0 0 8.02 8ZM12 20a13.7 13.7 0 0 1-1.82-4h3.64A13.7 13.7 0 0 1 12 20Zm2.21-6H9.79a14.4 14.4 0 0 1 0-4h4.42a14.4 14.4 0 0 1 0 4Zm.39 5.56A15.7 15.7 0 0 0 15.98 16h2.95a8.04 8.04 0 0 1-4.33 3.56ZM16.34 14a16.5 16.5 0 0 0 0-4h3.4a7.8 7.8 0 0 1 0 4h-3.4Z");
    iconSvg.append(iconPath);
    websiteIcon.append(iconSvg);
  }
}

if (profileIntroLinks && !profileIntroLinks.querySelector('a[href^="mailto:"]')) {
  const emailLink = document.createElement("a");
  emailLink.className = "profile-intro-link";
  emailLink.href = "mailto:mariedrouvin.com@gmail.com";
  emailLink.setAttribute("aria-label", isFrenchPage ? "Écrire à Marie" : "Email Marie");

  const emailIcon = document.createElement("span");
  emailIcon.className = "profile-intro-icon profile-intro-icon--text";
  emailIcon.setAttribute("aria-hidden", "true");
  emailIcon.textContent = "@";

  const emailLabel = document.createElement("span");
  emailLabel.textContent = "Email";
  emailLink.append(emailIcon, emailLabel);
  profileIntroLinks.append(emailLink);
}

if (profileIntroSummary && profileIntroCopy) {
  profileIntroCopy.id = "profile-intro-copy";
  profileIntroSummary.setAttribute("aria-describedby", profileIntroCopy.id);
}

profileIntroHelp?.addEventListener("click", () => {
  if (profileIntro) profileIntro.open = !profileIntro.open;
});

profileIntro?.addEventListener("toggle", () => {
  profileIntroHelp?.setAttribute("aria-expanded", String(profileIntro.open));
});

document.addEventListener("click", (event) => {
  if (profileIntro?.open && !profileIntro.contains(event.target) && !profileIntroHelp?.contains(event.target)) {
    profileIntro.removeAttribute("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && profileIntro?.open) {
    profileIntro.removeAttribute("open");
    profileIntroHelp?.focus();
  }
});

const projectEnhancements = {
  "portfolio": {
    type: "Website",
    date: "2026-08",
    status: "In progress",
    links: []
  },
  "taste-archive": {
    type: "Private tool",
    date: "2026-07",
    status: "Active",
    gallery: [
      { src: "assets/projects/taste-archive/overview.webp", alt: "Taste Archive gallery showing collected references and project cards" },
      { src: "assets/projects/taste-archive/light-gallery.webp", alt: "Taste Archive gallery in light mode" },
      { src: "assets/projects/taste-archive/reference-detail.webp", alt: "A reference opened in the Taste Archive detail panel" },
      { src: "assets/projects/taste-archive/readwise-gallery.webp", alt: "Readwise references collected in Taste Archive" },
      { src: "assets/projects/taste-archive/canvas.webp", alt: "Taste Archive canvas connecting visual references and notes" }
    ],
    links: [
      { label: "Read how I built it", href: "https://notes.mariedrouvin.com/i-made-my-own-thinking-app" }
    ]
  },
  "mariedrouvin-com": {
    type: "Independent website",
    date: "2026-06",
    status: "Live",
    gallery: [
      { src: "assets/projects/mariedrouvin-com/home-dark.webp", alt: "Dark-mode homepage of mariedrouvin.com" },
      { src: "assets/projects/mariedrouvin-com/home-light.webp", alt: "Light-mode homepage of mariedrouvin.com" },
      { src: "assets/projects/mariedrouvin-com/gallery.webp", alt: "Gallery page on mariedrouvin.com" },
      { src: "assets/projects/mariedrouvin-com/consultation.webp", alt: "Consultation page on mariedrouvin.com" }
    ],
    linkLabel: "Visit mariedrouvin.com"
  },
  "dear-future-wish-you-were-here": {
    type: "Web experiment",
    date: "2026-08",
    status: "Live",
    gallery: [
      { src: "assets/projects/dear-future/hero-dark.webp", alt: "Dear Future, Wish You Were Here homepage in dark mode" },
      { src: "assets/projects/dear-future/hero-light.webp", alt: "Dear Future, Wish You Were Here homepage in light mode" },
      { src: "assets/projects/dear-future/wishes-grid.webp", alt: "A grid of anonymous wishes submitted to Dear Future" }
    ],
    linkLabel: "Visit the archive"
  },
  "notes-mariedrouvin-com": {
    type: "Independent publishing",
    date: "2026-06",
    status: "Live",
    gallery: [
      { src: "assets/projects/notes-mariedrouvin-com/home-dark.webp", alt: "Homepage of notes.mariedrouvin.com in dark mode" },
      { src: "assets/projects/notes-mariedrouvin-com/home-light.webp", alt: "Homepage of notes.mariedrouvin.com in light mode" },
      { src: "assets/projects/notes-mariedrouvin-com/article.webp", alt: "An essay page on notes.mariedrouvin.com" },
      { src: "assets/projects/notes-mariedrouvin-com/hire-me.webp", alt: "The creative work gallery on notes.mariedrouvin.com" },
      { src: "assets/projects/notes-mariedrouvin-com/post-footer.webp", alt: "Reader response links at the end of a post" }
    ],
    linkLabel: "Visit notes.mariedrouvin.com"
  },
  "organons": {
    type: "Book",
    date: "2026-04",
    status: "Published",
    linkLabel: "See Organons"
  },
  "ferme-de-la-terriere": {
    type: "Client website",
    date: "2026-05",
    status: "Live",
    linkLabel: "Visit the website"
  },
  "content-graph": { type: "Interactive archive", linkLabel: "Explore the content graph" },
  "marie-s-library": { type: "Private library", linkLabel: "Open the private library" },
  "peopledex": { type: "Research tool", linkLabel: "Open the private tool" },
  "tweet-inbox": { type: "Private tool" },
  "substack-feed-blocker": { type: "Browser extension", linkLabel: "See the extension" },
  "youtube-carousel-tool": { type: "Private tool", linkLabel: "Open the private tool" }
};

portfolioProjects.forEach((project) => {
  const defaultGallery = project.media?.src
    ? [{ src: project.media.src, alt: project.media.alt }]
    : [];
  projectEnhancements[project.id] = {
    type: project.typeLabel || project.types.map(localizeType).join(" + "),
    date: project.dateLabel || formatProjectDate(project.date),
    status: localizeStatus(project.status),
    tags: project.types.map(localizeType),
    gallery: project.gallery || defaultGallery,
    components: project.components || [],
    story: project.story || [],
    storyCopy: project.storyCopy || [],
    storyDiagram: project.storyDiagram || null,
    storyFlow: project.storyFlow || null,
    storyVideo: project.storyVideo || null,
    storyHeading: project.storyHeading || "",
    narrativeSections: project.narrativeSections || [],
    links: project.links ?? (project.href.startsWith("http")
      ? [{ label: project.linkLabel || localeUi.openProject || "Open project", href: project.href }]
      : [])
  };
});

const drawerLayer = document.querySelector("#projectDrawerLayer");
const drawer = document.querySelector("#projectDrawer");
const pageMain = document.querySelector("main");
const drawerScrim = document.querySelector("#projectDrawerScrim");
const drawerClose = document.querySelector("#projectDrawerClose");
const drawerScroll = drawer.querySelector(".project-drawer-scroll");
const drawerGallery = document.querySelector("#projectDrawerGallery");
const drawerGalleryTrack = document.querySelector("#projectDrawerGalleryTrack");
const drawerGalleryNav = document.querySelector("#projectDrawerGalleryNav");
const drawerGalleryCount = document.querySelector("#projectDrawerGalleryCount");
const drawerPrevious = document.querySelector("#projectDrawerPrevious");
const drawerNext = document.querySelector("#projectDrawerNext");
const drawerType = document.querySelector("#projectDrawerType");
const drawerDate = document.querySelector("#projectDrawerDate");
const drawerStatus = document.querySelector("#projectDrawerStatus");
const drawerTitle = document.querySelector("#projectDrawerTitle");
const drawerDescription = document.querySelector("#projectDrawerDescription");
const drawerComponentsSection = document.querySelector("#projectDrawerComponentsSection");
const drawerComponentsTitle = document.querySelector("#projectDrawerComponentsTitle");
const drawerComponents = document.querySelector("#projectDrawerComponents");
const drawerStorySection = document.querySelector("#projectDrawerStorySection");
const drawerStoryTitle = document.querySelector("#projectDrawerStoryTitle");
const drawerStory = document.querySelector("#projectDrawerStory");
const drawerStoryCopy = document.querySelector("#projectDrawerStoryCopy");
const drawerLinksSection = document.querySelector("#projectDrawerLinksSection");
const drawerLinks = document.querySelector("#projectDrawerLinks");
const drawerNarrative = document.querySelector("#projectDrawerNarrative");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let lastDrawerTrigger = null;
let drawerCloseTimer;
let galleryScrollFrame;

function slugifyProjectTitle(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const projectIndexTypes = {
  "portfolio": "Independent websites",
  "dear-future-wish-you-were-here": "Independent websites",
  "taste-archive": "Tools & experiments",
  "content-graph": "Tools & experiments",
  "marie-s-library": "Tools & experiments",
  "peopledex": "Tools & experiments",
  "tweet-inbox": "Tools & experiments",
  "substack-feed-blocker": "Tools & experiments",
  "youtube-carousel-tool": "Tools & experiments",
  "ferme-de-la-terriere": "Client work",
  "notes-mariedrouvin-com": "Independent websites",
  "mariedrouvin-com": "Independent websites"
};

const projectIndexTypeOrder = ["Independent websites", "Tools & experiments", "Client work"];

function buildTypeIndex() {
  const groupedEntries = new Map(projectIndexTypeOrder.map((type) => [type, []]));
  const sourceEntries = [...indexYearView.querySelectorAll(".chronology-entry")];

  sourceEntries.forEach((entry) => {
    const title = entry.querySelector(".chronology-name")?.textContent.trim() || "";
    const type = projectIndexTypes[slugifyProjectTitle(title)] || "Other";
    if (!groupedEntries.has(type)) groupedEntries.set(type, []);
    groupedEntries.get(type).push(entry.cloneNode(true));
  });

  const groups = [...groupedEntries.entries()]
    .filter(([, entries]) => entries.length)
    .map(([type, entries]) => {
      const group = document.createElement("div");
      group.className = "chronology-group";

      const heading = document.createElement("h3");
      heading.textContent = type;

      const list = document.createElement("ol");
      list.className = "chronology-list";
      entries.forEach((entry) => {
        const item = document.createElement("li");
        item.append(entry);
        list.append(item);
      });

      group.append(heading, list);
      return group;
    });

  typeIndexGroups.replaceChildren(...groups);
}

// The type index is rendered directly from portfolioProjects above so projects
// with more than one type can appear in every relevant section.

const projectTriggers = [...document.querySelectorAll(".project-card, .chronology-entry")];

projectTriggers.forEach((trigger) => {
  const title = trigger.querySelector("h2, .chronology-name")?.textContent.trim();
  if (!title) return;
  if (!trigger.dataset.projectId) trigger.dataset.projectId = slugifyProjectTitle(title);
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
});

function setupCardCarousels() {
  projectTriggers
    .filter((trigger) => trigger.classList.contains("project-card"))
    .forEach((card) => {
      const gallery = projectEnhancements[card.dataset.projectId]?.gallery
        ?.filter((item) => item.type !== "youtube" && item.src);
      const media = card.querySelector(".project-media");
      const title = card.querySelector("h2")?.textContent.trim() || localeUi.project || "Project";
      if (!media || media.classList.contains("project-media--graphic") || !gallery || gallery.length < 2) return;

      const track = document.createElement("div");
      track.className = "card-carousel-track";

      gallery.forEach((image, index) => {
        const slide = document.createElement("img");
        slide.src = image.src;
        slide.alt = index === 0 ? image.alt || `${title} - ${localeUi.projectImage || "project image"}` : "";
        slide.loading = index === 0 ? "eager" : "lazy";
        slide.decoding = "async";
        slide.setAttribute("aria-hidden", String(index !== 0));
        track.append(slide);
      });

      media.classList.add("project-media--carousel");
      media.replaceChildren(track);

      let current = 0;
      let previewDelay;
      let previewRotation;
      const showSlide = (nextIndex) => {
        current = (nextIndex + gallery.length) % gallery.length;
        [...track.children].forEach((slide, index) => {
          slide.classList.toggle("is-active", index === current);
          slide.setAttribute("aria-hidden", String(index !== current));
        });
      };

      const stopPreview = () => {
        window.clearTimeout(previewDelay);
        window.clearInterval(previewRotation);
        showSlide(0);
      };

      media.addEventListener("pointerenter", (event) => {
        if (reducedMotion.matches || event.pointerType === "touch") return;
        window.clearTimeout(previewDelay);
        window.clearInterval(previewRotation);
        previewDelay = window.setTimeout(() => {
          showSlide(current + 1);
          previewRotation = window.setInterval(() => showSlide(current + 1), 1800);
        }, 500);
      });
      media.addEventListener("pointerleave", stopPreview);
      showSlide(0);
    });
}

setupCardCarousels();

document.querySelectorAll(".project-arrow").forEach((arrow) => {
  arrow.textContent = "+";
});

function valueFromEnhancement(enhancement, key, fallback = "") {
  return Object.prototype.hasOwnProperty.call(enhancement, key) ? enhancement[key] : fallback;
}

function projectDetails(projectId) {
  const triggers = projectTriggers.filter((trigger) => trigger.dataset.projectId === projectId);
  const card = triggers.find((trigger) => trigger.classList.contains("project-card"));
  const indexEntry = triggers.find((trigger) => trigger.classList.contains("chronology-entry"));
  const enhancement = projectEnhancements[projectId] || {};
  const title = card?.querySelector("h2")?.textContent.trim()
    || indexEntry?.querySelector(".chronology-name")?.textContent.trim()
    || localeUi.project
    || "Project";
  const description = card?.querySelector(".project-copy h2 + p")?.textContent.trim()
    || indexEntry?.querySelector(".chronology-type")?.textContent.trim()
    || "";
  const kicker = card?.querySelector(".project-kicker")?.textContent.trim() || "";
  const kickerDate = kicker.match(/\b(?:19|20)\d{2}\b/)?.[0] || "";
  const indexGroupDate = indexEntry?.closest(".chronology-group")?.querySelector("h3")?.textContent.trim() || "";
  const fallbackDate = kickerDate || (indexGroupDate === "Earlier" ? "" : indexGroupDate);
  const fallbackType = kicker.replace(/\s*·\s*(?:19|20)\d{2}\s*/g, "").trim();
  const status = valueFromEnhancement(
    enhancement,
    "status",
    indexEntry?.querySelector(".chronology-status")?.textContent.trim() || ""
  );
  const tags = card
    ? [...card.querySelectorAll(".project-tags li")].map((tag) => tag.textContent.trim())
    : [];
  const cardImage = card?.querySelector(".project-media img");
  const defaultGallery = cardImage
    ? [{ src: cardImage.getAttribute("src"), alt: cardImage.getAttribute("alt") || `${title} - ${localeUi.projectImage || "project image"}` }]
    : [];
  const externalTrigger = triggers.find((trigger) => /^https?:/i.test(trigger.href));
  const fallbackLink = externalTrigger
    ? [{ label: enhancement.linkLabel || localeUi.openProject || "Open project", href: externalTrigger.href }]
    : [];

  return {
    caseStudyUrl: caseStudyIds.includes(projectId) ? caseStudyPath(projectId) : null,
    title,
    description,
    type: valueFromEnhancement(enhancement, "type", fallbackType),
    date: valueFromEnhancement(enhancement, "date", fallbackDate),
    status,
    tags: valueFromEnhancement(enhancement, "tags", tags),
    gallery: valueFromEnhancement(enhancement, "gallery", defaultGallery),
    components: valueFromEnhancement(enhancement, "components", []),
    story: valueFromEnhancement(enhancement, "story", []),
    storyCopy: valueFromEnhancement(enhancement, "storyCopy", []),
    storyDiagram: valueFromEnhancement(enhancement, "storyDiagram", null),
    storyFlow: valueFromEnhancement(enhancement, "storyFlow", null),
    storyVideo: valueFromEnhancement(enhancement, "storyVideo", null),
    storyHeading: valueFromEnhancement(enhancement, "storyHeading", ""),
    narrativeSections: valueFromEnhancement(enhancement, "narrativeSections", []),
    links: valueFromEnhancement(enhancement, "links", fallbackLink)
  };
}

function setOptionalText(element, value) {
  element.textContent = value || "";
  element.hidden = !value;
}

function statusTone(status) {
  const normalized = status.toLowerCase();
  if (normalized.includes("active") || normalized.includes("live") || normalized.includes("ligne")) return "active";
  if (normalized.includes("progress") || normalized.includes("prototype") || normalized.includes("cours")) return "draft";
  if (normalized.includes("private") || normalized.includes("privé")) return "private";
  return "complete";
}

function updateGalleryPosition() {
  window.cancelAnimationFrame(galleryScrollFrame);
  galleryScrollFrame = window.requestAnimationFrame(() => {
    const slideCount = drawerGalleryTrack.children.length;
    if (!slideCount) return;
    const current = Math.min(
      slideCount,
      Math.max(1, Math.round(drawerGalleryTrack.scrollLeft / drawerGalleryTrack.clientWidth) + 1)
    );
    const currentVideo = drawerGalleryTrack.children[current - 1]?.querySelector(".project-drawer-video");
    if (currentVideo && !currentVideo.getAttribute("src")) {
      currentVideo.src = currentVideo.dataset.src;
    }
    drawerGalleryCount.textContent = `${current} / ${slideCount}`;
    drawerPrevious.disabled = current === 1;
    drawerNext.disabled = current === slideCount;
  });
}

function renderProjectDrawer(details) {
  drawerTitle.textContent = details.title;
  drawerDescription.textContent = details.description;
  drawerDescription.hidden = !details.description;
  setOptionalText(drawerType, details.type);
  setOptionalText(drawerDate, details.date);
  setOptionalText(drawerStatus, details.status);
  drawerStatus.dataset.tone = statusTone(details.status || "");

  const gallerySlides = details.gallery.map((image, index) => {
    const figure = document.createElement("figure");
    figure.className = "project-drawer-slide";

    if (image.type === "youtube") {
      figure.classList.add("project-drawer-slide--video");
      const projectVideo = document.createElement("iframe");
      projectVideo.className = "project-drawer-video";
      projectVideo.dataset.src = `https://www.youtube-nocookie.com/embed/${image.videoId}`;
      projectVideo.title = image.alt || `${details.title} trailer`;
      projectVideo.loading = "lazy";
      projectVideo.referrerPolicy = "strict-origin-when-cross-origin";
      projectVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      projectVideo.allowFullscreen = true;
      figure.append(projectVideo);
      return figure;
    }

    const projectImage = document.createElement("img");
    projectImage.src = image.src;
    projectImage.alt = image.alt || `${details.title} - ${localeUi.projectImage || "project image"} ${index + 1}`;
    projectImage.loading = index === 0 ? "eager" : "lazy";
    projectImage.decoding = "async";
    figure.append(projectImage);
    if (image.label) {
      const caption = document.createElement("figcaption");
      caption.textContent = image.label;
      figure.append(caption);
    }
    return figure;
  });
  drawerGalleryTrack.replaceChildren(...gallerySlides);
  drawerGallery.hidden = gallerySlides.length === 0;
  drawerGalleryNav.hidden = gallerySlides.length < 2;
  drawerGalleryTrack.scrollLeft = 0;
  updateGalleryPosition();

  const componentItems = details.components.map((component) => {
    const item = document.createElement("li");
    const title = document.createElement("h4");
    const detail = document.createElement("p");
    title.textContent = component.title;
    detail.textContent = component.detail;
    item.append(title, detail);
    return item;
  });
  drawerComponentsTitle.textContent = localeUi.componentsHeading || "The workflows";
  drawerComponents.replaceChildren(...componentItems);
  drawerComponentsSection.hidden = componentItems.length === 0;

  const storyItems = details.story.map((part) => {
    const item = document.createElement("li");
    const title = document.createElement("h4");
    const detail = document.createElement("p");
    title.textContent = part.title;
    detail.textContent = part.detail;
    item.append(title, detail);
    return item;
  });
  drawerStoryTitle.textContent = details.storyHeading || localeUi.storyHeading || "Behind the project";
  drawerStory.replaceChildren(...storyItems);
  drawerStory.hidden = storyItems.length === 0;

  const storyParagraphs = details.storyCopy.map((block) => {
    const paragraph = document.createElement("p");
    if (typeof block === "string") {
      paragraph.textContent = block;
      return paragraph;
    }
    const anchor = document.createElement("a");
    anchor.href = block.href;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = block.text;
    paragraph.append(anchor);
    return paragraph;
  });
  let storyDiagram = null;
  if (details.storyDiagram) {
    storyDiagram = document.createElement("figure");
    storyDiagram.className = "project-drawer-hub";
    storyDiagram.setAttribute("aria-label", details.storyDiagram.label);

    const core = document.createElement("div");
    core.className = "project-drawer-hub-core";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = details.storyDiagram.eyebrow;
    const coreTitle = document.createElement("strong");
    coreTitle.textContent = details.storyDiagram.title;
    core.append(eyebrow, coreTitle);

    const branches = document.createElement("ul");
    branches.className = "project-drawer-hub-branches";
    const branchItems = details.storyDiagram.branches.map((branch) => {
      const item = document.createElement("li");
      const title = document.createElement("strong");
      title.textContent = branch.title;
      const text = document.createElement("span");
      text.textContent = branch.text;
      item.append(title, text);
      return item;
    });
    branches.replaceChildren(...branchItems);
    storyDiagram.append(core, branches);
  }

  let storyFlow = null;
  if (details.storyFlow) {
    storyFlow = document.createElement("ol");
    storyFlow.className = "project-drawer-process project-drawer-process--three";
    storyFlow.setAttribute("aria-label", details.storyFlow.label);
    storyFlow.replaceChildren(...details.storyFlow.steps.map((step) => {
      const item = document.createElement("li");
      const text = document.createElement("span");
      text.textContent = step;
      item.append(text);
      return item;
    }));
  }

  let storyVideo = null;
  if (details.storyVideo) {
    storyVideo = document.createElement("figure");
    storyVideo.className = "project-drawer-story-video";
    const iframe = document.createElement("iframe");
    iframe.className = "project-drawer-video";
    iframe.src = `https://www.youtube-nocookie.com/embed/${details.storyVideo.videoId}`;
    iframe.title = details.storyVideo.title;
    iframe.loading = "eager";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    storyVideo.append(iframe);
    if (details.storyVideo.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = details.storyVideo.caption;
      storyVideo.append(caption);
    }
  }

  drawerStoryCopy?.replaceChildren(
    ...storyParagraphs,
    ...(storyDiagram ? [storyDiagram] : []),
    ...(storyFlow ? [storyFlow] : []),
    ...(storyVideo ? [storyVideo] : [])
  );
  if (drawerStoryCopy) drawerStoryCopy.hidden = storyParagraphs.length === 0 && !storyDiagram && !storyFlow && !storyVideo;
  drawerStorySection.hidden = storyItems.length === 0 && storyParagraphs.length === 0 && !storyDiagram && !storyFlow && !storyVideo;

  const storyLink = details.caseStudyUrl ? [{ label: portfolioLocale === "fr" ? "Ouvrir la page du projet" : "Open the project story", href: details.caseStudyUrl }] : [];
  const linkItems = [...storyLink, ...details.links].map((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    if (link.href.startsWith("http")) { anchor.target = "_blank"; anchor.rel = "noopener"; }
    anchor.textContent = link.label;
    return anchor;
  });
  drawerLinks.replaceChildren(...linkItems);
  drawerLinksSection.hidden = linkItems.length === 0;

  const narrativeSections = details.narrativeSections.map((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "project-drawer-narrative-section";
    const title = document.createElement("h3");
    title.textContent = section.title;
    sectionElement.append(title);

    section.blocks.forEach((block) => {
      if (block.type === "process") {
        const process = document.createElement("ol");
        process.className = "project-drawer-process";
        process.setAttribute("aria-label", block.label || section.title);
        const steps = block.steps.map((step) => {
          const item = document.createElement("li");
          const label = document.createElement("span");
          label.textContent = step;
          item.append(label);
          return item;
        });
        process.replaceChildren(...steps);
        sectionElement.append(process);
        return;
      }

      if (block.type === "image") {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = siteAssetUrl(block.src);
        image.alt = block.alt || "";
        image.loading = "lazy";
        image.decoding = "async";
        figure.append(image);
        if (block.caption) {
          const caption = document.createElement("figcaption");
          caption.textContent = block.caption;
          figure.append(caption);
        }
        sectionElement.append(figure);
        return;
      }

      if (block.type === "imageGrid") {
        const grid = document.createElement("div");
        grid.className = "project-drawer-image-grid";
        const figures = block.images.map((imageBlock) => {
          const figure = document.createElement("figure");
          const image = document.createElement("img");
          image.src = siteAssetUrl(imageBlock.src);
          image.alt = imageBlock.alt || "";
          image.loading = "lazy";
          image.decoding = "async";
          figure.append(image);
          if (imageBlock.caption) {
            const caption = document.createElement("figcaption");
            caption.textContent = imageBlock.caption;
            figure.append(caption);
          }
          return figure;
        });
        grid.replaceChildren(...figures);
        sectionElement.append(grid);
        return;
      }

      if (block.type === "colorComposition") {
        const figure = document.createElement("figure");
        figure.className = "project-drawer-color-composition";
        const stage = document.createElement("div");
        stage.className = "project-drawer-color-composition-stage";
        const images = block.images.map((imageBlock) => {
          const image = document.createElement("img");
          image.src = siteAssetUrl(imageBlock.src);
          image.alt = imageBlock.alt || "";
          image.loading = "lazy";
          image.decoding = "async";
          return image;
        });
        stage.replaceChildren(...images);
        figure.append(stage);
        if (block.caption) {
          const caption = document.createElement("figcaption");
          caption.textContent = block.caption;
          figure.append(caption);
        }
        sectionElement.append(figure);
        return;
      }

      if (block.type === "list") {
        const list = document.createElement(block.ordered ? "ol" : "ul");
        list.className = "project-drawer-list";
        const items = block.items.map((itemText) => {
          const item = document.createElement("li");
          item.textContent = itemText;
          return item;
        });
        list.replaceChildren(...items);
        sectionElement.append(list);
        return;
      }

      const paragraph = document.createElement("p");
      if (Array.isArray(block.parts)) {
        block.parts.forEach((part) => {
          if (!part.emphasis) {
            paragraph.append(document.createTextNode(part.text));
            return;
          }
          const emphasis = document.createElement(part.emphasis === "strong" ? "strong" : "em");
          emphasis.textContent = part.text;
          paragraph.append(emphasis);
        });
      } else {
        paragraph.textContent = block.text;
      }
      sectionElement.append(paragraph);
    });

    return sectionElement;
  });
  drawerNarrative?.replaceChildren(...narrativeSections);
  if (drawerNarrative) drawerNarrative.hidden = narrativeSections.length === 0;
  drawerScroll.scrollTop = 0;
}

function matchDrawerToProjectCard(projectId, trigger) {
  const sourceCard = trigger.classList.contains("project-card")
    ? trigger
    : document.querySelector(`.project-card[data-project-id="${projectId}"]`);
  const sourceProject = sourceCard?.closest(".project");
  if (!sourceProject) return;

  const projectStyles = window.getComputedStyle(sourceProject);
  drawer.style.setProperty("--drawer-surface", projectStyles.getPropertyValue("--surface"));
  drawer.style.setProperty("--drawer-ink", projectStyles.getPropertyValue("--project-ink"));
  drawer.dataset.accent = [...sourceProject.classList]
    .find((className) => className.startsWith("project--") && !["project--feature", "project--text-only"].includes(className))
    ?.replace("project--", "") || sourceProject.dataset.accent;
}

function openProjectDrawer(projectId, trigger) {
  window.clearTimeout(drawerCloseTimer);
  lastDrawerTrigger = trigger;
  matchDrawerToProjectCard(projectId, trigger);
  renderProjectDrawer(projectDetails(projectId));
  projectTriggers.forEach((item) => item.setAttribute("aria-expanded", String(item === trigger)));
  if (pageMain) pageMain.inert = true;
  drawerLayer.hidden = false;
  document.body.classList.add("project-drawer-open");
  window.requestAnimationFrame(() => drawerLayer.classList.add("is-open"));
  window.setTimeout(() => drawer.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 180);
}

function closeProjectDrawer() {
  if (drawerLayer.hidden) return;
  drawerLayer.classList.remove("is-open");
  projectTriggers.forEach((item) => item.setAttribute("aria-expanded", "false"));
  drawerCloseTimer = window.setTimeout(() => {
    drawerGalleryTrack.scrollLeft = 0;
    drawerGalleryTrack.replaceChildren();
    drawerLayer.hidden = true;
    if (pageMain) pageMain.inert = false;
    document.body.classList.remove("project-drawer-open");
    lastDrawerTrigger?.focus();
  }, reducedMotion.matches ? 0 : 310);
}

function moveGallery(direction) {
  drawerGalleryTrack.scrollBy({
    left: drawerGalleryTrack.clientWidth * direction,
    behavior: reducedMotion.matches ? "auto" : "smooth"
  });
}

projectTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProjectDrawer(trigger.dataset.projectId, trigger);
  });
});

drawerScrim.addEventListener("click", closeProjectDrawer);
drawerClose.addEventListener("click", closeProjectDrawer);
drawerPrevious.addEventListener("click", () => moveGallery(-1));
drawerNext.addEventListener("click", () => moveGallery(1));
drawerGalleryTrack.addEventListener("scroll", updateGalleryPosition, { passive: true });
drawerGalleryTrack.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

document.addEventListener("keydown", (event) => {
  if (drawerLayer.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectDrawer();
    return;
  }
  if (event.key !== "Tab") return;

  const focusable = [...drawer.querySelectorAll("a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.hidden && element.getClientRects().length > 0);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Private-project fallback notes also have a useful direct-link destination.
function openRequestedProject() {
  const requestedProject = portfolioProjects.find((project) => window.location.hash === `#project-${project.id}`);
  if (!requestedProject) return;
  const trigger = projectTriggers.find((item) => item.dataset.projectId === requestedProject.id);
  if (trigger) openProjectDrawer(requestedProject.id, trigger);
}
openRequestedProject();
window.addEventListener("hashchange", openRequestedProject);

const backgroundLab = document.querySelector("#backgroundLab");
const backgroundLabColor = document.querySelector("#backgroundLabColor");
const backgroundLabHex = document.querySelector("#backgroundLabHex");
const backgroundLabReset = document.querySelector("#backgroundLabReset");
const backgroundLabCopy = document.querySelector("#backgroundLabCopy");
const backgroundLabClose = document.querySelector("#backgroundLabClose");
const backgroundLabStatus = document.querySelector("#backgroundLabStatus");
const backgroundLabKey = "portfolio-dark-frame-color";
const defaultDarkFrameColor = "#171f21";
const labParameters = new URLSearchParams(window.location.search);

function validHexColor(value) {
  return /^#[0-9a-f]{6}$/i.test(value);
}

function applyBackgroundLabColor(value, save = true) {
  const color = value.toLowerCase();
  if (!validHexColor(color)) return;
  document.documentElement.style.setProperty("--portfolio-background", color);
  backgroundLabColor.value = color;
  backgroundLabHex.value = color;
  backgroundLabHex.style.backgroundColor = color;
  if (save) window.localStorage.setItem(backgroundLabKey, color);
}

function setBackgroundLabStatus(message) {
  backgroundLabStatus.textContent = message;
  window.clearTimeout(setBackgroundLabStatus.timer);
  setBackgroundLabStatus.timer = window.setTimeout(() => {
    backgroundLabStatus.textContent = "";
  }, 1800);
}

if (labParameters.get("lab") === "background") {
  const savedColor = window.localStorage.getItem(backgroundLabKey);
  document.documentElement.classList.add("background-lab-active");
  backgroundLab.hidden = false;
  applyBackgroundLabColor(validHexColor(savedColor || "") ? savedColor : defaultDarkFrameColor, false);

  backgroundLabColor.addEventListener("input", () => applyBackgroundLabColor(backgroundLabColor.value));
  backgroundLabHex.addEventListener("input", () => {
    if (validHexColor(backgroundLabHex.value)) applyBackgroundLabColor(backgroundLabHex.value);
  });
  backgroundLabHex.addEventListener("blur", () => {
    backgroundLabHex.value = backgroundLabColor.value;
  });
  backgroundLabReset.addEventListener("click", () => {
    window.localStorage.removeItem(backgroundLabKey);
    applyBackgroundLabColor(defaultDarkFrameColor, false);
    setBackgroundLabStatus("Reset to the current dark background");
  });
  backgroundLabCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(backgroundLabColor.value);
      setBackgroundLabStatus("Color copied");
    } catch {
      backgroundLabHex.select();
      setBackgroundLabStatus("Value selected - press Command-C");
    }
  });
  backgroundLabClose.addEventListener("click", () => {
    backgroundLab.hidden = true;
    document.documentElement.classList.remove("background-lab-active");
    document.documentElement.style.removeProperty("--portfolio-background");
    const url = new URL(window.location.href);
    url.searchParams.delete("lab");
    window.history.replaceState({}, "", url);
  });
}
