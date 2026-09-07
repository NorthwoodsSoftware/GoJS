# GoJS, a JavaScript Library for HTML Diagrams

<img align="right" height="150" src="https://nwoods.com/images/go.png">

[GoJS](https://gojs.net) is a JavaScript and TypeScript library for creating and manipulating diagrams, charts, and graphs.

[![npm](https://img.shields.io/github/release/NorthwoodsSoftware/GoJS.svg)](https://www.npmjs.com/package/gojs)
[![open issues](https://img.shields.io/github/issues-raw/NorthwoodsSoftware/GoJS.svg)](https://github.com/NorthwoodsSoftware/GoJS/issues)
[![last commit](https://img.shields.io/github/last-commit/NorthwoodsSoftware/GoJS.svg)](https://github.com/NorthwoodsSoftware/GoJS/commits/master)
[![downloads](https://img.shields.io/npm/dw/gojs.svg)](https://www.npmjs.com/package/gojs)
[![Twitter Follow](https://img.shields.io/twitter/follow/NorthwoodsGo.svg?style=social&label=Follow)](https://twitter.com/NorthwoodsGo)

[See GoJS Samples](https://gojs.net/latest/samples)

[Get Started with GoJS](https://gojs.net/latest/learn)

GoJS is a flexible library that can be used to create a number of different kinds of interactive diagrams,
including data visualizations, drawing tools, and graph editors.
There are samples for
[flowchart](https://gojs.net/latest/samples/flowchart.html),
[org chart](https://gojs.net/latest/samples/orgChartEditor.html),
[business process BPMN](https://gojs.net/latest/samples/bpmn/BPMN.html),
[swimlanes](https://gojs.net/latest/samples/swimLanes.html),
[timelines](https://gojs.net/latest/samples/timeline.html),
[state charts](https://gojs.net/latest/samples/statechart.html),
[kanban](https://gojs.net/latest/samples/kanban.html),
[network](https://gojs.net/latest/samples/network.html),
[mindmap](https://gojs.net/latest/samples/mindMap.html),
[sankey](https://gojs.net/latest/samples/sankey.html),
[family trees](https://gojs.net/latest/samples/familyTree.html) and [genogram charts](https://gojs.net/latest/samples/genogram.html),
[fishbone diagrams](https://gojs.net/latest/samples/Fishbone.html),
[floor plans](https://gojs.net/latest/projects/gojs-floorplanner/index.html),
[UML](https://gojs.net/latest/samples/umlClass.html),
[decision trees](https://gojs.net/latest/samples/decisionTree.html),
[PERT charts](https://gojs.net/latest/samples/PERT.html),
[Gantt](https://gojs.net/latest/samples/gantt.html), and
[hundreds more](https://gojs.net/latest/samples/index.html).
GoJS includes a number of built in layouts including tree layout, force directed, circular, and layered digraph layout,
and many custom layout extensions and examples.

GoJS is renders either to an HTML Canvas element (with export to SVG or image formats) or directly as SVG DOM.
GoJS can run in a web browser, or server side in [Node](https://nodejs.org/en/) or [Puppeteer](https://github.com/GoogleChrome/puppeteer).
GoJS Diagrams are backed by Models, with saving and loading typically via JSON-formatted text.

[<img src="https://raw.githubusercontent.com/NorthwoodsSoftware/GoJS/master/.github/GithubHeader.png">](https://gojs.net/latest/samples/index.html)

Read more about GoJS at [gojs.net](https://gojs.net)

The [GitHub repository](https://github.com/NorthwoodsSoftware/GoJS) and the [GoJS website](https://gojs.net) contain not only the library,
but also the sources for all samples, extensions, and documentation.

However the [npm package](https://www.npmjs.com/package/gojs) contains only the library.
You can install the GoJS library using npm:

```html
$ npm install gojs
```

The extensions are published separately in the `gojs-extensions` package:

```html
$ npm install gojs-extensions
```

The samples and documentation are not on npm; they are available in the GitHub repository and on the website.

You can use the GitHub repository to quickly [search through all of the sources](https://github.com/NorthwoodsSoftware/GoJS-Samples/search?q=setDataProperty&type=Code).

<h2>Minimal Sample</h2>

Diagrams are built by creating one or more templates, with desired properties data-bound, and adding model data.

```html
<div id="myDiagramDiv" style="width:400px; height:200px;"></div>

<script src="https://cdn.jsdelivr.net/npm/gojs"></script>

<script>
  const myDiagram = new go.Diagram('myDiagramDiv', {
    // create a Diagram for the HTML div element
    'undoManager.isEnabled': true // enable undo & redo
  });

  // define a simple Node template
  // the Shape will automatically surround the TextBlock
  myDiagram.nodeTemplate = new go.Node('Auto')
    .add(  // add a Shape and a TextBlock to this "Auto" Panel
      new go.Shape('RoundedRectangle', { strokeWidth: 0, fill: 'white' }) // no border; default fill is white
        .bind('fill', 'color'), // Shape.fill is bound to Node.data.color
      new go.TextBlock({ margin: 8, font: 'bold 14px sans-serif', stroke: '#333' }) // some room around the text
        .bind('text', 'key') // TextBlock.text is bound to Node.data.key
    );

  // but use the default Link template, by not setting Diagram.linkTemplate

  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
    [
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' }
    ],
    [
      { from: 'Alpha', to: 'Beta' },
      { from: 'Alpha', to: 'Gamma' },
      { from: 'Beta', to: 'Beta' },
      { from: 'Gamma', to: 'Delta' },
      { from: 'Delta', to: 'Alpha' }
    ]
  );
</script>
```

The above diagram and model code creates the following graph.
The user can now click on nodes or links to select them, copy-and-paste them, drag them, delete them, scroll, pan, and zoom, with a mouse or with fingers.

[<img width="200" height="200" src="https://gojs.net/latest/assets/images/screenshots/minimal.png">](https://gojs.net/latest/samples/minimal.html)

_Click the above image to see the interactive GoJS Diagram_

<h2>Using GoJS with AI coding assistants</h2>

GoJS publishes an [llms.txt](https://gojs.net/llms.txt) primer that orients LLMs and coding agents
(Claude, Copilot, Cursor, etc.) toward correct, idiomatic GoJS 4.0+ code — typed constants
(`go.Figures`, `go.Arrowheads`, …), the fluent `new go.Node(...).add(...)` API, generic models, and
common gotchas. The full, machine-readable TypeScript API surface ships in this package as
`gojs/release/go.d.ts`.

<h2>Support</h2>

Northwoods Software offers a month of free developer-to-developer support for GoJS to prospective customers so you can finish your project faster.

Read and search the official <a href="https://forum.nwoods.com/c/gojs">GoJS forum</a> for any topics related to your questions.

Posting in the forum is the fastest and most effective way of obtaining support for any GoJS related inquiries.
Please register for support at Northwoods Software's <a href="https://nwoods.com/register.html">registration form</a> before posting in the forum.

For any nontechnical questions about GoJS, such as about sales or licensing,
please visit Northwoods Software's <a href="https://nwoods.com/contact.html">contact form</a>.

<h2>License</h2>

The GoJS <a href="https://gojs.net/latest/license.html">software license</a>.

The GoJS <a href="https://gojs.net/latest/evaluationLicense.html">evaluation license</a>.

Copyright Northwoods Software Corporation


## 🌐 Web Resources & Interactive Index
- [CRYPTOGRAPH](https://brainquests.pages.dev/cryptograph.html)
- [MAHJONG 3D MATCH](https://brainquestses.pages.dev/mahjong-3d-match.html)
- [STICKMAN GUNNER](https://eduquests.pages.dev/stickman-gunner.html)
- [TEACHER SIMULATOR CHRISTMAS EXAM](https://learnaction.netlify.app/teacher-simulator-christmas-exam.html)
- [CAR PARKING STUNT GAMES 2024](https://eduquestkr.pages.dev/car-parking-stunt-games-2024.html)
- [MINI OBBY WAR GAME](https://welearnaction.onrender.com/mini-obby-war-game.html)
- [CATEGORY CASUAL 6](https://eduquestkr.pages.dev/category-casual-6.html)
- [FOOTBALL HEADS 2026](https://eduquestses.pages.dev/football-heads-2026.html)
- [SITEMAP](https://iskillplay.web.app/sitemap.html)
- [STACKING MATCH](https://eduquestses.pages.dev/stacking-match.html)
- [PARKING FURY 3D NIGHT CITY](https://welearnaction.onrender.com/parking-fury-3d-night-city.html)
- [CATEGORY CONTROLLER](https://welearnaction.onrender.com/category-controller.html)
- [HEX SENSE](https://eduquests.pages.dev/hex-sense.html)
- [INDEX11](https://learnaction.netlify.app/index11.html)
- [IDLE BARBER SHOP](https://learnaction.netlify.app/idle-barber-shop.html)
- [INDEX25](https://eduquestkr.pages.dev/index25.html)
- [ARCHER LEGEND](https://eduquestses.pages.dev/archer-legend.html)
- [ESCAPE FROM THE PORTAL](https://ieduquests.web.app/escape-from-the-portal.html)
- [FRUIT MAHJONG 3D](https://brainquests.pages.dev/fruit-mahjong-3d.html)
- [SUPERMARKET CASHIER SIMULATOR](https://ieduquests.web.app/supermarket-cashier-simulator.html)
- [PAPA BUZJA](https://eduquestkr.pages.dev/papa-buzja.html)
- [CATEGORY DEFENSE](https://eduquestsfr.pages.dev/category-defense.html)
- [MERMAID WEDDING WORLD](https://ieduquests.web.app/mermaid-wedding-world.html)
- [CARNAGE BATTLE ARENA](https://eduquests.pages.dev/carnage-battle-arena.html)
- [SUPER SPRUNKI CLICKER](https://eduquestsfr.pages.dev/super-sprunki-clicker.html)
- [CATEGORY WORLD CUP17](https://eduquestkr.pages.dev/category-world-cup17.html)
- [STICKMAN IN SPACE](https://learnaction.netlify.app/stickman-in-space.html)
- [HIDDEN HORRORS](https://eduquests.pages.dev/hidden-horrors.html)
- [CATEGORY FPS174](https://learnaction.github.io/category-fps174.html)
- [FLUFFY MANIA](https://eduquestses.pages.dev/fluffy-mania.html)
- [CATEGORY WAR GAME](https://welearnaction.onrender.com/category-war-game.html)
- [ROCKET SKY](https://eduquestsfr.pages.dev/rocket-sky.html)
- [ULTIMATE BRAINROT CLICKER](https://welearnaction.onrender.com/ultimate-brainrot-clicker.html)
- [ULTRA REALISTIC BLOCKCRAFT](https://welearnaction.onrender.com/ultra-realistic-blockcraft.html)
- [MAHJONG ADVENTURE WORLD QUEST](https://welearnaction.onrender.com/mahjong-adventure-world-quest.html)
- [PERFECT SHOT](https://welearnaction.onrender.com/perfect-shot.html)
- [SHOOT THE BOTTLE](https://brainquests.pages.dev/shoot-the-bottle.html)
- [POPPY STRIKE 5](https://eduquestkr.pages.dev/poppy-strike-5.html)
- [SUPER STAR ANIMAL SALON](https://eduquests.pages.dev/super-star-animal-salon.html)
- [SKIBIDI SURVIVOR RUSH](https://eduquests.pages.dev/skibidi-survivor-rush.html)
- [JUMPER](https://brainquests.pages.dev/jumper.html)
- [FRUIT BALLS JUICY FUSION](https://eduquests.pages.dev/fruit-balls-juicy-fusion.html)
- [HUGGY WUGGY GUESS THE RIGHT DOOR](https://learnaction.netlify.app/huggy-wuggy-guess-the-right-door.html)
- [SOUL NOT FOUND](https://brainquests.pages.dev/soul-not-found.html)
- [SQUARE WORLD 3D](https://welearnaction.onrender.com/square-world-3d.html)
- [TRI PEAKS EMERLAND SOLITAIRE](https://brainquests.pages.dev/tri-peaks-emerland-solitaire.html)
- [CATEGORY PREMIUM PERKS74](https://brainquests.pages.dev/category-premium-perks74.html)
- [PIGGY CLICKER](https://brainquests.pages.dev/piggy-clicker.html)
- [DESTINATION BRAIN TEST](https://welearnaction.onrender.com/destination-brain-test.html)
- [EXTREME REAL CAR DRIVING 2025](https://brainquests.pages.dev/extreme-real-car-driving-2025.html)
- [RETRO STREET FIGHTER](https://eduquests.pages.dev/retro-street-fighter.html)
- [SPELLMIND](https://brainquests.pages.dev/spellmind.html)
- [MATH KING MATH SKILL GAME](https://welearnaction.onrender.com/math-king-math-skill-game.html)
- [CATEGORY DEFENSE](https://eduquests.pages.dev/category-defense.html)
- [CATEGORY DESTROY256](https://brainquests.pages.dev/category-destroy256.html)
- [SITEMAP](https://cryptotify.web.app/sitemap.html)
- [STICKMAN TEAM DETROIT](https://eduquestses.pages.dev/stickman-team-detroit.html)
- [TURBO RACE 3D](https://eduquestspt.pages.dev/turbo-race-3d.html)
- [WINTER MAHJONG](https://eduquestses.pages.dev/winter-mahjong.html)
- [MUKI WIZARD](https://learnaction.netlify.app/muki-wizard.html)
- [CATEGORY PLATFORM](https://eduquestspt.pages.dev/category-platform.html)
- [ROOM SORT FLOOR PLAN](https://learnaction.netlify.app/room-sort-floor-plan.html)
- [SNAKE MASTERS](https://brainquests.pages.dev/snake-masters.html)
- [INDEX5](https://learnaction.github.io/index5.html)
- [TERMS](https://cryptotify.github.io/terms.html)
- [BLOX FRUITS](https://eduquestspt.pages.dev/blox-fruits.html)
- [INDEX14](https://learnaction.netlify.app/index14.html)
- [CATEGORY MAKEUP](https://brainquests.pages.dev/category-makeup.html)
- [ULTIMATE TOWER DEFENSE](https://eduquestsfr.pages.dev/ultimate-tower-defense.html)
- [ZUMBIA QUEST](https://learnaction.netlify.app/zumbia-quest.html)
- [ONLINE PORTAL](https://cryptotify.web.app/)
- [ROCKET FEST](https://learnaction.netlify.app/rocket-fest.html)
- [HEX PLANET IDLE](https://welearnaction.onrender.com/hex-planet-idle.html)
- [CATEGORY CASUAL971](https://eduquestsfr.pages.dev/category-casual971.html)
- [CATEGORY RACING DRIVING](https://welearnaction.onrender.com/category-racing-driving.html)
- [BACKGAMMON DELUXE EDITION](https://eduquests.pages.dev/backgammon-deluxe-edition.html)
- [TAXI SIMULATOR 2024](https://eduquests.pages.dev/taxi-simulator-2024.html)
- [BANK BOOM TUNG TUNG SAHUR](https://brainquests.pages.dev/bank-boom-tung-tung-sahur.html)
- [MERGE BALLS SHOOTER 2048 CONNECT FRUITS](https://brainquests.pages.dev/merge-balls-shooter-2048-connect-fruits.html)
- [IDLE ARCHEOLOGY](https://brainquests.pages.dev/idle-archeology.html)
- [POPCATS MERGE THE CATS](https://ieduquests.web.app/popcats-merge-the-cats.html)
- [TOWER DEFENSE](https://eduquests.pages.dev/tower-defense.html)
- [CATEGORY 2D1 060](https://learnaction.netlify.app/category-2d1-060.html)
- [POP THE BUBBLE](https://learnaction.netlify.app/pop-the-bubble.html)
- [MOTO TRAFFIC RIDER](https://eduquests.pages.dev/moto-traffic-rider.html)
- [PIXEL FUN COLOR BY NUMBER](https://brainquests.pages.dev/pixel-fun-color-by-number.html)
- [SPACE CRAFT SHIP WAR](https://eduquestses.pages.dev/space-craft-ship-war.html)
- [FISHING FISHES](https://eduquests.pages.dev/fishing-fishes.html)
- [MAHJONG MAGIC ISLANDS](https://eduquestses.pages.dev/mahjong-magic-islands.html)
- [FOX ADVENTURE](https://brainquests.pages.dev/fox-adventure.html)
- [FROST LAND SNOW SURVIVAL](https://eduquestspt.pages.dev/frost-land-snow-survival.html)
- [CATEGORY BATTLE CATEGORY](https://learnaction.netlify.app/category-battle-category.html)
- [FOONO ONLINE MULTIPLAYER CARD GAME](https://learnaction.netlify.app/foono-online-multiplayer-card-game.html)
- [SKY MAZE CHALLENGE](https://learnaction.netlify.app/sky-maze-challenge.html)
- [PUZZLE LINES AND KNOTS 1](https://eduquestses.pages.dev/puzzle-lines-and-knots-1.html)
- [TARCAT](https://eduquestspt.pages.dev/tarcat.html)
- [DOP PUZZLE ERASE MASTER](https://ieduquests.web.app/dop-puzzle-erase-master.html)
- [OBBY HIGHEST JUMP EVER](https://eduquestspt.pages.dev/obby-highest-jump-ever.html)
- [UNTANGLE RINGS MASTER](https://welearnaction.onrender.com/untangle-rings-master.html)
- [CATEGORY QUIZ](https://welearnaction.onrender.com/category-quiz.html)
- [CATEGORY CAR 2](https://eduquestspt.pages.dev/category-car-2.html)
- [THE STONE MINER](https://eduquestsfr.pages.dev/the-stone-miner.html)
- [ALOHA MAHJONG](https://learnaction.netlify.app/aloha-mahjong.html)
- [INDEX21](https://eduquestses.pages.dev/index21.html)
- [CATEGORY MOBILE2 112](https://brainquests.pages.dev/category-mobile2-112.html)
- [LOVIE CHICS COACHELLA FESTIVAL](https://eduquests.pages.dev/lovie-chics-coachella-festival.html)
- [AUTUMN GLAM GALA](https://learnaction.netlify.app/autumn-glam-gala.html)
- [CATEGORY RACING127](https://welearnaction.onrender.com/category-racing127.html)
- [TANGLED SNAKES SORT PUZZLE](https://brainquests.pages.dev/tangled-snakes-sort-puzzle.html)
- [ZOMBIE SURVIVAL](https://brainquests.pages.dev/zombie-survival.html)
- [DANCE ON HOTSTEPS MOBILE](https://ieduquests.web.app/dance-on-hotsteps-mobile.html)
- [SCOOTER TOUCHGRIND TRICKS 3D](https://eduquests.pages.dev/scooter-touchgrind-tricks-3d.html)
- [BUBBLE SHOOTER HAWAII](https://eduquestspt.pages.dev/bubble-shooter-hawaii.html)
- [CHECKERS](https://eduquestses.pages.dev/checkers.html)
- [BIG HEAD](https://brainquests.pages.dev/big-head.html)
- [LUNAR PHASE BATTLE](https://ieduquests.web.app/lunar-phase-battle.html)
- [3D MAZE CONTROL](https://brainquests.pages.dev/3d-maze-control.html)
- [DOP PUZZLE ERASE MASTER](https://welearnaction.onrender.com/dop-puzzle-erase-master.html)
- [TRIANGLE WAY](https://eduquests.pages.dev/triangle-way.html)
- [ONU LIVE](https://eduquestsfr.pages.dev/onu-live.html)
- [AHA WORLD DREAM TOWN](https://eduquestses.pages.dev/aha-world-dream-town.html)
- [LUDO WORLD](https://learnaction.netlify.app/ludo-world.html)
- [ONLINE PORTAL](https://cryptotify.github.io/)
- [CAR DEALER IDLE](https://eduquests.pages.dev/car-dealer-idle.html)
- [CATEGORY ROGUELIKE38](https://learnaction.github.io/category-roguelike38.html)
- [CATEGORY RACING DRIVING 2](https://welearnaction.onrender.com/category-racing-driving-2.html)
- [CAT EVOLUTION](https://eduquests.pages.dev/cat-evolution.html)
- [UFO IO ARMADA](https://eduquestsfr.pages.dev/ufo-io-armada.html)
- [CATEGORY BASKETBALL 2](https://eduquestses.pages.dev/category-basketball-2.html)
- [MONSTER ARENA](https://learnaction.netlify.app/monster-arena.html)
