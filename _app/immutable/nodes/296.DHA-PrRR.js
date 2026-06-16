import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Word Cloud using PackedLayout`,indexDescription:`A word cloud visualization using the PackedLayout extension.`,screenshot:`wordcloud`,priority:2,tags:[`links`,`treelayout`,`geometries`],description:`Given a collection of words and their frequencies or importance, generate a diagram of those words scale by their frequency or importance and then packed together.`,module:!0},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
        This also adds a border to help see the edges of the viewport. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  <textarea style="margin-top: 12px; max-width: 100%" rows="6" cols="75" id="textInput">\r
GoJS is a feature-rich JavaScript library for implementing custom interactive diagrams and complex visualizations across modern web browsers and platforms. GoJS makes constructing JavaScript diagrams of complex nodes, links, and groups easy with customizable templates and layouts.\r
\r
GoJS offers many advanced features for user interactivity such as drag-and-drop, copy-and-paste, in-place text editing, tooltips, context menus, automatic layouts, templates, data binding and models, transactional state and undo management, palettes, overviews, event handlers, commands, and an extensible tool system for custom operations.\r
\r
GoJS is pure JavaScript, so users get interactivity without requiring round-trips to servers and without plugins. GoJS normally runs completely in the browser, rendering to an HTML5 Canvas element or SVG without any server-side requirements. GoJS does not depend on any JavaScript libraries or frameworks, so it should work with any HTML or JavaScript framework or with no framework at all.\r
\r
Build custom modeling environments and domain-specific visual languages using the powerful features of GoJS. Provide both a system editor and a read-only status monitor using shared code and templates. Simultaneously show alternative visualizations of the same data in different diagrams. Implement drill-down using expansion of subtrees and subgraphs or a detailed view in another diagram.\r
\r
Yet GoJS is remarkably simple for such a powerful and flexible system. Our thorough documentation introduces the basic concepts and demonstrate typical features that most apps want to offer. Nodes and links can be arbitrarily detailed according to the needs of the application. The API consists of only a few dozen important classes which encapsulate many useful features that interact with each other. There are many properties that permit simple customizations; some methods may be overridden for more complicated customizations.\r
\r
Explore\r
Run over 200 sample apps that are flowcharts, org charts, mind maps, UML diagrams, BPMN diagrams, graph editors, data visualization, and much more.\r
\r
Learn\r
Get started with a step-by-step description of how to build a JavaScript diagram in HTML using GoJS and some model data.\r
\r
Download\r
Get a copy of the library and all of the samples, extensions, and documentation. Search the JavaScript code and modify the samples to start your app.\r
\r
Learn pages\r
Read our learn pages for a overview of GoJS concepts and features, including hundreds of live interactive examples embedded right in each page.\r
\r
Unlimited Evaluation\r
Evaluate the full library without any limitations. Register with us and get free support for a month to help build your app.\r
\r
API Documentation\r
Read our comprehensive documentation for an in-depth reference of the properties and methods of all of the JavaScript classes.\r
\r
When upgrading to a newer version, please read the Change Log.\r
\r
You can explore the newest features and samples in the GoJS Beta for the next version, if a next version is available. Read the beta change log for the new features. Please note that our GitHub directory does not have the beta files.\r
    </textarea\r
  >\r
\r
  <br />Randomize word positions <input type="checkbox" id="randomizePositions"" checked/>\r
\r
  <br /><button id="generateButton" style="margin-bottom: 12px; margin-top: 6px">Generate wordcloud</button>`,jsCode:`import go from 'gojs';\r
  import { PackedLayout } from '../extensionsJSM/PackedLayout.js';\r
\r
  //"SLSO8" palette by Luis Miguel Maldonado on lospec.com\r
  const colors = [\r
    '#0d2b45',\r
    '#203c56',\r
    '#544e68',\r
    '#8d697a',\r
    '#d08159'\r
  ];\r
\r
  const myDiagram = new go.Diagram('myDiagramDiv', {\r
    'animationManager.isEnabled': true,\r
    isReadOnly: true,\r
    autoScale: go.AutoScale.Uniform\r
  });\r
\r
  // Nodes just show text with bindings for scale and font\r
  myDiagram.nodeTemplate =\r
    new go.Node()\r
      .bind('scale')\r
      .add(\r
        new go.TextBlock()\r
          .bind('text')\r
          .bind('font')\r
          .bind('stroke')\r
      );\r
\r
  // create a layout with the default values\r
  rebuildGraph();\r
\r
  function rebuildGraph() {\r
    var frequencies = getWordFrequencies();\r
    var nodeData = generateNodeData(frequencies);\r
    myDiagram.model = new go.GraphLinksModel(nodeData);\r
\r
    myDiagram.startTransaction('create wordcloud');\r
    myDiagram.layout = new PackedLayout({\r
      spacing: 5,\r
      arrangesToOrigin: false\r
    });\r
    myDiagram.commitTransaction('create wordcloud');\r
  }\r
\r
  // returns a map (word -> frequency) of words in the text\r
  function getWordFrequencies() {\r
    // list of english words to exclude from the wordcloud\r
    var stopWords = [\r
      'i',\r
      'me',\r
      'my',\r
      'myself',\r
      'we',\r
      'us',\r
      'our',\r
      'ours',\r
      'ourselves',\r
      'you',\r
      'your',\r
      'yours',\r
      'yourself',\r
      'yourselves',\r
      'he',\r
      'him',\r
      'his',\r
      'himself',\r
      'she',\r
      'her',\r
      'hers',\r
      'herself',\r
      'it',\r
      'its',\r
      'itself',\r
      'they',\r
      'them',\r
      'their',\r
      'theirs',\r
      'themselves',\r
      'what',\r
      'which',\r
      'who',\r
      'whom',\r
      'whose',\r
      'this',\r
      'that',\r
      'these',\r
      'those',\r
      'am',\r
      'is',\r
      'are',\r
      'was',\r
      'were',\r
      'be',\r
      'been',\r
      'being',\r
      'have',\r
      'has',\r
      'had',\r
      'having',\r
      'do',\r
      'does',\r
      'did',\r
      'doing',\r
      'will',\r
      'would',\r
      'should',\r
      'can',\r
      'could',\r
      'ought',\r
      "i'm",\r
      "you're",\r
      "he's",\r
      "she's",\r
      "it's",\r
      "we're",\r
      "they're",\r
      "i've",\r
      "you've",\r
      "we've",\r
      "they've",\r
      "i'd",\r
      "you'd",\r
      "he'd",\r
      "she'd",\r
      "we'd",\r
      "they'd",\r
      "i'll",\r
      "you'll",\r
      "he'll",\r
      "she'll",\r
      "we'll",\r
      "they'll",\r
      "isn't",\r
      "aren't",\r
      "wasn't",\r
      "weren't",\r
      "hasn't",\r
      "haven't",\r
      "hadn't",\r
      "doesn't",\r
      "don't",\r
      "didn't",\r
      "won't",\r
      "wouldn't",\r
      "shan't",\r
      "shouldn't",\r
      "can't",\r
      'cannot',\r
      "couldn't",\r
      "mustn't",\r
      "let's",\r
      "that's",\r
      "who's",\r
      "what's",\r
      "here's",\r
      "there's",\r
      "when's",\r
      "where's",\r
      "why's",\r
      "how's",\r
      'a',\r
      'an',\r
      'the',\r
      'and',\r
      'but',\r
      'if',\r
      'or',\r
      'because',\r
      'as',\r
      'until',\r
      'while',\r
      'of',\r
      'at',\r
      'by',\r
      'for',\r
      'with',\r
      'about',\r
      'against',\r
      'between',\r
      'into',\r
      'through',\r
      'during',\r
      'before',\r
      'after',\r
      'above',\r
      'below',\r
      'to',\r
      'from',\r
      'up',\r
      'upon',\r
      'down',\r
      'in',\r
      'out',\r
      'on',\r
      'off',\r
      'over',\r
      'under',\r
      'again',\r
      'further',\r
      'then',\r
      'once',\r
      'here',\r
      'there',\r
      'when',\r
      'where',\r
      'why',\r
      'how',\r
      'all',\r
      'any',\r
      'both',\r
      'each',\r
      'few',\r
      'more',\r
      'most',\r
      'other',\r
      'some',\r
      'such',\r
      'no',\r
      'nor',\r
      'not',\r
      'only',\r
      'own',\r
      'same',\r
      'so',\r
      'than',\r
      'too',\r
      'very',\r
      'say',\r
      'says',\r
      'said',\r
      'shall'\r
    ];\r
\r
    var word = /[@a-z0-9]+([-.:/'’\\u2032\\u00A0\\u200C\\u200D~]+[@a-z0-9]+)*/gi;\r
\r
    // use the text in the word input box\r
    var text = document.getElementById('textInput').value;\r
\r
    var frequencies = new go.Map();\r
    var result;\r
    while ((result = word.exec(text)) !== null) {\r
      var match = result[0].toLowerCase();\r
      if (stopWords.indexOf(match) > -1) continue; // skip stop words\r
      if (!isNaN(Number(match))) continue; // skip numbers\r
      if (frequencies.has(match)) {\r
        frequencies.add(match, frequencies.get(match) + 1);\r
      } else {\r
        frequencies.add(match, 1);\r
      }\r
    }\r
    return frequencies;\r
  }\r
\r
  // creates a list of nodes from the frequency map\r
  function generateNodeData(frequencies) {\r
    // convert map to array\r
    var it = frequencies.iterator;\r
    var freqArr = [];\r
    while (it.next()) {\r
      freqArr.push({ word: it.key, freq: it.value });\r
    }\r
\r
    // sort the frequency array in descending order\r
    freqArr.sort((a, b) => b.freq - a.freq);\r
\r
    // create an array of nodes, scaled appropriately by frequency\r
    var nodes = [];\r
    var singleOccurrenceCount = 0;\r
    for (var i = 0; i < freqArr.length; i++) {\r
      if (freqArr[i].freq === 1) {\r
        singleOccurrenceCount++;\r
      }\r
      // stop creating nodes if we've already added too many that only occurred once, or if we've added 150 already\r
      if ((i > 25 && singleOccurrenceCount > 0.25 * i) || i > 150) {\r
        break;\r
      }\r
      // scale node size logarithmically with frequency\r
      var scale = 2 * Math.log(freqArr[i].freq) + 1;\r
      nodes.push({ text: freqArr[i].word, scale: scale, stroke: colors[Math.floor(Math.random() * colors.length)] });\r
    }\r
\r
    // randomize order if checkbox is checked\r
    if (document.getElementById('randomizePositions').checked) {\r
      var j, x, i;\r
      for (i = nodes.length - 1; i > 0; i--) {\r
        j = Math.floor(Math.random() * (i + 1));\r
        x = nodes[i];\r
        nodes[i] = nodes[j];\r
        nodes[j] = x;\r
      }\r
    }\r
\r
    return nodes;\r
  }\r
\r
  document.getElementById('randomizePositions').addEventListener('click', rebuildGraph);\r
  document.getElementById('generateButton').addEventListener('click', rebuildGraph);`,cssCode:`input[type='checkbox'] {\r
    vertical-align: middle;\r
    position: relative;\r
    bottom: 2px;\r
  }`,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This sample demonstrates a simple way to create a wordcloud visualization using the PackedLayout extension. The most frequent words in the text are shown\r
    larger, and common english words such as 'the' or 'of' are skipped. This example shows the text from the <a href="../index.html">GoJS home page</a>, but you\r
    can easily create your own by copying text into the box above.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`links`,`treelayout`,`geometries`];var g=y();l(`pvq4au`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};