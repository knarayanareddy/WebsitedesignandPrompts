const portfolioLocale = document.documentElement.lang === "fr" ? "fr" : "en";
const localeBundle = window.portfolioTranslations?.[portfolioLocale] || {};
const localeUi = localeBundle.ui || {};

const portfolioProjects = [
  {
    id: "round-music-widget",
    title: "Round Music Widget",
    types: ["Tool"],
    date: "2026-09",
    status: "Open source",
    description: "A native macOS companion I designed and built to keep the current Apple Music artwork on the desktop as a movable glass-like bubble with playback controls.",
    href: "https://github.com/maried-boop/round-music-widget",
    linkLabel: "View the project on GitHub",
    links: [
      { label: "View the project on GitHub", href: "https://github.com/maried-boop/round-music-widget" }
    ],
    storyHeading: "Why I made this project",
    storyCopy: [
      "I find it astonishing that macOS does not have an Apple Music widget. I really like music widgets, mostly because I like seeing the artwork for whatever album I am currently listening to.",
      "There are apps you can download, but I knew exactly what I wanted. I wanted a sort of bubble with an effect around the edge. I wanted it to be pretty and to go with whatever I was listening to.",
      "So I made Round Music Widget, which is exactly what it sounds like."
    ],
    narrativeSections: [
      {
        title: "How I built this",
        blocks: [
          {
            type: "paragraph",
            parts: [
              { text: "It stays in sync with Apple Music. ", emphasis: "strong" },
              { text: "Every time I open Music, the widget opens and shows the artwork for the song or album I am listening to, with basic controls for play, next and previous." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "The interesting bit is the design. ", emphasis: "strong" },
              { text: "I wanted a bubble, not just a circular frame with the artwork inside it. So I added an effect around the edge that extends and distorts the image a little, as if you were looking at the artwork through " },
              { text: "a magnifying dome or one of those strange lenses", emphasis: "em" },
              { text: ". When you hover over the widget, the song title and artist appear around the frame." }
            ]
          },
          {
            type: "paragraph",
            text: "When I close Apple Music, the widget closes too. I can move it anywhere on the desktop and choose between four sizes, from compact to extra large, depending on what I am doing."
          }
        ]
      },
      {
        title: "What comes next",
        blocks: [
          {
            type: "paragraph",
            text: "One thing that does not look good is a text-heavy album cover. I have several possible solutions in mind, which I may add as I use the widget more and more."
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Use the playlist cover instead of the album cover. This usually happens when I am listening to classical music, and I usually listen to classical music from a playlist.",
              "Detect and use only the part of the album cover that does not contain text. That would probably involve AI, or some kind of detection automation. I am not sure it is worth it. It may be too heavy for the scope of the tool.",
              "Let me replace a text-heavy album cover with either a random photograph or one I have chosen.",
              "Do nothing and decide that this is fine."
            ]
          },
          {
            type: "image",
            src: "assets/projects/round-music-widget/text-heavy-album.webp",
            alt: "Round Music Widget showing a text-heavy Camille Saint-Saëns album cover with track information and controls layered around it",
            caption: "An example of a text-heavy album cover that does not quite look right in the widget."
          }
        ]
      }
    ],
    accent: "orange",
    media: {
      src: "assets/projects/round-music-widget/pink.webp",
      alt: "Round Music Widget displaying Billie Holiday's Solitude artwork in a circular glass-like player",
      shape: "tall"
    },
    gallery: [
      { src: "assets/projects/round-music-widget/pink.webp", alt: "Round Music Widget displaying Billie Holiday's Solitude artwork in a circular glass-like player" },
      { src: "assets/projects/round-music-widget/hero.webp", alt: "Round Music Widget displaying black-and-white artwork in a circular glass-like player" },
      { src: "assets/projects/round-music-widget/sculpture.webp", alt: "Round Music Widget displaying monochrome sculpture artwork" },
      { src: "assets/projects/round-music-widget/compact.webp", alt: "Round Music Widget shown at a compact size" }
    ]
  },
  {
    id: "open-yale-course-notebooks",
    title: "Open Yale Course Notebooks",
    types: ["Website", "Skill"],
    date: "2026-09",
    status: "Live",
    description: "A free website I designed and built around four public Yale lecture series, plus an open-source Codex skill that turns verified course sources into the same notebook format.",
    href: "https://notebooks.mariedrouvin.com/",
    linkLabel: "Explore the notebooks",
    links: [
      { label: "Explore the notebooks", href: "https://notebooks.mariedrouvin.com/" },
      { label: "View the Course Notebook skill", href: "https://github.com/maried-boop/course-notebook" }
    ],
    storyHeading: "Why I made this project",
    storyCopy: [
      "When I was 20, I enrolled in university in Dublin, Ireland.",
      "I’m French, and at the time my English wasn’t very good. So, being the genius I was, I enrolled in an Irish history course. Now, I knew nothing about Irish history. I had no cultural or historical background to fall back on: everything I knew was French. Obviously, after the first few lectures, I was completely overwhelmed.",
      "Because I could access the slides in advance, I started making documents before each lecture. I used them to give myself the context I was missing and understand what the lecture was going to be about. They helped me follow the course (and pass it!!!!) even when my English was still shaky.",
      "Happy ending.",
      "Now, I’m no longer at university, but I still love learning.",
      "And the wonderful world of the internet is full of complete, free courses from some of the world’s best universities. These days, my English is much better. My concentration, not so much.",
      "So I returned to the same method, with help from AI, and started creating notebooks to accompany some of the Yale courses I was taking. I’ve brought them together on a free website.",
      { text: "https://notebooks.mariedrouvin.com/", href: "https://notebooks.mariedrouvin.com/" },
      "Each notebook is designed to help me (and you now) understand the context before you watch a lecture, then remember what you have just watched afterwards. It does NOT replace the course. It is here to guide you through these wonderful lectures, all freely available online.",
      "The notebooks were made with AI. I turned the process into a Course Notebook skill so that you can use it to make your own. It was tested on Open Yale Courses, but it is not limited to them. You may need to poke at it, ask it to improve a few things and make the result your own.",
      "I hope you enjoy the notebooks. If you want to see what else I’ve been making during my current vibe-coding phase, you can find it in my portfolio.",
      { text: "Course Notebook skill on GitHub·", href: "https://github.com/maried-boop/course-notebook" }
    ],
    narrativeSections: [
      {
        title: "How I built this",
        blocks: [
          {
            type: "process",
            label: "How a Course Notebook is made",
            steps: [
              "Yale course title",
              "AI checks the Yale page, playlist and transcripts",
              "The skill creates the content and applies the design",
              "Course notebook"
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "The first challenge was finding content complete enough to be interesting. ", emphasis: "strong" },
              { text: "I tried MIT OpenCourseWare first, but many of the courses there were incomplete. The first thing I had built was the Course Maker skill, and it was trying to make courses out of material that simply did not contain enough. That is how I landed on the Open Yale lecture series." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "The second challenge was finding the right level of detail. ", emphasis: "strong" },
              { text: "The notebooks needed to surface enough information to give me, and eventually anyone following the courses, a broad view of what the course was about and what its main principles were. But they could not simply repeat the videos or replace the lectures." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "The useful structure also changes with the subject. Chronology is essential for " },
              { text: "The Early Middle Ages", emphasis: "em" },
              { text: ", but much less important for psychology. At first, I tried to make the skill extract first principles. That did not really work for history, and it drowned out a lot of the interesting details in psychology." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "Eventually, I realised that " },
              { text: "the instructor had already done that work for me", emphasis: "strong" },
              { text: ". All I really needed to do was follow the structure of the lectures and extract their topics and subtopics. That became the structure of the notebooks." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "I had a much clearer idea of the design because I was already playing with my own website and thinking about rebuilding more of my courses on my own platform. I wanted the notebooks to be " },
              { text: "beautiful to look at, easy to read, and comfortable on an iPad or any tablet-sized screen", emphasis: "em" },
              { text: "." }
            ]
          }
        ]
      },
      {
        title: "What comes next",
        blocks: [
          {
            type: "paragraph",
            text: "The goal is to add more courses. I’ll admit that, so far, this is still a personal project, so I’m primarily following my own interests."
          },
          {
            type: "paragraph",
            text: "I also want to keep testing the Course Notebook skill on other platforms and other types of content. I think the method can travel much further than Yale."
          }
        ]
      }
    ],
    accent: "blue",
    media: {
      src: "assets/projects/course-notebooks/website.webp",
      alt: "Open Yale Course Notebooks homepage with three illustrated course covers",
      shape: "portrait"
    },
    gallery: [
      { src: "assets/projects/course-notebooks/website.webp", alt: "Open Yale Course Notebooks homepage with three illustrated course covers" },
      { src: "assets/projects/course-notebooks/early-middle-ages.webp", alt: "The Early Middle Ages notebook open on its first lecture" },
      { src: "assets/projects/course-notebooks/psychology.webp", alt: "Introduction to Psychology notebook showing an illustrated note about Phineas Gage" }
    ]
  },
  {
    id: "taste-archive",
    title: "Taste Archive",
    types: ["Tool"],
    date: "2026-07",
    status: "Private",
    description: "A private visual archive I built to collect references, think with them on a canvas and call them into my AI work by code or collection.",
    href: "https://notes.mariedrouvin.com/i-made-my-own-thinking-app",
    links: [],
    storyHeading: "Why I made this project",
    storyCopy: [
      "I originally wanted an app where I could think visually with all the things I save: my own notes, Readwise highlights, Pinterest saves, Twitter bookmarks, Substack notes and images. I wanted to search across those collections and put things together on a canvas.",
      "There were already tools with canvases, but none of them quite worked for me. Freeform was not connected to my collections. Obsidian felt clunky, looked wrong and would have required one file for every Readwise highlight. Sublime had a canvas, but it felt like building on borrowed land. It is ultimately a social network, and I did not want more social media in my life.",
      "So I built an alternative for myself. But what it turned into is actually more useful than the original idea: an archive I can reference directly from my AI work.",
      "When I want to build something, generate an image or explain the vibe of a design, I can give Codex the code for one reference or point it at an entire collection. I do not have to copy and paste the same images into AI chats over and over. That has become the biggest use case for me."
    ],
    storyDiagram: {
      label: "Taste Archive connects one central collection to three uses",
      eyebrow: "Central collection",
      title: "Taste Archive",
      branches: [
        { title: "Archive", text: "References + sources" },
        { title: "AI", text: "Codex accesses the archive" },
        { title: "Canvas", text: "Think with my references" }
      ]
    },
    storyVideo: {
      videoId: "atpzkUr9OEY",
      title: "Taste Archive walkthrough video (in French)",
      caption: "A complete walkthrough of how Taste Archive works."
    },
    narrativeSections: [
      {
        title: "How I built this",
        blocks: [
          {
            type: "paragraph",
            text: "I started with the first half of the solution: somewhere I could save pictures and quotes, organise them into collections and keep their sources. Basically, an online database connected to a browser extension."
          },
          {
            type: "image",
            src: "assets/projects/taste-archive/saving-from-browser.gif",
            alt: "A Wikipedia artwork being saved into Taste Archive through the browser extension",
            caption: "Saving a visual reference directly from the browser."
          },
          {
            type: "paragraph",
            text: "Over the first few weeks, I started adding more stupidly personal features:"
          },
          {
            type: "list",
            items: [
              "Detect when I was saving one of my own tweets or Substack notes and tag it in the right collection.",
              "Show text-only entries on coloured backgrounds using my own palette.",
              "Filter the archive by text, images or everything together."
            ]
          },
          {
            type: "imageGrid",
            images: [
              {
                src: "assets/projects/taste-archive/mostly-red.webp",
                alt: "Taste Archive search results dominated by red visual references",
                caption: "Searching the visual archive for mostly red references."
              },
              {
                src: "assets/projects/taste-archive/mostly-blue.webp",
                alt: "Taste Archive search results dominated by blue visual references",
                caption: "The same archive searched for mostly blue references."
              }
            ]
          },
          {
            type: "paragraph",
            text: "Once that was working well enough, I built the second half: a place where I could search the archive and drop items onto an infinite canvas. It gave me a more visual way to think, with multiple saved canvases, extra notes, collection search and the same text-or-image filters as the archive."
          },
          {
            type: "image",
            src: "assets/projects/taste-archive/canvas.webp",
            alt: "Taste Archive canvas connecting visual references, Readwise highlights and notes",
            caption: "The canvas, where saved references and notes can be arranged into a visual line of thought."
          },
          {
            type: "paragraph",
            parts: [
              { text: "The part I expected to be difficult was Readwise. ", emphasis: "strong" },
              { text: "It is an external service, and my collection contains more than 10,000 highlights. I assumed I would be exporting CSV files constantly. Instead, Codex built an automated, separate Readwise collection that syncs with a button." }
            ]
          },
          {
            type: "image",
            src: "assets/projects/taste-archive/readwise-only.webp",
            alt: "Taste Archive filtered to show only colourful text cards imported from Readwise",
            caption: "The separate Readwise collection, with highlights turned into searchable cards."
          },
          {
            type: "paragraph",
            parts: [
              { text: "One of the ideas that came later became the biggest use case. ", emphasis: "strong" },
              { text: "Taste Archive has a synced local version on my computer. Every reference has its own code, and I can also point Codex to a complete collection. I can say, ‘look at this reference’ or ‘look at this collection’ when I am building something, generating images or trying to express the visual direction of a design." }
            ]
          },
          {
            type: "image",
            src: "assets/projects/taste-archive/ai-reference-numbers.gif",
            alt: "Taste Archive assigning visible reference numbers to selected items for use with Codex",
            caption: "Selecting numbered references that I can call by code from Codex."
          },
          {
            type: "paragraph",
            text: "The web app stays synced between my devices, while the local copy gives Codex access to the same reference system. It saves me from copying and pasting images into AI chats all the freaking time."
          }
        ]
      },
      {
        title: "What comes next",
        blocks: [
          {
            type: "paragraph",
            text: "I am now in the phase where I am using it extensively and trying not to add every little feature that crosses my mind. I keep track of those ideas, then wait to see which ones I genuinely miss and which were just whims of the moment."
          },
          {
            type: "paragraph",
            text: "For now, the roadmap is less about adding features and more about making Taste Archive increasingly stable, seeing how it handles a larger and larger collection, and smoothing out the collaboration with AI."
          },
          {
            type: "paragraph",
            text: "It has honestly become one of the most important tools in my workflow."
          }
        ]
      }
    ],
    accent: "red",
    feature: true,
    media: { src: "assets/projects/taste-archive/overview.webp", alt: "Taste Archive gallery showing collected references and project cards", shape: "tall" },
    gallery: [
      { src: "assets/projects/taste-archive/overview.webp", alt: "Taste Archive gallery showing collected references and project cards" },
      { src: "assets/projects/taste-archive/saving-from-browser.gif", alt: "A visual reference being saved into Taste Archive from the browser" },
      { src: "assets/projects/taste-archive/ai-reference-numbers.gif", alt: "Taste Archive assigning numbered reference codes for use with Codex" },
      { src: "assets/projects/taste-archive/light-gallery.webp", alt: "Taste Archive gallery in light mode" },
      { src: "assets/projects/taste-archive/reference-detail.webp", alt: "A reference opened in the Taste Archive detail panel" },
      { src: "assets/projects/taste-archive/readwise-gallery.webp", alt: "Readwise references collected in Taste Archive" },
      { src: "assets/projects/taste-archive/canvas.webp", alt: "Taste Archive canvas connecting visual references and notes" }
    ]
  },
  {
    id: "morning-kickstart",
    title: "Morning Kickstart",
    types: ["Tool", "Automation"],
    date: "2026-08",
    status: "Private",
    description: "A private AI-assisted daily launchpad I designed around my real workflow. It turns Calendar, Reminders and live project context into ready-to-start actions, then records decisions back to the right systems.",
    href: "https://notes.mariedrouvin.com/i-made-it-easy-to-start-my-day",
    links: [],
    storyHeading: "Why I made this project",
    storyCopy: [
      "Starting is usually the hardest part of a task for me. Once I am in, I can keep going for what feels like forever. But opening the right file, reconstructing the context and deciding what to say in that first Codex prompt can turn two clicks into a surprisingly large obstacle.",
      "The idea came from seeing Alex Dobrenko describe his AI ‘chief of staff’: a system that presents what needs doing in a useful format and gives him a button to begin. My brain immediately went: of coooooourse.",
      "I did not need AI to choose my work for me. I needed it to gather the actions I had already decided on, find the context attached to them and prepare the first prompt so I could simply start."
    ],
    storyFlow: {
      label: "From the tools I already use to one ready-to-start page",
      steps: [
        "Calendar + Apple Reminders + Obsidian project properties",
        "Collects everything + prepares the prompts",
        "One page where everything is laid out + an easy Start button"
      ]
    },
    storyVideo: {
      videoId: "VX1fyYPvshI",
      title: "Morning Kickstart walkthrough",
      caption: "A one-minute English walkthrough showing how Morning Kickstart turns daily tasks into ready-to-start work."
    },
    narrativeSections: [
      {
        title: "How I built this",
        blocks: [
          {
            type: "paragraph",
            text: "I built Morning Kickstart on top of the tools I already use. Calendar holds my commitments, Apple Reminders holds the actions I have chosen, and the properties of my Obsidian project files hold the live project context. I did not have to move my work into a new productivity system."
          },
          {
            type: "paragraph",
            text: "Each morning, I ask Codex to kickstart the day. It collects what is already there, matches each action to the relevant project context and prepares an editable prompt. Then it lays everything out on one page, organised by project, with a Start button beside each action."
          },
          {
            type: "paragraph",
            text: "Start opens a new Codex conversation with the context and first instruction already in place. The system gives me a beginning without making the decision for me."
          }
        ]
      },
      {
        title: "Making it delightful",
        blocks: [
          {
            type: "colorComposition",
            images: [
              { src: "assets/projects/morning-kickstart/blue.png", alt: "Morning Kickstart in its blue theme" },
              { src: "assets/projects/morning-kickstart/pink.png", alt: "Morning Kickstart in its dusty pink theme" },
              { src: "assets/projects/morning-kickstart/green.png", alt: "Morning Kickstart in its green theme" }
            ],
            caption: "The same daily page in blue, dusty pink and green."
          },
          {
            type: "paragraph",
            text: "The page changes colour when I refresh it, and finishing a section triggers a small animation."
          },
          {
            type: "image",
            src: "assets/projects/morning-kickstart/completion-animation.gif",
            alt: "Morning Kickstart fading into a blue completion screen that says Atta girl before returning to the blue daily page",
            caption: "The small completion animation that appears when I finish a section."
          }
        ]
      },
      {
        title: "The genuinely useful part",
        blocks: [
          {
            type: "paragraph",
            text: "The genuinely useful part is the set of controls attached to each action."
          },
          {
            type: "list",
            items: [
              "Start opens the prepared prompt so I can begin immediately and add whatever else it needs.",
              "Done completes the original task in Apple Reminders when there is one, or updates the project context.",
              "Not today crosses the action off today’s list without closing it, so I can return to it tomorrow.",
              "Drop completes the original Apple Reminder, updates the project context so I can keep my mind off the thing I decided not to do, and records the decision."
            ]
          },
          {
            type: "image",
            src: "assets/projects/morning-kickstart/action-controls.png",
            alt: "A Morning Kickstart task with Start, Open context, Not today, Done and Drop controls",
            caption: "One active task with the complete set of controls."
          },
          {
            type: "paragraph",
            text: "Everything is also recorded in my Action Log. Starting, completing, deferring or dropping work feeds a running productivity and decision record."
          }
        ]
      },
      {
        title: "What it changed",
        blocks: [
          {
            type: "paragraph",
            text: "I have been using Morning Kickstart for two months now. I no longer begin the morning by reconstructing every project in my head. I am dead set on the actions that will move the needle first."
          },
          {
            type: "paragraph",
            text: "Because I am extremely productive in the morning, I have time in the afternoon to tinker with the projects I like, including personal projects that do not need to become anything yet."
          },
          {
            type: "paragraph",
            text: "The action, the context and the prepared prompt are all in the same place. It simply makes me much more efficient."
          }
        ]
      },
      {
        title: "How I think it will evolve",
        blocks: [
          {
            type: "paragraph",
            text: "Because this is a personal tool, it will evolve as I do. I do not know what it would look like if I took a permanent role in a company, or if I replaced one of the tools inside my workflow. It will change with me for sure."
          },
          {
            type: "paragraph",
            text: "For now, it is perfect as it is. I still tinker with small rules about where something belongs or what a phrase actually means."
          },
          {
            type: "paragraph",
            text: "I am French, so when I tell it I need to ‘do a machine’, it needs to understand that I mean laundry. lol"
          }
        ]
      }
    ],
    accent: "rose",
    media: { src: "assets/projects/morning-kickstart/blue.png", alt: "Morning Kickstart daily briefing in a blue theme", shape: "wide", position: "top" },
    gallery: [
      { src: "assets/projects/morning-kickstart/blue.png", alt: "Morning Kickstart daily briefing in a blue theme" },
      { src: "assets/projects/morning-kickstart/pink.png", alt: "Morning Kickstart daily briefing in a muted pink theme" },
      { src: "assets/projects/morning-kickstart/green.png", alt: "A completed Morning Kickstart briefing in a green theme" }
    ]
  },
  {
    id: "wishes-for-the-future",
    title: "Dear Future, Wish You Were Here",
    types: ["Website"],
    date: "2026-08",
    status: "Live",
    description: "A bilingual participatory web artwork I designed and built. People anonymously submit one ordinary scene from a future they want to inhabit, then read the public archive.",
    href: "https://wish.mariedrouvin.com/",
    linkLabel: "Leave a wish",
    links: [
      { label: "Leave a wish", href: "https://wish.mariedrouvin.com/" },
      { label: "Watch the trailer", href: "https://youtu.be/YlIPyuqMUdE" }
    ],
    storyHeading: "Why I made this project",
    storyCopy: [
      "The problem with wishes is that they're usually very broad. When you wish for the future, you wish for happiness and money and beauty and fun and all the big stuff. But I am convinced a better future only gets built in the specifics.",
      "Not happiness, but not ever having to put an alarm clock ever again.\nNot beauty, but putting on clothes that makes you feel radiant and sexy in the morning.\nNot love, but a familiar face you want to snuggle with at night.",
      "'Specifically' is the important word here. I wanted to make a place where you could imagine what the future you want would look like if it were already here.",
      "That's why I made the question : You wake up on an ordinary Saturday in the future. What do you wish to see?",
      "I have two goals with this website :\n1. Bring a little bit of hope and clarity to people who will answer the question (this is already happening to me)\n2. Create a collection of wishes we can get inspired by"
    ],
    narrativeSections: [
      {
        title: "How I built this",
        blocks: [
          {
            type: "paragraph",
            parts: [
              { text: "The website itself is terribly simple : ", emphasis: "strong" },
              { text: "you write your answer, send it and it gets added to the public archive." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "The visual part is where I had fun. I made an animated painting for the background and tested several paintings and tools before getting the result I wanted from Canva : " },
              { text: "subtle, no music, short", emphasis: "em" },
              { text: ", with a sweet landscape by Félix Vallotton." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "I also added one dynamic element to the question : ", emphasis: "strong" },
              { text: "the day of the week always matches the actual day of the week. If you visit on Monday, the question says Monday." }
            ]
          }
        ]
      },
      {
        title: "What comes next",
        blocks: [
          {
            type: "paragraph",
            parts: [
              { text: "The goal now is to collect 100 genuine public wishes. ", emphasis: "strong" },
              { text: "The public archive currently contains 20. The site itself is finished enough. The difficult part now is finding invitations that make people want to answer the question instead of only admiring the website." }
            ]
          },
          {
            type: "paragraph",
            text: "If the collection grows, I would like to see what else it could become: perhaps a zine, an illustrated selection or a public reading. For now, I mostly want more ordinary, specific futures to sit beside each other."
          }
        ]
      }
    ],
    accent: "olive",
    media: { src: "assets/projects/dear-future/hero-dark.webp", alt: "Wishes for the Future homepage", shape: "landscape" },
    gallery: [
      { src: "assets/projects/dear-future/hero-dark.webp", alt: "Wishes for the Future homepage in dark mode" },
      { type: "youtube", videoId: "YlIPyuqMUdE", alt: "Dear Future trailer" },
      { src: "assets/projects/dear-future/hero-light.webp", alt: "Wishes for the Future homepage in light mode" },
      { src: "assets/projects/dear-future/wishes-grid.webp", alt: "A grid of anonymous wishes submitted to Wishes for the Future" }
    ]
  },
  {
    id: "content-graph",
    title: "Content Graph",
    types: ["Publication"],
    date: "2026-07",
    status: "Live",
    description: "An interactive map I built to make years of writing and video explorable through recurring themes and the connections between them.",
    href: "https://www.mariedrouvin.com/contenu/",
    linkLabel: "Explore the content graph",
    accent: "teal",
    media: { src: "assets/projects/content-graph/main-cropped.png", alt: "Content Graph homepage showing Marie’s archive and its themes", shape: "wide" },
    gallery: [
      { src: "assets/projects/content-graph/main-cropped.png", alt: "Content Graph homepage showing Marie’s archive and its themes" },
      { src: "assets/projects/content-graph/overview.jpg", alt: "Content Graph overview showing Marie’s writing themes" },
      { src: "assets/projects/content-graph/theme-detail.png", alt: "Content Graph detail for the Making cool stuff online theme" }
    ]
  },
  {
    id: "marie-s-library",
    title: "Marie’s Library",
    types: ["Tool"],
    date: "2026-07",
    status: "Private",
    description: "A private, phone-friendly library I built for interactive courses, source-led research reports and small tools.",
    href: "#portfolio-title",
    linkLabel: "Open the private library",
    links: [],
    accent: "olive",
    media: { src: "assets/projects/maries-library/course-maker.jpg", alt: "Course Maker collection inside Marie’s Library", shape: "wide" },
    gallery: [
      { src: "assets/projects/maries-library/course-maker.jpg", alt: "Course Maker collection inside Marie’s Library" },
      { src: "assets/projects/maries-library/reports.png", alt: "Research reports inside Marie’s Library" },
      { src: "assets/projects/maries-library/report-detail.png", alt: "A publication report opened inside Marie’s Library" }
    ]
  },
  {
    id: "peopledex",
    title: "PeopleDex",
    types: ["Tool"],
    date: "2026-07",
    status: "Private",
    description: "A private research workflow I built to understand how the people I admire think, work and share what they make, without losing the sources behind the interpretation.",
    href: "#portfolio-title",
    linkLabel: "Open the private tool",
    links: [],
    storyHeading: "Why I made this project",
    storyCopy: [
      "When I discover a creator I really connect with, I tend to go deep into their archive. I read the new work, the very old work and everything in between. I think of these people as distant mentors: their ideas affect me emotionally, but I also want the way they think to change the way I work.",
      "I wanted to understand more than what they say. I wanted to see the ideas that keep returning, what they build, how they collect and develop ideas, which references shape them and how they decide to share something.",
      "PeopleDex came from the realisation that AI could help me do that systematically. I feed the skill substantial source material from someone who already matters to me, and it turns that material into a sourced profile I can explore in my private library."
    ],
    storyVideo: {
      videoId: "ydyVGtREan4",
      title: "PeopleDex walkthrough",
      caption: "A three-minute English walkthrough of Alex Dobrenko’s profile and the six sections inside PeopleDex."
    },
    narrativeSections: [
      {
        title: "What PeopleDex extracts",
        blocks: [
          {
            type: "paragraph",
            text: "Each profile is organised around six questions:"
          },
          {
            type: "list",
            items: [
              "Which ideas and principles keep returning?",
              "What have they made?",
              "How do they find, store, develop and publish ideas?",
              "Which people, traditions, tools and bits of culture influence them?",
              "How do they present and share their work?",
              "Which exact sources support each interpretation?"
            ]
          },
          {
            type: "paragraph",
            text: "The references are one of my favourite parts because they send me down useful rabbit holes. Visakan Veerasamy references superhero films. Alex Dobrenko references Windows 95 and coding environments. JA Westenberg’s references are more like tech minimalism: webcam, room, no B-roll."
          },
          {
            type: "image",
            src: "assets/projects/peopledex/references.png",
            alt: "The references section of an Erich Fromm PeopleDex profile, with traditions, teachers, practices and cultural objects linked to their sources",
            caption: "The references inside an Erich Fromm profile."
          }
        ]
      },
      {
        title: "How it works",
        blocks: [
          {
            type: "process",
            label: "From material I have saved to a private research profile",
            steps: [
              "Readwise highlights",
              "Full talks + substantial pieces",
              "The skill extracts and organises recurring patterns",
              "A sourced profile is published in Marie’s Library"
            ]
          },
          {
            type: "paragraph",
            text: "Readwise highlights are usually the starting point because I have already highlighted these people heavily before deciding to build a profile. I add a few complete pieces that had a real impact on me. A full presentation is ideal: it gives the skill enough context to understand what the person is working on now, instead of treating isolated excerpts as the whole picture."
          },
          {
            type: "paragraph",
            parts: [
              { text: "Every interpretation links back to Sources. ", emphasis: "strong" },
              { text: "The material is organised by idea and source type, so I can check what the AI surfaced instead of treating it as fact." }
            ]
          },
          {
            type: "image",
            src: "assets/projects/peopledex/sources.png",
            alt: "The searchable Sources section of an Erich Fromm PeopleDex profile, with filters and links back to the original Readwise material",
            caption: "The source browser makes every interpretation checkable."
          }
        ]
      },
      {
        title: "How I use it",
        blocks: [
          {
            type: "paragraph",
            text: "The most transformative part of PeopleDex is not the archive itself. It is that I have actually added some of my distant mentors’ reflexes to my own workflow."
          },
          {
            type: "paragraph",
            parts: [
              { text: "Zara Zhang opens videos by starting with the problem. ", emphasis: "strong" },
              { text: "I studied that from her, and now I feel much more confident making short videos about the little products I build. I know how to find the angle before I start explaining the thing." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "Another Zara principle has become integral to how I work: build first, then learn. ", emphasis: "strong" },
              { text: "I build something with AI, then ask the AI how it was built. I have learned far more about how things work on the internet by doing it in that order than by trying to learn everything before making anything." }
            ]
          },
          {
            type: "paragraph",
            parts: [
              { text: "Alex Dobrenko turns the talk into the thing. ", emphasis: "strong" },
              { text: "I have not had the right presentation to try this yet, but I cannot wait to create an environment that is itself the talk: the actual room the audience enters. That idea has completely changed what I want a presentation to be." }
            ]
          }
        ]
      },
      {
        title: "What comes next",
        blocks: [
          {
            type: "paragraph",
            text: "PeopleDex has not needed a major redesign since I made it. At this point, I add people rather than features."
          },
          {
            type: "paragraph",
            text: "There are six profiles now, starting in July. It is a deliberately slow, long-term archive because I only add someone when their work genuinely matters to me. I do not find a new person like that every week, and that is part of the point."
          }
        ]
      }
    ],
    accent: "rose",
    media: { src: "assets/projects/peopledex/overview.jpg", alt: "PeopleDex profile mapping Erich Fromm’s ideas and sources", shape: "wide" },
    gallery: [
      { src: "assets/projects/peopledex/overview.jpg", alt: "PeopleDex profile mapping Erich Fromm’s ideas and sources" },
      { src: "assets/projects/peopledex/references.png", alt: "References section of an Erich Fromm PeopleDex profile" },
      { src: "assets/projects/peopledex/sources.png", alt: "Source browser inside an Erich Fromm PeopleDex profile" }
    ]
  },
  {
    id: "personal-ai-workflows",
    title: "Personal AI workflows",
    types: ["Skill", "Automation"],
    typeLabel: "Private workflows",
    date: "2026-09",
    dateLabel: "2026",
    status: "Private",
    description: "A small set of AI-assisted workflows I built to move work through capture, planning, making, publishing and review.",
    href: "#portfolio-title",
    links: [],
    accent: "blue",
    cardOnly: true,
    gallery: [
      {
        src: "assets/projects/md-slides/main.webp",
        alt: "MD Slides presentation showing a lesson about working with local files and AI",
        label: "MD Slides"
      },
      {
        src: "assets/projects/personal-ai-workflows/youtube-thumbnails.webp",
        alt: "Six YouTube thumbnails produced with the YouTube Thumbnail workflow",
        label: "YouTube Thumbnail"
      }
    ],
    components: [
      {
        title: "Ready to Publish",
        detail: "Checks a finished Les Papiers draft, suggests internal links and prepares the files and URLs needed to publish it."
      },
      {
        title: "YouTube Description",
        detail: "Produces consistent French YouTube descriptions with a clear opening and the relevant links."
      },
      {
        title: "MD Slides",
        detail: "Turns teaching material into responsive HTML slides in the visual language of mariedrouvin.com."
      },
      {
        title: "YouTube Thumbnail",
        detail: "Applies my visual system to video artwork while keeping the centre clear for YouTube’s play button."
      },
      {
        title: "Monologue to Daily Note",
        detail: "Turns new Monologue notes into full transcripts, then adds a structured summary and exact link to the corresponding daily note."
      },
      {
        title: "Project Creation",
        detail: "Creates a durable project folder, action properties, context and journal from a single brief."
      },
      {
        title: "Website News Publisher",
        detail: "Turns a Markdown news item into validated data, then updates the homepage and news archive on mariedrouvin.com."
      },
      {
        title: "Notes Publisher",
        detail: "Prepares and checks an Obsidian draft, builds the public article and deploys it on notes.mariedrouvin.com."
      },
      {
        title: "End of Day",
        detail: "Combines completed reminders with daily-note evidence to record what actually happened."
      },
      {
        title: "Month Review",
        detail: "Synthesises notes, transcripts, calendars, sales, published work and reading history into a monthly review."
      }
    ]
  },
  {
    id: "ready-to-publish",
    title: "Ready to Publish",
    types: ["Skill"],
    date: "2026-05",
    status: "Private",
    description: "A private publication workflow that checks a finished Les Papiers draft, suggests internal links and prepares the files and URLs needed to publish it.",
    href: "#portfolio-title",
    links: [],
    accent: "orange",
    media: null
  },
  {
    id: "youtube-description",
    title: "YouTube Description",
    types: ["Skill"],
    date: "2026-02",
    status: "Private",
    description: "A private writing workflow for producing consistent French YouTube descriptions with a clear opening and relevant links.",
    href: "#portfolio-title",
    links: [],
    accent: "teal",
    media: null
  },
  {
    id: "md-slides",
    title: "MD Slides",
    types: ["Skill"],
    date: "2026-04",
    status: "Private",
    description: "A private presentation workflow I use to turn teaching material into responsive HTML slides in the visual language of mariedrouvin.com.",
    href: "#portfolio-title",
    links: [],
    accent: "rose",
    media: {
      src: "assets/projects/md-slides/main.webp",
      alt: "MD Slides presentation showing a lesson about working with local files and AI",
      shape: "wide"
    }
  },
  {
    id: "youtube-thumbnail",
    title: "YouTube Thumbnail",
    types: ["Skill"],
    date: "2026-07",
    status: "Private",
    description: "A private image-production workflow that applies my visual system while keeping the centre clear for YouTube’s play button.",
    href: "#portfolio-title",
    links: [],
    accent: "paper",
    media: null
  },
  {
    id: "monologue-to-daily-note",
    title: "Monologue to Daily Note",
    types: ["Automation"],
    date: "2026-04",
    status: "Private",
    description: "A local automation I built to turn new Monologue notes into full transcript files, then add a structured summary and exact link to the corresponding daily note.",
    href: "#portfolio-title",
    links: [],
    accent: "olive",
    media: null
  },
  {
    id: "project-creation",
    title: "Project Creation",
    types: ["Skill"],
    date: "2026-06",
    status: "Private",
    description: "A private vault workflow that creates a durable project folder, action properties, context and journal from a single brief.",
    href: "#portfolio-title",
    links: [],
    accent: "red",
    media: null
  },
  {
    id: "md-notifications",
    title: "Website News Publisher",
    types: ["Skill"],
    date: "2026-07",
    status: "Private",
    description: "A private publishing workflow that turns a Markdown news item into validated data and updates the homepage and news archive on mariedrouvin.com.",
    href: "#portfolio-title",
    links: [],
    accent: "orange",
    media: null
  },
  {
    id: "add-to-notes-md",
    title: "Notes Publisher",
    types: ["Skill"],
    date: "2026-06",
    status: "Private",
    description: "A private publishing workflow that prepares and checks an Obsidian draft, builds the public article and deploys it to notes.mariedrouvin.com.",
    href: "#portfolio-title",
    links: [],
    accent: "teal",
    media: null
  },
  {
    id: "end-of-day",
    title: "End of Day",
    types: ["Automation"],
    date: "2026-04",
    status: "Private",
    description: "A local end-of-day automation that combines completed reminders with daily-note evidence and writes a concise record of what actually happened.",
    href: "#portfolio-title",
    links: [],
    accent: "rose",
    media: null
  },
  {
    id: "month-review",
    title: "Month Review",
    types: ["Skill"],
    date: "2026-04",
    status: "Private",
    description: "A private monthly review workflow that synthesises notes, transcripts, calendars, sales, published work and reading history.",
    href: "#portfolio-title",
    links: [],
    accent: "paper",
    media: null
  },
  {
    id: "tweet-inbox",
    title: "Tweet Inbox",
    types: ["Tool"],
    date: "2026-07",
    status: "Private",
    description: "A private, offline-first web app I built to capture possible social posts without opening a feed.",
    href: "#portfolio-title",
    links: [],
    accent: "teal",
    media: null
  },
  {
    id: "substack-feed-blocker",
    title: "Substack Feed Blocker",
    types: ["Tool"],
    date: "2026-06",
    status: "Published",
    description: "A tiny browser extension that hides Substack’s feed while keeping publications, writing tools and the rest of the platform accessible.",
    href: "https://www.mariedrouvin.com/substack-feed-blocker/",
    linkLabel: "See the extension",
    links: [
      { label: "See the extension", href: "https://www.mariedrouvin.com/substack-feed-blocker/" },
      { label: "Watch how I fixed Substack (in French)", href: "https://youtu.be/Xd_QZlQlmYQ" }
    ],
    accent: "orange",
    media: { src: "assets/projects/substack-feed-blocker/blocked-feed.png", alt: "Substack home feed replaced with safe links by the Substack Feed Blocker", shape: "wide" },
    gallery: [
      { src: "assets/projects/substack-feed-blocker/blocked-feed.png", alt: "Substack home feed replaced with safe links by the Substack Feed Blocker" },
      { type: "youtube", videoId: "Xd_QZlQlmYQ", alt: "Substack Feed Blocker video (in French)" },
      { src: "assets/projects/substack-feed-blocker/full-substack.jpg", alt: "Full Substack interface with the feed blocker active" }
    ]
  },
  {
    id: "ferme-de-la-terriere",
    title: "Ferme de la Terrière",
    types: ["Website"],
    date: "2026-05",
    status: "Live",
    description: "A fast bilingual website I designed and built for a rural holiday home in the Somme, with separate static pages in French and English, local SEO and an Airbnb booking path.",
    href: "https://www.fermedelaterriere.com/",
    linkLabel: "Visit the website",
    accent: "teal",
    media: { src: "assets/ferme-de-la-terriere.jpg", alt: "Homepage of Ferme de la Terrière", shape: "wide" },
    gallery: [
      { src: "assets/ferme-de-la-terriere.jpg", alt: "Homepage of Ferme de la Terrière" },
      { src: "assets/ferme-de-la-terriere-gallery.jpg", alt: "Ferme de la Terrière website gallery showing the gîte and its rooms" }
    ]
  },
  {
    id: "notes-mariedrouvin-com",
    title: "notes.mariedrouvin.com",
    types: ["Website", "Publication"],
    date: "2026-06",
    status: "Live",
    description: "My hand-built English-language publishing site for essays, learning notes, paintings and unfinished thoughts, with its own RSS feed.",
    href: "https://notes.mariedrouvin.com/",
    linkLabel: "Visit notes.mariedrouvin.com",
    links: [
      { label: "Visit notes.mariedrouvin.com", href: "https://notes.mariedrouvin.com/" },
      { label: "Read ‘Why this blog’", href: "https://notes.mariedrouvin.com/why-this-blog" }
    ],
    accent: "rose",
    media: { src: "assets/projects/notes-mariedrouvin-com/home-dark.webp", alt: "Homepage of notes.mariedrouvin.com", shape: "wide" },
    gallery: [
      { src: "assets/projects/notes-mariedrouvin-com/home-dark.webp", alt: "Homepage of notes.mariedrouvin.com in dark mode" },
      { src: "assets/projects/notes-mariedrouvin-com/home-light.webp", alt: "Homepage of notes.mariedrouvin.com in light mode" },
      { src: "assets/projects/notes-mariedrouvin-com/article.webp", alt: "An essay page on notes.mariedrouvin.com" },
      { src: "assets/projects/notes-mariedrouvin-com/hire-me.webp", alt: "The creative work gallery on notes.mariedrouvin.com" },
      { src: "assets/projects/notes-mariedrouvin-com/post-footer.webp", alt: "Reader response links at the end of a post" }
    ]
  },
  {
    id: "mariedrouvin-com",
    title: "mariedrouvin.com",
    types: ["Website"],
    date: "2026-06",
    status: "Live",
    description: "My hand-built French website for services, products and writing, migrated from a large platform to portable HTML with SEO, payments, forms and email delivery.",
    href: "https://www.mariedrouvin.com/",
    linkLabel: "Visit mariedrouvin.com",
    links: [
      { label: "Visit mariedrouvin.com", href: "https://www.mariedrouvin.com/" },
      { label: "Watch how I rebuilt it (in French)", href: "https://youtu.be/QTAenYLmZ_I" }
    ],
    accent: "red",
    media: { src: "assets/projects/mariedrouvin-com/home-dark.webp", alt: "Homepage of mariedrouvin.com", shape: "wide" },
    gallery: [
      { src: "assets/projects/mariedrouvin-com/home-dark.webp", alt: "Dark-mode homepage of mariedrouvin.com" },
      { type: "youtube", videoId: "QTAenYLmZ_I", alt: "mariedrouvin.com rebuild video (in French)" },
      { src: "assets/projects/mariedrouvin-com/home-light.webp", alt: "Light-mode homepage of mariedrouvin.com" },
      { src: "assets/projects/mariedrouvin-com/gallery.webp", alt: "Gallery page on mariedrouvin.com" },
      { src: "assets/projects/mariedrouvin-com/consultation.webp", alt: "Consultation page on mariedrouvin.com" }
    ]
  },
  {
    id: "organons",
    title: "Organons",
    types: ["Book"],
    date: "2026-04",
    status: "Published",
    description: "A visual book I wrote and designed around four historical thinking instruments for creative practice: lexicons, maps, manifestos and utopias.",
    href: "https://www.mariedrouvin.com/organons",
    linkLabel: "See Organons",
    accent: "orange",
    media: { src: "assets/projects/organons/book-in-hand.webp", alt: "The Organons book held in front of a bookshelf", shape: "wide" },
    gallery: [
      { src: "assets/projects/organons/book-in-hand.webp", alt: "The Organons book held in front of a bookshelf" },
      { src: "assets/projects/organons/interior.webp", alt: "An open spread inside the Organons book" }
    ]
  },
  {
    id: "les-papiers",
    title: "Les Papiers",
    types: ["Publication"],
    date: "2023-04",
    status: "Live",
    description: "A French-language online magazine about creativity, AI, personal websites and the people making the internet feel alive again, which I publish on Substack.",
    href: "https://mdrouvin.substack.com/",
    linkLabel: "Read Les Papiers",
    accent: "red",
    media: { src: "assets/projects/les-papiers/homepage.jpg", alt: "Les Papiers homepage on Substack", shape: "wide" },
    gallery: [
      { src: "assets/projects/les-papiers/homepage.jpg", alt: "Les Papiers homepage on Substack" },
      { src: "assets/projects/les-papiers/popular-posts.png", alt: "Popular posts in Les Papiers" }
    ]
  },
  {
    id: "how-to-live-in-peace-with-your-creative-ambition",
    title: "How to live in peace with your creative ambition",
    types: ["Book"],
    date: "2026-05",
    status: "Published",
    description: "A bilingual collection of essays on creative ambition, passion and staying in the work without turning a creative life into a performance contest, which I edited and published.",
    href: "https://circecreates.gumroad.com/l/ebook-creative-ambition",
    linkLabel: "Get the ebook",
    accent: "olive",
    media: { src: "assets/projects/creative-ambition/book-mockup.webp", alt: "How to live in peace with your creative ambition book mockup", shape: "wide" },
    gallery: [
      { src: "assets/projects/creative-ambition/book-mockup.webp", alt: "How to live in peace with your creative ambition book mockup" }
    ]
  },
  {
    id: "portfolio",
    title: "Portfolio",
    types: ["Website"],
    date: "2026-08",
    status: "Live",
    description: "The bilingual website I designed and built to make my websites, tools, skills, automations, publications and internet experiments easy to explore.",
    href: "#portfolio-title",
    accent: "paper",
    media: { src: "assets/projects/portfolio/by-year.png", alt: "Portfolio index showing Marie Drouvin’s projects by year", shape: "wide" }
  }
];

const localizeType = (type) => localeBundle.types?.[type] || type;
const localizeStatus = (status) => localeBundle.statuses?.[status] || status;
function siteAssetUrl(source) {
  if (!source || typeof source !== "string") return source;
  if (source.startsWith("http://") || source.startsWith("https://") || source.startsWith("data:")) return source;
  const clean = source.replace(/^(\.\.\/|\.\/|\/)+/, "");
  const isFrench = document.documentElement.lang.startsWith("fr") || window.location.pathname.includes("/fr");
  const prefix = isFrench ? "../" : "./";
  return clean.startsWith("assets/") ? `${prefix}${clean}` : `${prefix}assets/${clean}`;
}
window.siteAssetUrl = siteAssetUrl;
const dateFormatter = new Intl.DateTimeFormat(portfolioLocale === "fr" ? "fr-FR" : "en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});
const formatProjectDate = (date) => dateFormatter.format(new Date(`${date}-01T00:00:00Z`));

const curatedCardOrder = [
  "open-yale-course-notebooks",
  "round-music-widget",
  "wishes-for-the-future",
  "taste-archive",
  "morning-kickstart",
  "peopledex",
  "les-papiers",
  "organons",
  "personal-ai-workflows"
];

portfolioProjects.forEach((project) => {
  const translation = localeBundle.projects?.[project.id] || {};
  if (translation.title) project.title = translation.title;
  if (translation.description) project.description = translation.description;
  if (translation.typeLabel) project.typeLabel = translation.typeLabel;
  if (translation.dateLabel) project.dateLabel = translation.dateLabel;
  if (translation.components) project.components = translation.components;
  if (translation.story) project.story = translation.story;
  if (translation.storyCopy) project.storyCopy = translation.storyCopy;
  if (translation.storyDiagram) project.storyDiagram = translation.storyDiagram;
  if (translation.storyFlow) project.storyFlow = translation.storyFlow;
  if (translation.storyVideo) project.storyVideo = translation.storyVideo;
  if (translation.storyHeading) project.storyHeading = translation.storyHeading;
  if (translation.narrativeSections) project.narrativeSections = translation.narrativeSections;
  if (translation.linkLabel) project.linkLabel = translation.linkLabel;
  if (translation.links) project.links = translation.links;

  if (project.media?.src) {
    project.media = {
      ...project.media,
      src: siteAssetUrl(project.media.src),
      alt: translation.mediaAlt || project.media.alt
    };
  }

  if (project.gallery) {
    project.gallery = project.gallery.map((image, index) => ({
      ...image,
      src: siteAssetUrl(image.src),
      alt: translation.galleryAlts?.[index] || image.alt
    }));
  }

  if (project.links && translation.linkLabels) {
    project.links = project.links.map((link, index) => ({
      ...link,
      label: translation.linkLabels[index] || link.label
    }));
  }
});

const graphicMedia = {
  graph: '<div class="graphic-graph" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><i></i><i></i><i></i><b>Years of ideas,<br>connected.</b></div>',
  course: '<div class="graphic-course" aria-hidden="true"><span>Source</span><i>syllabus + transcripts</i><span>Structure</span><i>principles + practice</i><span>Course</span><i>interactive HTML</i></div>'
};


const caseStudyIds = ["open-yale-course-notebooks", "taste-archive", "round-music-widget"];
const projectHref = (project) => project.href.startsWith("http") ? project.href : "#projects";
const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function projectMediaMarkup(project) {
  const { media } = project;
  if (!media) return "";
  if (media.src) {
    return `<div class="project-media project-media--${media.shape}${media.contain ? " project-media--contain" : ""}${media.position === "top" ? " project-media--top" : ""}"><img src="${escapeHtml(siteAssetUrl(media.src))}" alt="${escapeHtml(media.alt)}" loading="lazy" decoding="async"></div>`;
  }
  if (media.graphic === "workflows") {
    return `<div class="project-media project-media--${media.shape} project-media--graphic project-graphic--workflows"><ol class="graphic-workflows" aria-hidden="true">${project.components.map((component) => `<li>${component.title}</li>`).join("")}</ol></div>`;
  }
  return `<div class="project-media project-media--${media.shape} project-media--graphic project-graphic--${media.graphic}">${graphicMedia[media.graphic]}</div>`;
}

function cardMarkup(project) {
  const classes = ["project", `project--${project.accent}`];
  if (project.feature) classes.push("project--feature");
  if (!project.media) classes.push("project--text-only");
  return `
    <article class="${classes.join(" ")}" data-accent="${project.accent}" data-category="${project.types.join(" ").toLowerCase()}" data-year="${project.date.slice(0, 4)}" data-date="${project.date}">
      <a class="project-card" data-project-id="${project.id}" href="${escapeHtml(projectHref(project))}"${projectHref(project).startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
        ${projectMediaMarkup(project)}
        <div class="project-copy">
          <p class="project-kicker">${escapeHtml(project.typeLabel || project.types.map(localizeType).join(" + "))} · ${escapeHtml(project.dateLabel || formatProjectDate(project.date))}</p>
          <h2>${escapeHtml(project.title)}</h2>
          <p>${escapeHtml(project.description)}</p>
          <ul class="project-tags" aria-label="${escapeHtml(localeUi.projectTypes || "Project types")}">${project.types.map((type) => `<li>${escapeHtml(localizeType(type))}</li>`).join("")}</ul>
          <span class="project-arrow" aria-hidden="true">+</span>
        </div>
      </a>
    </article>`;
}

function indexEntryMarkup(project) {
  return `
    <li>
      <a class="chronology-entry" data-project-id="${project.id}" href="${escapeHtml(projectHref(project))}"${projectHref(project).startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
        <span class="chronology-name">${escapeHtml(project.title)}</span>
        <span class="chronology-type">${escapeHtml(project.description)}</span>
        <span class="chronology-status">${escapeHtml(localizeStatus(project.status))}</span>
      </a>
    </li>`;
}

function chronologyGroupMarkup(label, projects) {
  return `<div class="chronology-group"><h3>${escapeHtml(label)}</h3><ol class="chronology-list">${projects.map(indexEntryMarkup).join("")}</ol></div>`;
}


function portfolioViewMarkup() {
  const archive = portfolioProjects.filter((project) => !project.cardOnly);
  const dates = [...new Set(archive.map((project) => project.date))].sort((a, b) => b.localeCompare(a));
  const types = ["Website", "Tool", "Skill", "Automation", "Book", "Publication"];
  const typeLabels = { Website: "Websites", Tool: "Tools", Skill: "Skills", Automation: "Automations", Book: "Books", Publication: "Publications" };
  return {
    cards: curatedCardOrder.map((id) => portfolioProjects.find((project) => project.id === id)).filter(Boolean).map(cardMarkup).join(""),
    chronology: dates.map((date) => chronologyGroupMarkup(formatProjectDate(date), archive.filter((project) => project.date === date))).join(""),
    types: types.map((type) => chronologyGroupMarkup(localeBundle.typeHeadings?.[type] || typeLabels[type], archive.filter((project) => project.types.includes(type)))).join("")
  };
}
