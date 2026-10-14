window.portfolioTranslations = {
  fr: {
    ui: {
      project: "Projet",
      projectImage: "image du projet",
      projectTypes: "Types de projet",
      openProject: "Ouvrir le projet",
      componentsHeading: "Les workflows",
      storyHeading: "Derrière le projet"
    },
    types: {
      Website: "Site web",
      Tool: "Outil",
      Skill: "Skill",
      Automation: "Automatisation",
      Book: "Livre",
      Publication: "Publication"
    },
    typeHeadings: {
      Website: "Sites web",
      Tool: "Outils",
      Skill: "Skills",
      Automation: "Automatisations",
      Book: "Livres",
      Publication: "Publications"
    },
    statuses: {
      Private: "Privé",
      Live: "En ligne",
      Published: "Publié",
      "Open source": "Open source"
    },
    projects: {
      "round-music-widget": {
        description: "Un compagnon macOS natif que j’ai conçu pour garder sur le bureau la pochette du morceau en cours dans Apple Music, sous la forme d’une bulle de verre déplaçable avec les commandes de lecture.",
        links: [
          { label: "Voir le projet sur GitHub", href: "https://github.com/maried-boop/round-music-widget" }
        ],
        mediaAlt: "Round Music Widget affichant la pochette Solitude de Billie Holiday dans un lecteur circulaire en verre",
        galleryAlts: [
          "Round Music Widget affichant la pochette Solitude de Billie Holiday dans un lecteur circulaire en verre",
          "Round Music Widget affichant une pochette en noir et blanc dans un lecteur circulaire en verre",
          "Round Music Widget affichant une sculpture monochrome",
          "Round Music Widget dans un format compact"
        ],
        storyHeading: "Pourquoi j’ai créé ce projet",
        storyCopy: [
          "Je trouve étonnant que macOS n’ait pas de widget Apple Music. J’aime beaucoup les widgets musicaux, surtout parce que j’aime voir la pochette de l’album que je suis en train d’écouter.",
          "Il existe des apps à télécharger, mais je savais exactement ce que je voulais. Je voulais une sorte de bulle avec un effet sur le pourtour. Je voulais que ce soit joli et que ça s’accorde avec ce que j’écoutais.",
          "J’ai donc créé Round Music Widget, qui fait exactement ce que son nom laisse entendre."
        ],
        narrativeSections: [
          {
            title: "Comment je l’ai construit",
            blocks: [
              {
                type: "paragraph",
                parts: [
                  { text: "Le widget se synchronise avec Apple Music. ", emphasis: "strong" },
                  { text: "Chaque fois que j’ouvre Music, il s’ouvre aussi et affiche la pochette du morceau ou de l’album que j’écoute, avec les commandes de base pour lancer la lecture, passer au morceau suivant ou revenir au précédent." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Le plus intéressant, c’est le design. ", emphasis: "strong" },
                  { text: "Je voulais une bulle, pas simplement un cadre circulaire avec la pochette à l’intérieur. J’ai donc ajouté sur le pourtour un effet qui prolonge et déforme légèrement l’image, comme si tu regardais la pochette à travers " },
                  { text: "un dôme grossissant ou une de ces lentilles un peu étranges", emphasis: "em" },
                  { text: ". Quand tu survoles le widget, le titre du morceau et le nom de l’artiste apparaissent le long du cadre." }
                ]
              },
              {
                type: "paragraph",
                text: "Quand je ferme Apple Music, le widget se ferme aussi. Je peux le déplacer n’importe où sur le bureau et choisir entre quatre tailles, du format compact au format extra large, selon ce que je suis en train de faire."
              }
            ]
          },
          {
            title: "Ce qui vient ensuite",
            blocks: [
              {
                type: "paragraph",
                text: "Une chose qui ne rend pas bien, c’est une pochette d’album très chargée en texte. J’ai plusieurs solutions en tête, que j’ajouterai peut-être au fur et à mesure que j’utiliserai le widget."
              },
              {
                type: "list",
                ordered: true,
                items: [
                  "Afficher la pochette de la playlist plutôt que celle de l’album. Le problème se présente surtout quand j’écoute de la musique classique, et j’en écoute généralement depuis une playlist.",
                  "Détecter et n’afficher que la partie de la pochette qui ne contient pas de texte. Cela demanderait probablement d’utiliser l’IA ou une forme d’automatisation. Je ne suis pas sûre que cela en vaille la peine. Ce serait peut-être trop lourd pour le périmètre de l’outil.",
                  "Pouvoir remplacer une pochette trop chargée en texte par une photo aléatoire ou une photo choisie à l’avance.",
                  "Ne rien faire et accepter que ce soit comme ça."
                ]
              },
              {
                type: "image",
                src: "assets/projects/round-music-widget/text-heavy-album.webp",
                alt: "Round Music Widget affichant une pochette très chargée en texte de Camille Saint-Saëns, avec les informations du morceau et les commandes superposées",
                caption: "Un exemple de pochette très chargée en texte qui ne rend pas tout à fait bien dans le widget."
              }
            ]
          }
        ]
      },
      "open-yale-course-notebooks": {
        description: "Un site gratuit que j’ai conçu autour de quatre séries de cours en libre accès de Yale, accompagné d’un skill Codex public et open source qui transforme des sources de cours vérifiées en notebooks au même format.",
        links: [
          { label: "Explorer les notebooks", href: "https://notebooks.mariedrouvin.com/" },
          { label: "Voir le skill Course Notebook", href: "https://github.com/maried-boop/course-notebook" }
        ],
        storyHeading: "Pourquoi j’ai créé ce projet",
        mediaAlt: "Page d’accueil d’Open Yale Course Notebooks avec trois couvertures de cours illustrées",
        galleryAlts: [
          "Page d’accueil d’Open Yale Course Notebooks avec trois couvertures de cours illustrées",
          "Notebook The Early Middle Ages ouvert sur son premier cours",
          "Notebook Introduction to Psychology montrant une note illustrée sur Phineas Gage"
        ],
        storyCopy: [
          "Quand j’avais 20 ans, je me suis inscrite à l’université à Dublin, en Irlande.",
          "Je suis française et, à l’époque, mon anglais n’était pas très bon. Alors, comme j’étais visiblement un génie, je me suis inscrite à un cours d’histoire irlandaise. Petit détail : je ne connaissais absolument rien à l’histoire irlandaise. Je n’avais aucun contexte culturel ou historique sur lequel m’appuyer : tous mes repères étaient français. Évidemment, au bout de quelques cours, j’étais complètement dépassée.",
          "Comme j’avais accès aux slides à l’avance, j’ai commencé à préparer des documents avant chaque cours. Je m’en servais pour reconstituer le contexte qui me manquait et comprendre de quoi le cours allait parler. Ils m’ont aidée à suivre le cours (et à le valider !!!!), même quand mon anglais était encore bancal.",
          "Happy end.",
          "Je ne suis plus à l’université, mais j’aime toujours apprendre.",
          "Et le merveilleux monde d’internet regorge de cours complets et gratuits proposés par certaines des meilleures universités du monde. Aujourd’hui, mon anglais est bien meilleur. Ma concentration, beaucoup moins.",
          "J’ai donc repris la même méthode, avec l’aide de l’IA, et commencé à créer des notebooks pour accompagner certains des cours de Yale que je suivais. Je les ai rassemblés sur un site gratuit.",
          { text: "https://notebooks.mariedrouvin.com/", href: "https://notebooks.mariedrouvin.com/" },
          "Chaque notebook est conçu pour m’aider (et désormais toi aussi) à comprendre le contexte avant de regarder un cours, puis à retenir ce que tu viens de voir. Il ne remplace PAS le cours. Il est là pour t’accompagner dans ces cours formidables, tous disponibles gratuitement en ligne.",
          "Les notebooks ont été créés avec l’IA. J’ai transformé le processus en un skill Course Notebook pour que tu puisses l’utiliser pour créer les tiens. Il a été testé sur les Open Yale Courses, mais il ne s’y limite pas. Tu devras peut-être le reprendre un peu, lui demander d’améliorer certaines choses et t’approprier le résultat.",
          "J’espère que les notebooks te plairont. Si tu veux voir ce que j’ai fabriqué d’autre pendant ma phase actuelle de vibe coding, tu peux le retrouver dans mon portfolio.",
          { text: "Skill Course Notebook sur GitHub", href: "https://github.com/maried-boop/course-notebook" }
        ],
        narrativeSections: [
          {
            title: "Comment je l’ai construit",
            blocks: [
              {
                type: "process",
                label: "Comment un Course Notebook est créé",
                steps: [
                  "Titre du cours de Yale",
                  "L’IA vérifie la page Yale, la playlist et les transcriptions",
                  "Le skill crée le contenu et applique le design",
                  "Course notebook"
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Le premier défi a été de trouver du contenu assez complet pour être intéressant. ", emphasis: "strong" },
                  { text: "J’ai d’abord essayé avec MIT OpenCourseWare, mais beaucoup de cours étaient incomplets. J’avais commencé par créer le skill Course Maker, mais il essayait de fabriquer des cours à partir de contenus qui n’avaient tout simplement pas assez de matière. C’est comme ça que je suis arrivée aux séries Open Yale Courses." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Le deuxième défi a été de trouver le bon niveau de détail. ", emphasis: "strong" },
                  { text: "Les notebooks devaient faire ressortir assez d’informations pour me donner une vue d’ensemble du cours et de ses grands principes, et éventuellement faire la même chose pour les autres personnes qui le suivraient. Mais ils ne pouvaient pas simplement répéter les vidéos ou remplacer les cours." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "La structure à faire ressortir change aussi selon le sujet. La chronologie est essentielle pour " },
                  { text: "The Early Middle Ages", emphasis: "em" },
                  { text: ", mais beaucoup moins importante pour la psychologie. Au début, j’ai demandé au skill d’extraire les principes fondamentaux. Cela ne fonctionnait pas vraiment pour l’histoire et noyait beaucoup de détails intéressants en psychologie." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "J’ai fini par comprendre que " },
                  { text: "le professeur avait déjà fait ce travail pour moi", emphasis: "strong" },
                  { text: ". Il me suffisait de suivre la structure des cours et d’en extraire les thèmes et sous-thèmes. C’est devenu la structure des notebooks." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "J’avais une idée beaucoup plus claire du design, parce que je jouais déjà avec mon propre site et que je réfléchissais à recréer certains de mes cours sur ma propre plateforme. Je voulais que les notebooks soient " },
                  { text: "beaux à regarder, faciles à lire et agréables à consulter sur un iPad ou sur n’importe quelle tablette", emphasis: "em" },
                  { text: "." }
                ]
              }
            ]
          },
          {
            title: "Ce qui vient ensuite",
            blocks: [
              {
                type: "paragraph",
                text: "L’objectif est d’ajouter davantage de cours. Je l’avoue, pour l’instant, cela reste un projet personnel, donc je choisis surtout en fonction de mes propres centres d’intérêt."
              },
              {
                type: "paragraph",
                text: "Je veux aussi continuer à tester le skill Course Notebook sur d’autres plateformes et d’autres types de contenus. Je pense que la méthode peut s’appliquer à bien d’autres choses que Yale."
              }
            ]
          }
        ]
      },
      "taste-archive": {
        description: "Une archive visuelle privée que j’ai construite pour rassembler mes références, réfléchir avec elles sur un canvas et les appeler par code ou par collection dans mon travail avec l’IA.",
        links: [],
        storyHeading: "Pourquoi j’ai créé ce projet",
        storyCopy: [
          "Au départ, je voulais une app dans laquelle je pourrais réfléchir visuellement avec tout ce que je sauvegarde : mes propres notes, mes highlights Readwise, mes épingles Pinterest, mes favoris Twitter, mes notes Substack et mes images. Je voulais pouvoir chercher dans toutes ces collections et rassembler les éléments sur un canvas.",
          "Il existait déjà des outils avec un canvas, mais aucun ne me convenait vraiment. Freeform n’était pas directement relié à mes collections. Obsidian était assez pénible à utiliser, ne me plaisait pas visuellement et aurait demandé de créer un fichier pour chaque highlight Readwise. Sublime avait bien un canvas, mais j’avais l’impression de construire sur un terrain emprunté. Cela reste un réseau social, et je n’avais pas envie d’ajouter encore plus de réseaux sociaux dans ma vie.",
          "J’ai donc construit ma propre alternative. Mais ce que Taste Archive est devenu s’est révélé encore plus utile que mon idée de départ : une archive que je peux directement référencer dans mon travail avec l’IA.",
          "Quand je veux construire quelque chose, générer une image ou exprimer l’ambiance visuelle d’un design, je peux donner à Codex le code d’une référence ou lui indiquer une collection entière. Je n’ai plus besoin de copier-coller constamment les mêmes images dans mes conversations avec l’IA. C’est devenu mon principal usage de Taste Archive."
        ],
        storyDiagram: {
          label: "Taste Archive relie une collection centrale à trois usages",
          eyebrow: "Collection centrale",
          title: "Taste Archive",
          branches: [
            { title: "Archive", text: "Références + sources" },
            { title: "IA", text: "Codex accède à l’archive" },
            { title: "Canvas", text: "Réfléchir avec mes références" }
          ]
        },
        storyVideo: {
          videoId: "atpzkUr9OEY",
          title: "Présentation vidéo de Taste Archive",
          caption: "Une présentation complète du fonctionnement de Taste Archive."
        },
        narrativeSections: [
          {
            title: "Comment je l’ai construit",
            blocks: [
              {
                type: "paragraph",
                text: "J’ai commencé par la première moitié de la solution : un endroit où sauvegarder des images et des citations, les organiser en collections et conserver leurs sources. En gros, une base de données en ligne reliée à une extension de navigateur."
              },
              {
                type: "image",
                src: "assets/projects/taste-archive/saving-from-browser.gif",
                alt: "Une œuvre ouverte sur Wikipédia puis sauvegardée dans Taste Archive avec l’extension de navigateur",
                caption: "Sauvegarder une référence visuelle directement depuis le navigateur."
              },
              {
                type: "paragraph",
                text: "Au fil des premières semaines, j’ai commencé à ajouter des fonctions stupidement personnelles :"
              },
              {
                type: "list",
                items: [
                  "Détecter quand je sauvegardais l’un de mes propres tweets ou une note Substack et le classer automatiquement dans la bonne collection.",
                  "Afficher les entrées uniquement textuelles sur des fonds colorés avec ma propre palette.",
                  "Filtrer l’archive pour afficher le texte, les images ou les deux."
                ]
              },
              {
                type: "imageGrid",
                images: [
                  {
                    src: "assets/projects/taste-archive/mostly-red.webp",
                    alt: "Résultats de recherche Taste Archive dominés par des références visuelles rouges",
                    caption: "Chercher des références majoritairement rouges dans l’archive visuelle."
                  },
                  {
                    src: "assets/projects/taste-archive/mostly-blue.webp",
                    alt: "Résultats de recherche Taste Archive dominés par des références visuelles bleues",
                    caption: "La même archive avec une recherche de références majoritairement bleues."
                  }
                ]
              },
              {
                type: "paragraph",
                text: "Une fois cette partie suffisamment fonctionnelle, j’ai construit la seconde : un endroit où chercher dans l’archive et déposer les éléments sur un canvas infini. Cela me permet de réfléchir plus visuellement, avec plusieurs canvas enregistrés, des notes supplémentaires, une recherche par collection et les mêmes filtres texte ou image que dans l’archive."
              },
              {
                type: "image",
                src: "assets/projects/taste-archive/canvas.webp",
                alt: "Canvas Taste Archive reliant des références visuelles, des highlights Readwise et des notes",
                caption: "Le canvas, où les références et les notes sauvegardées peuvent former un cheminement visuel."
              },
              {
                type: "paragraph",
                parts: [
                  { text: "La partie qui me semblait compliquée, c’était Readwise. ", emphasis: "strong" },
                  { text: "C’est un service externe et ma collection dépasse les 10 000 highlights. Je m’imaginais déjà exporter constamment des fichiers CSV. À la place, Codex a créé une collection Readwise automatisée et séparée, qui se synchronise avec un simple bouton." }
                ]
              },
              {
                type: "image",
                src: "assets/projects/taste-archive/readwise-only.webp",
                alt: "Taste Archive filtré pour afficher uniquement les cartes textuelles colorées importées depuis Readwise",
                caption: "La collection Readwise séparée, avec les highlights transformés en cartes consultables."
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Une des idées venues ensuite est devenue mon principal usage. ", emphasis: "strong" },
                  { text: "Taste Archive possède une version locale synchronisée sur mon ordinateur. Chaque référence a son propre code, et je peux aussi indiquer à Codex une collection complète. Je peux lui dire « regarde cette référence » ou « regarde cette collection » quand je construis quelque chose, que je génère des images ou que j’essaie d’exprimer la direction visuelle d’un design." }
                ]
              },
              {
                type: "image",
                src: "assets/projects/taste-archive/ai-reference-numbers.gif",
                alt: "Taste Archive attribuant des numéros visibles aux références sélectionnées pour les utiliser avec Codex",
                caption: "Sélectionner des références numérotées que je peux appeler par leur code depuis Codex."
              },
              {
                type: "paragraph",
                text: "L’app web reste synchronisée entre mes appareils, tandis que la copie locale donne à Codex accès au même système de références. Cela m’évite de copier-coller sans arrêt des images dans mes conversations avec l’IA."
              }
            ]
          },
          {
            title: "Ce qui vient ensuite",
            blocks: [
              {
                type: "paragraph",
                text: "Je suis maintenant dans la phase où je l’utilise intensivement et où j’essaie de ne pas ajouter chaque petite fonction qui me passe par la tête. Je note ces idées, puis j’attends de voir lesquelles me manquent vraiment et lesquelles n’étaient que des envies du moment."
              },
              {
                type: "paragraph",
                text: "Pour l’instant, la feuille de route consiste moins à ajouter des fonctions qu’à rendre Taste Archive de plus en plus stable, à voir comment il tient avec une collection de plus en plus grande et à fluidifier la collaboration avec l’IA."
              },
              {
                type: "paragraph",
                text: "Honnêtement, c’est devenu l’un des outils les plus importants de mon workflow."
              }
            ]
          }
        ],
        mediaAlt: "Galerie de Taste Archive avec les références collectées et les cartes de projets",
        galleryAlts: [
          "Galerie de Taste Archive avec les références collectées et les cartes de projets",
          "Une référence visuelle sauvegardée dans Taste Archive depuis le navigateur",
          "Taste Archive attribuant des codes numérotés aux références utilisées avec Codex",
          "Galerie de Taste Archive en mode clair",
          "Une référence ouverte dans le panneau de détail de Taste Archive",
          "Des références Readwise rassemblées dans Taste Archive",
          "Le canvas de Taste Archive reliant des références visuelles et des notes"
        ]
      },
      "morning-kickstart": {
        description: "Un lanceur quotidien privé assisté par IA que j’ai conçu autour de mon vrai fonctionnement. Il transforme le calendrier, les rappels et le contexte vivant des projets en actions prêtes à démarrer, puis répercute les décisions dans les bons systèmes.",
        links: [],
        storyHeading: "Pourquoi j’ai créé ce projet",
        storyCopy: [
          "Pour moi, commencer est souvent la partie la plus difficile d’une tâche. Une fois lancée, je peux continuer pendant ce qui me semble être une éternité. Mais ouvrir le bon fichier, reconstruire le contexte et décider quoi dire dans le premier prompt Codex peut transformer deux clics en obstacle étonnamment grand.",
          "L’idée m’est venue en voyant Alex Dobrenko présenter son « chief of staff » assisté par IA : un système qui présente ce qui doit être fait dans un format utile et lui donne un bouton pour commencer. Mon cerveau a immédiatement fait : mais ouiiiiii.",
          "Je n’avais pas besoin que l’IA choisisse mon travail à ma place. J’avais besoin qu’elle rassemble les actions que j’avais déjà décidées, retrouve le contexte associé et prépare le premier prompt pour que je puisse simplement commencer."
        ],
        storyFlow: {
          label: "Des outils que j’utilise déjà vers une seule page prête à démarrer",
          steps: [
            "Calendrier + Rappels Apple + propriétés Obsidian",
            "Rassemble tout + prépare les prompts",
            "Une page où tout est organisé + un bouton Démarrer"
          ]
        },
        storyVideo: {
          videoId: "VX1fyYPvshI",
          title: "Présentation de Morning Kickstart",
          caption: "Une présentation d’une minute, en anglais, qui montre comment Morning Kickstart transforme les tâches du jour en actions prêtes à démarrer."
        },
        narrativeSections: [
          {
            title: "Comment je l’ai construit",
            blocks: [
              {
                type: "paragraph",
                text: "J’ai construit Morning Kickstart par-dessus les outils que j’utilise déjà. Le calendrier contient mes engagements, Rappels Apple contient les actions que j’ai choisies, et les propriétés de mes fichiers projets dans Obsidian contiennent le contexte vivant de chaque projet. Je n’ai pas eu à déplacer mon travail dans un nouveau système de productivité."
              },
              {
                type: "paragraph",
                text: "Chaque matin, je demande à Codex de lancer la journée. Il rassemble ce qui est déjà là, relie chaque action au contexte du bon projet et prépare un prompt modifiable. Puis il organise tout sur une seule page, projet par projet, avec un bouton Démarrer à côté de chaque action."
              },
              {
                type: "paragraph",
                text: "Démarrer ouvre une nouvelle conversation Codex avec le contexte et la première instruction déjà en place. Le système me donne un point de départ sans prendre la décision à ma place."
              }
            ]
          },
          {
            title: "Le rendre agréable à utiliser",
            blocks: [
              {
                type: "colorComposition",
                images: [
                  { src: "assets/projects/morning-kickstart/blue.png", alt: "Morning Kickstart dans son thème bleu" },
                  { src: "assets/projects/morning-kickstart/pink.png", alt: "Morning Kickstart dans son thème rose poudré" },
                  { src: "assets/projects/morning-kickstart/green.png", alt: "Morning Kickstart dans son thème vert" }
                ],
                caption: "La même page quotidienne en bleu, rose poudré et vert."
              },
              {
                type: "paragraph",
                text: "La page change de couleur quand je la recharge, et terminer une section déclenche une petite animation."
              },
              {
                type: "image",
                src: "assets/projects/morning-kickstart/completion-animation.gif",
                alt: "Morning Kickstart se fond dans un écran de réussite bleu affichant Atta girl avant de revenir à la page quotidienne bleue",
                caption: "La petite animation qui apparaît quand je termine une section."
              }
            ]
          },
          {
            title: "La partie vraiment utile",
            blocks: [
              {
                type: "paragraph",
                text: "La partie vraiment utile, c’est l’ensemble des commandes attachées à chaque action."
              },
              {
                type: "list",
                items: [
                  "Démarrer ouvre le prompt préparé pour que je puisse commencer immédiatement et y ajouter ce qu’il faut.",
                  "Terminé valide la tâche d’origine dans Rappels Apple quand il y en a une, ou met à jour le contexte du projet.",
                  "Pas aujourd’hui raye l’action de la liste du jour sans la fermer, pour que je puisse y revenir demain.",
                  "Abandonner valide le rappel Apple d’origine, met à jour le contexte du projet pour libérer mon esprit de la chose que j’ai décidé de ne pas faire, et consigne la décision."
                ]
              },
              {
                type: "image",
                src: "assets/projects/morning-kickstart/action-controls.png",
                alt: "Une tâche Morning Kickstart avec les commandes Démarrer, Ouvrir le contexte, Pas aujourd’hui, Terminé et Abandonner",
                caption: "Une tâche active avec l’ensemble complet des commandes."
              },
              {
                type: "paragraph",
                text: "Tout est également consigné dans mon Action Log. Commencer, terminer, reporter ou abandonner un travail alimente ainsi un journal continu de productivité et de décisions."
              }
            ]
          },
          {
            title: "Ce que ça a changé",
            blocks: [
              {
                type: "paragraph",
                text: "J’utilise Morning Kickstart depuis deux mois maintenant. Je ne commence plus ma matinée en reconstruisant chaque projet dans ma tête. Je sais exactement quelles actions vont vraiment faire avancer les choses en premier."
              },
              {
                type: "paragraph",
                text: "Comme je suis extrêmement productive le matin, j’ai du temps l’après-midi pour bricoler sur les projets qui me plaisent, y compris des projets personnels qui n’ont pas encore besoin de devenir quelque chose."
              },
              {
                type: "paragraph",
                text: "L’action, le contexte et le prompt préparé sont tous au même endroit. Cela me rend tout simplement beaucoup plus efficace."
              }
            ]
          },
          {
            title: "Comment je pense qu’il va évoluer",
            blocks: [
              {
                type: "paragraph",
                text: "Comme c’est un outil personnel, il évoluera avec moi. Je ne sais pas à quoi il ressemblerait si j’avais un poste permanent dans une entreprise, ou si je remplaçais l’un des outils de mon workflow. Il changera avec moi, c’est certain."
              },
              {
                type: "paragraph",
                text: "Pour le moment, il est parfait comme il est. Je continue simplement à bricoler de petites règles sur l’endroit où une chose doit aller ou sur ce qu’une expression veut vraiment dire."
              },
              {
                type: "paragraph",
                text: "Par exemple, je suis française : quand je lui dis que je dois « faire une machine », il doit comprendre que je parle de lancer une lessive (lol)."
              }
            ]
          }
        ],
        mediaAlt: "Brief quotidien de Morning Kickstart dans un thème bleu",
        galleryAlts: [
          "Brief quotidien de Morning Kickstart dans un thème bleu",
          "Brief quotidien de Morning Kickstart dans un thème rose poudré",
          "Brief Morning Kickstart terminé dans un thème vert"
        ]
      },
      "wishes-for-the-future": {
        description: "Une œuvre web participative et bilingue que j’ai conçue et construite. Chacun peut y déposer anonymement une scène ordinaire du futur dans lequel il aimerait vivre, puis parcourir l’archive publique.",
        links: [
          { label: "Déposer un souhait", href: "https://wish.mariedrouvin.com/" },
          { label: "Voir la bande-annonce", href: "https://youtu.be/YlIPyuqMUdE" }
        ],
        storyHeading: "Pourquoi j’ai créé ce projet",
        mediaAlt: "Page d’accueil de Wishes for the Future",
        galleryAlts: [
          "Page d’accueil de Wishes for the Future en mode sombre",
          "Bande-annonce de Dear Future",
          "Page d’accueil de Wishes for the Future en mode clair",
          "Une grille de souhaits anonymes déposés sur Wishes for the Future"
        ],
        storyCopy: [
          "Le problème avec les souhaits, c’est qu’ils sont généralement très larges. Quand tu souhaites quelque chose pour le futur, tu souhaites du bonheur, de l’argent, de la beauté, du plaisir et toutes ces grandes choses. Mais je suis convaincue qu’un avenir meilleur ne se construit que dans les détails.",
          "Pas le bonheur, mais ne plus jamais avoir à mettre de réveil.\nPas la beauté, mais enfiler le matin des vêtements dans lesquels tu te sens radieuse et sexy.\nPas l’amour, mais un visage familier contre lequel tu veux te blottir le soir.",
          "Le mot important ici, c’est « précisément ». Je voulais créer un endroit où imaginer concrètement le futur que tu veux, comme s’il existait déjà.",
          "C’est comme ça que je suis arrivée à cette question : Tu te réveilles un samedi ordinaire dans le futur. Qu’est-ce que tu souhaites voir ?",
          "J’ai deux objectifs avec ce site :\n1. Apporter un peu d’espoir et de clarté à celles et ceux qui répondent à la question (ça m’arrive déjà)\n2. Créer une collection de souhaits dans laquelle nous pouvons puiser de l’inspiration"
        ],
        narrativeSections: [
          {
            title: "Comment je l’ai construit",
            blocks: [
              {
                type: "paragraph",
                parts: [
                  { text: "Le site lui-même est très simple : ", emphasis: "strong" },
                  { text: "tu écris ta réponse, tu l’envoies et elle rejoint l’archive publique." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "C’est sur la partie visuelle que je me suis amusée. J’ai créé une peinture animée pour le fond et testé plusieurs peintures et plusieurs outils avant d’obtenir le résultat que je voulais avec Canva : " },
                  { text: "subtil, sans musique, court", emphasis: "em" },
                  { text: ", avec un paysage paisible de Félix Vallotton." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "J’ai aussi ajouté un élément dynamique à la question : ", emphasis: "strong" },
                  { text: "le jour mentionné correspond toujours à celui où tu consultes le site. Si tu le visites un lundi, la question dit lundi." }
                ]
              }
            ]
          },
          {
            title: "Ce qui vient ensuite",
            blocks: [
              {
                type: "paragraph",
                parts: [
                  { text: "Mon prochain objectif est de recueillir 100 souhaits sincères dans l’archive publique. ", emphasis: "strong" },
                  { text: "L’archive publique en contient actuellement 20. Le site, lui, est suffisamment abouti. La difficulté, désormais, c’est de trouver des façons d’inviter les gens à répondre à la question plutôt que de se contenter d’admirer le site." }
                ]
              },
              {
                type: "paragraph",
                text: "Si la collection grandit, j’aimerais voir ce qu’elle pourrait devenir : peut-être un zine, une sélection illustrée ou une lecture publique. Pour l’instant, je veux surtout voir davantage de futurs ordinaires et précis cohabiter dans l’archive."
              }
            ]
          }
        ]
      },
      "content-graph": {
        description: "Une carte interactive que j’ai construite pour explorer plusieurs années de textes et de vidéos à travers leurs thèmes récurrents et les liens qui les relient.",
        linkLabel: "Explorer le graphe de contenus",
        mediaAlt: "Page d’accueil du Content Graph avec l’archive de Marie et ses thèmes",
        galleryAlts: [
          "Page d’accueil du Content Graph avec l’archive de Marie et ses thèmes",
          "Vue d’ensemble du Content Graph et des thèmes d’écriture de Marie",
          "Détail du thème Making cool stuff online dans le Content Graph"
        ]
      },
      "marie-s-library": {
        description: "Une bibliothèque privée pensée pour le téléphone, que j’ai construite pour rassembler des cours interactifs, des rapports de recherche guidés par leurs sources et de petits outils.",
        linkLabel: "Ouvrir la bibliothèque privée",
        mediaAlt: "Collection Course Maker dans Marie’s Library",
        galleryAlts: [
          "Collection Course Maker dans Marie’s Library",
          "Rapports de recherche dans Marie’s Library",
          "Un rapport ouvert dans Marie’s Library"
        ]
      },
      peopledex: {
        description: "Un workflow de recherche privé que j’ai construit pour comprendre comment les personnes que j’admire pensent, travaillent et racontent ce qu’elles créent, sans perdre les sources derrière l’interprétation.",
        linkLabel: "Ouvrir l’outil privé",
        mediaAlt: "Profil PeopleDex reliant les idées et les sources d’Erich Fromm",
        galleryAlts: [
          "Profil PeopleDex reliant les idées et les sources d’Erich Fromm",
          "Section des références d’un profil PeopleDex sur Erich Fromm",
          "Navigateur de sources dans un profil PeopleDex"
        ],
        storyHeading: "Pourquoi j’ai créé ce projet",
        storyCopy: [
          "Quand je découvre une personne dont le travail me touche vraiment, j’ai tendance à plonger très loin dans ses archives. Je lis ce qu’elle vient de publier, ce qu’elle faisait il y a longtemps et tout ce qu’il y a entre les deux. Je vois un peu ces personnes comme des mentors à distance : leurs idées m’affectent, mais je veux aussi que leur manière de penser transforme ma manière de travailler.",
          "Je voulais comprendre davantage que ce qu’elles disent. Je voulais voir les idées qui reviennent, ce qu’elles construisent, comment elles recueillent et développent leurs idées, quelles références les nourrissent et comment elles choisissent de présenter quelque chose.",
          "PeopleDex est né quand j’ai compris que l’IA pouvait m’aider à faire ça de manière systématique. Je donne au skill des sources substantielles sur une personne qui compte déjà pour moi, et il transforme tout ça en un profil sourcé que je peux explorer dans ma bibliothèque privée."
        ],
        storyVideo: {
          videoId: "ydyVGtREan4",
          title: "Présentation de PeopleDex",
          caption: "Une présentation de trois minutes en anglais du profil d’Alex Dobrenko et des six sections de PeopleDex."
        },
        narrativeSections: [
          {
            title: "Ce que PeopleDex extrait",
            blocks: [
              {
                type: "paragraph",
                text: "Chaque profil est organisé autour de six questions :"
              },
              {
                type: "list",
                items: [
                  "Quelles idées et quels principes reviennent sans cesse ?",
                  "Qu’est-ce que cette personne a créé ?",
                  "Comment trouve-t-elle, conserve-t-elle, développe-t-elle et publie-t-elle ses idées ?",
                  "Quelles personnes, traditions, outils et références culturelles l’influencent ?",
                  "Comment présente-t-elle et partage-t-elle son travail ?",
                  "Quelles sources précises permettent de vérifier chaque interprétation ?"
                ]
              },
              {
                type: "paragraph",
                text: "La partie consacrée aux références est l’une de mes préférées, parce qu’elle m’entraîne dans des terriers de lapin très utiles. Visakan Veerasamy cite des films de super-héros. Alex Dobrenko fait référence à Windows 95 et à des environnements de code. Les références de JA Westenberg relèvent plutôt du minimalisme tech : une webcam, une pièce, pas de B-roll."
              },
              {
                type: "image",
                src: "assets/projects/peopledex/references.png",
                alt: "La section Références d’un profil PeopleDex sur Erich Fromm, avec des traditions, des enseignants, des pratiques et des objets culturels reliés à leurs sources",
                caption: "Les références à l’intérieur d’un profil consacré à Erich Fromm."
              }
            ]
          },
          {
            title: "Comment ça fonctionne",
            blocks: [
              {
                type: "process",
                label: "De ce que j’ai sauvegardé à un profil de recherche privé",
                steps: [
                  "Highlights Readwise",
                  "Conférences complètes + contenus substantiels",
                  "Le skill extrait et organise les motifs récurrents",
                  "Un profil sourcé rejoint Marie’s Library"
                ]
              },
              {
                type: "paragraph",
                text: "Les highlights Readwise sont généralement le point de départ, parce que j’ai déjà beaucoup surligné ces personnes avant de décider de leur consacrer un profil. J’ajoute quelques contenus complets qui ont eu un vrai impact sur moi. Une conférence entière est idéale : elle donne au skill assez de contexte pour comprendre ce qui occupe cette personne aujourd’hui, au lieu de prendre quelques extraits isolés pour l’ensemble de sa pensée."
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Chaque interprétation renvoie aux Sources. ", emphasis: "strong" },
                  { text: "Les contenus sont organisés par idée et par type de source, ce qui me permet de vérifier ce que l’IA a repéré plutôt que de le prendre pour un fait." }
                ]
              },
              {
                type: "image",
                src: "assets/projects/peopledex/sources.png",
                alt: "La section Sources d’un profil PeopleDex sur Erich Fromm, avec des filtres et des liens vers les contenus Readwise d’origine",
                caption: "Le navigateur de sources permet de vérifier chaque interprétation."
              }
            ]
          },
          {
            title: "Comment je m’en sers",
            blocks: [
              {
                type: "paragraph",
                text: "Ce qu’il y a de plus transformateur dans PeopleDex, ce n’est pas l’archive elle-même. C’est le fait que j’ai réellement intégré certains réflexes de mes mentors à distance dans mon propre workflow."
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Zara Zhang ouvre ses vidéos en commençant par le problème. ", emphasis: "strong" },
                  { text: "J’ai étudié cette manière de faire chez elle, et je suis maintenant beaucoup plus à l’aise pour créer de courtes vidéos sur les petits produits que je construis. Je sais trouver l’angle avant de commencer à expliquer l’objet." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Un autre principe de Zara est devenu essentiel dans ma manière de travailler : construire d’abord, apprendre ensuite. ", emphasis: "strong" },
                  { text: "Je construis quelque chose avec l’IA, puis je lui demande comment ce qui existe a été construit. J’ai beaucoup plus appris sur le fonctionnement d’internet dans cet ordre-là qu’en essayant de tout apprendre avant de fabriquer quoi que ce soit." }
                ]
              },
              {
                type: "paragraph",
                parts: [
                  { text: "Alex Dobrenko transforme la présentation en objet présenté. ", emphasis: "strong" },
                  { text: "Je n’ai pas encore eu la bonne occasion pour essayer cette approche, mais j’ai très envie de créer un environnement qui soit lui-même la présentation : la pièce dans laquelle le public entre. Cette idée a complètement changé ce que j’ai envie de faire d’une présentation." }
                ]
              }
            ]
          },
          {
            title: "Ce qui vient ensuite",
            blocks: [
              {
                type: "paragraph",
                text: "PeopleDex n’a pas eu besoin d’une grande refonte depuis que je l’ai créé. À ce stade, j’ajoute des personnes plutôt que des fonctionnalités."
              },
              {
                type: "paragraph",
                text: "Il contient aujourd’hui six profils, commencés en juillet. C’est volontairement une archive lente et conçue pour durer, parce que je n’ajoute quelqu’un que lorsque son travail compte vraiment pour moi. Je ne rencontre pas une nouvelle personne comme ça chaque semaine, et c’est précisément l’idée."
              }
            ]
          }
        ]
      },
      "personal-ai-workflows": {
        title: "Workflows personnels avec l’IA",
        typeLabel: "Workflows privés",
        dateLabel: "2026",
        description: "Un petit ensemble de workflows assistés par IA que j’ai construit pour faire avancer le travail de la capture et la planification jusqu’à la création, la publication et la revue.",
        galleryAlts: [
          "Présentation MD Slides avec une leçon sur le travail avec des fichiers locaux et une IA",
          "Six vignettes YouTube produites avec le workflow YouTube Thumbnail"
        ],
        components: [
          {
            title: "Ready to Publish",
            detail: "Vérifie un brouillon terminé de Les Papiers, suggère des liens internes et prépare les fichiers et URL nécessaires à sa mise en ligne."
          },
          {
            title: "YouTube Description",
            detail: "Produit des descriptions YouTube en français cohérentes, avec une ouverture claire et les liens pertinents."
          },
          {
            title: "MD Slides",
            detail: "Transforme du matériel pédagogique en slides HTML responsives dans le langage visuel de mariedrouvin.com."
          },
          {
            title: "YouTube Thumbnail",
            detail: "Applique mon système visuel aux images vidéo tout en gardant le centre libre pour le bouton de lecture de YouTube."
          },
          {
            title: "Monologue to Daily Note",
            detail: "Transforme les nouvelles notes Monologue en transcriptions complètes, puis ajoute un résumé structuré et un lien exact dans la daily note correspondante."
          },
          {
            title: "Project Creation",
            detail: "Crée un dossier de projet durable, ses propriétés d’action, son contexte et son journal à partir d’un seul brief."
          },
          {
            title: "Publication des actualités du site",
            detail: "Transforme une actualité Markdown en données validées, puis met à jour l’accueil et l’archive des actualités sur mariedrouvin.com."
          },
          {
            title: "Publication sur Notes",
            detail: "Prépare et vérifie un brouillon Obsidian, construit l’article public et le déploie sur notes.mariedrouvin.com."
          },
          {
            title: "End of Day",
            detail: "Combine les rappels terminés et les traces de la daily note pour enregistrer ce qui s’est réellement passé."
          },
          {
            title: "Month Review",
            detail: "Synthétise les notes, transcriptions, calendriers, ventes, publications et l’historique de lecture dans une revue mensuelle."
          }
        ]
      },
      "ready-to-publish": {
        description: "Un workflow de publication privé qui vérifie un brouillon terminé de Les Papiers, suggère des liens internes et prépare les fichiers et URL nécessaires à sa mise en ligne."
      },
      "youtube-description": {
        description: "Un workflow d’écriture privé pour produire des descriptions YouTube en français cohérentes, avec une ouverture claire et les liens pertinents."
      },
      "md-slides": {
        description: "Un workflow de présentation privé que j’utilise pour transformer du matériel pédagogique en slides HTML responsives dans le langage visuel de mariedrouvin.com.",
        mediaAlt: "Présentation MD Slides avec une leçon sur le travail avec des fichiers locaux et une IA"
      },
      "youtube-thumbnail": {
        description: "Un workflow privé de production d’images qui applique mon système visuel tout en gardant le centre libre pour le bouton de lecture de YouTube."
      },
      "monologue-to-daily-note": {
        description: "Une automatisation locale que j’ai construite pour transformer les nouvelles notes Monologue en fichiers de transcription complets, puis ajouter un résumé structuré et un lien exact dans la daily note correspondante."
      },
      "project-creation": {
        description: "Un workflow privé du vault qui crée un dossier de projet durable, ses propriétés d’action, son contexte et son journal à partir d’un seul brief."
      },
      "md-notifications": {
        title: "Publication des actualités du site",
        description: "Un workflow de publication privé qui transforme une actualité Markdown en données validées, puis met à jour l’accueil et l’archive des actualités sur mariedrouvin.com."
      },
      "add-to-notes-md": {
        title: "Publication sur Notes",
        description: "Un workflow de publication privé qui prépare et vérifie un brouillon Obsidian, construit l’article public et le déploie sur notes.mariedrouvin.com."
      },
      "end-of-day": {
        description: "Une automatisation locale de fin de journée qui combine les rappels terminés et les traces de la daily note pour écrire un relevé concis de ce qui s’est réellement passé."
      },
      "month-review": {
        description: "Un workflow privé de revue mensuelle qui synthétise les notes, transcriptions, calendriers, ventes, publications et l’historique de lecture."
      },
      "tweet-inbox": {
        description: "Une application web privée et offline-first que j’ai construite pour capturer de possibles publications sans avoir à ouvrir un fil de réseau social."
      },
      "substack-feed-blocker": {
        description: "Une petite extension de navigateur qui masque le feed Substack tout en gardant les publications, les outils d’écriture et le reste de la plateforme accessibles.",
        linkLabel: "Voir l’extension",
        linkLabels: ["Voir l’extension", "Voir comment j’ai corrigé Substack"],
        mediaAlt: "Le feed d’accueil de Substack remplacé par des liens sûrs grâce à Substack Feed Blocker",
        galleryAlts: [
          "Le feed d’accueil de Substack remplacé par des liens sûrs grâce à Substack Feed Blocker",
          "Vidéo de présentation de Substack Feed Blocker",
          "L’interface complète de Substack avec le bloqueur de feed activé"
        ]
      },
      "ferme-de-la-terriere": {
        description: "Un site bilingue rapide que j’ai conçu et construit pour un gîte rural dans la Somme, avec des pages statiques distinctes en français et en anglais, du SEO local et un parcours de réservation vers Airbnb.",
        linkLabel: "Visiter le site",
        mediaAlt: "Page d’accueil du site de la Ferme de la Terrière",
        galleryAlts: [
          "Page d’accueil du site de la Ferme de la Terrière",
          "Galerie du site de la Ferme de la Terrière présentant le gîte et ses chambres"
        ]
      },
      "notes-mariedrouvin-com": {
        description: "Mon site de publication en anglais, construit à la main pour mes essais, notes d’apprentissage, peintures et pensées inachevées, avec son propre flux RSS.",
        linkLabel: "Visiter notes.mariedrouvin.com",
        linkLabels: ["Visiter notes.mariedrouvin.com", "Lire Why this blog"],
        mediaAlt: "Page d’accueil de notes.mariedrouvin.com",
        galleryAlts: [
          "Page d’accueil de notes.mariedrouvin.com en mode sombre",
          "Page d’accueil de notes.mariedrouvin.com en mode clair",
          "Une page d’essai sur notes.mariedrouvin.com",
          "La galerie de travaux créatifs sur notes.mariedrouvin.com",
          "Les liens de réponse proposés aux lecteurs à la fin d’un article"
        ]
      },
      "mariedrouvin-com": {
        description: "Mon site français construit à la main pour mes services, produits et textes, migré d’une grosse plateforme vers du HTML portable avec SEO, paiements, formulaires et livraison par email.",
        linkLabel: "Visiter mariedrouvin.com",
        linkLabels: ["Visiter mariedrouvin.com", "Voir comment j’ai reconstruit le site"],
        mediaAlt: "Page d’accueil de mariedrouvin.com",
        galleryAlts: [
          "Page d’accueil de mariedrouvin.com en mode sombre",
          "Vidéo sur la reconstruction de mariedrouvin.com",
          "Page d’accueil de mariedrouvin.com en mode clair",
          "Galerie de mariedrouvin.com",
          "Page Consultation de mariedrouvin.com"
        ]
      },
      organons: {
        description: "Un livre visuel que j’ai écrit et conçu autour de quatre instruments de pensée historiques pour la pratique créative : lexiques, cartes, manifestes et utopies.",
        linkLabel: "Voir Organons",
        mediaAlt: "Le livre Organons tenu devant une bibliothèque",
        galleryAlts: [
          "Le livre Organons tenu devant une bibliothèque",
          "Une double page ouverte à l’intérieur du livre Organons"
        ]
      },
      "les-papiers": {
        description: "Un magazine en ligne en français que je publie sur la créativité, l’IA, les sites personnels et les gens qui rendent internet vivant à nouveau.",
        linkLabel: "Lire Les Papiers",
        mediaAlt: "Page d’accueil de Les Papiers sur Substack",
        galleryAlts: [
          "Page d’accueil de Les Papiers sur Substack",
          "Articles populaires de Les Papiers"
        ]
      },
      "how-to-live-in-peace-with-your-creative-ambition": {
        title: "Comment bien vivre son ambition créative",
        description: "Un recueil bilingue d’essais que j’ai édité et publié sur l’ambition créative, la passion et la manière de continuer à créer sans transformer sa vie créative en concours de performance.",
        links: [
          { label: "Get the ebook in English", href: "https://circecreates.gumroad.com/l/ebook-creative-ambition" }
        ],
        mediaAlt: "Maquette du livre Comment bien vivre son ambition créative",
        galleryAlts: ["Maquette du livre Comment bien vivre son ambition créative"]
      },
      portfolio: {
        description: "Le site bilingue que j’ai conçu et construit pour rendre mes sites, outils, skills, automatisations, publications et expériences internet faciles à explorer.",
        mediaAlt: "Index du portfolio présentant les projets de Marie Drouvin par année"
      }
    }
  }
};
