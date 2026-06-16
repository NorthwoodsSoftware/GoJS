import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Font Icons from Various Fonts for Drawing Icons using TextBlocks`,titleShort:`Font Icons`,indexDescription:`An example of how to use icon fonts with GOJS, making sure the fonts load fully before creating the diagram.`,screenshot:`fonticons`,priority:1.4,tags:[`svg`,`gridlayout`,`animation`],description:`An example of how to use icon fonts with GOJS, making sure the fonts load fully before creating the diagram.`},htmlContent:`Currently viewing icons from font:\r
  <select id="fontSelector" onchange="changeFont()"></select>\r
  <div style="display: flex; flex-direction: row; flex-wrap: wrap;">\r
    <div style="margin-right: 0.5rem; flex: none;">\r
      <!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
           This also adds a border to help see the edges of the viewport. -->\r
      <div\r
        id="myDiagramDiv"\r
        style="width: 575px; height: 575px; margin-bottom: 0.5rem; border: solid 1px black;"></div>\r
      <div id="propmenu" style="margin-bottom: 2.5rem; width: fit-content; border-radius: calc(var(--radius) - 2px); border: solid 1px black;">\r
        <!-- Properties card -->\r
        <table style="margin-right: 0.5rem;">\r
          <tr>\r
            <td style="min-width: 102px;">\r
              <p\r
                id="char"\r
                style="margin: 0; border-collapse: collapse; border-radius: calc(var(--radius) - 2px); text-align: center;"></p>\r
            </td>\r
            <td style="max-width: 400px; padding-left: 0.5rem;">\r
              <h5 id="unicode"></h5>\r
              <a id="fontpage">Official Font Page</a><br />\r
              <a id="alturl">Font Stylesheet URL</a><br />\r
              <a id="url">Font URL</a><br />\r
            </td>\r
          </tr>\r
        </table>\r
      </div>\r
    </div>\r
    <div style="min-width: 600px; flex: 1;">\r
      <pre><code id="codeBox1" class="lang-js"></code></pre>\r
      <p>\r
        This is a simple example <a>Diagram.nodeTemplate</a> with the necessary <a>Binding</a>s for\r
        font, text, and color. We also set <a>Textblock.spacingBelow</a> so that there is an equal\r
        margin above and below the text.\r
      </p>\r
\r
      <pre><code id="codeBox2" class="lang-js"></code></pre>\r
      <p>\r
        Here we set the <a>Diagram.model</a> inside a function <code>init()</code>, this way it can\r
        be called later once the font has been loaded. You may want to create your\r
        <a>Diagram</a> and <a>Diagram.nodeTemplate</a> inside this <code>init()</code>\r
        function too.\r
      </p>\r
    </div>\r
  </div>\r
  <pre><code id="codeBox3" class="lang-js"></code></pre>\r
  <p>\r
    This creates the font, then after it has loaded, adds it to the document fonts before\r
    calling <code>init()</code>.\r
  </p>\r
\r
  <pre>\r
    <code id="codeBox4a" class="lang-html"></code><br>\r
    <code class="lang-html">&lt;script&gt;</code><br>\r
    <code id="codeBox4b" class="lang-js"></code><br>\r
    <code class="lang-html">&lt;\\script&gt;</code>\r
  </pre>\r
  <p>\r
    Using FontFace comes with limitations in font formats. Another option is to make sure all\r
    fonts are loaded before\r
    <code>init()</code> is called. Normally fonts aren't loaded until they are used which causes\r
    them to not be in the <a>Diagram</a> on the first render.\r
  </p>`,jsCode:`// this is used to generate the example code\r
  const TEMPLATE = \`\r
myDiagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0, fill: 'white' })\r
        .bind('fill', 'color'),\r
      new go.TextBlock({ margin: 8, stroke: '#333', spacingBelow: {SPACING} })\r
        .bind('text')\r
        .bind('font')\r
    );\r
\r
function init() {\r
  // construct the Diagram first; then assign the model:\r
  myDiagram.model = new go.GraphLinksModel(\r
    [\r
      { font: "14pt {FONTNAME}", text: '{CHAR}', color: '{COLOR}' },\r
    ]\r
  );\r
}\r
\r
document.addEventListener('DOMContentLoaded', () => {\r
  new FontFace("{FONTNAME}", "url({FONTURL})").load().then(\r
    font => {\r
      document.fonts.add(font);\r
      init();\r
    },\r
    err => {\r
      console.error(err);\r
    }\r
  );\r
});\r
\r
<link rel="stylesheet" href="{ALTLINK}" />\r
\r
document.addEventListener('DOMContentLoaded', () => {\r
  document.fonts.forEach(f => f.load());\r
  document.fonts.ready.then(() => {\r
    init();\r
  });\r
});\r
\`;\r
\r
  // list of example fonts\r
  const Fonts = [\r
    {\r
      name: 'Material Symbols Outlined',\r
      color: '#D6DBDF',\r
      spaceingBelow: -8,\r
      samples: ['e84d', 100],\r
      skip: ['e88f'],\r
      officialurl: 'https://fonts.google.com/icons',\r
      url: 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v183/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2',\r
      alturl: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'\r
    },\r
    {\r
      name: 'FontAwesome',\r
      color: '#D6EAF8',\r
      spaceingBelow: -4,\r
      samples: ['f007', 100],\r
      skip: ['f00f', 'f01f', 'f020', 'f03f', 'f04f', 'f05f', 'f06f'],\r
      officialurl: 'https://fontawesome.com/search',\r
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-solid-900.woff2',\r
      alturl: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'\r
    },\r
    {\r
      name: 'Phosphor',\r
      color: 'linen',\r
      spaceingBelow: -4,\r
      samples: ['eb9a', 100],\r
      skip: ['eb9f'],\r
      officialurl: 'https://phosphoricons.com/',\r
      url: 'https://cdn.jsdelivr.net/npm/phosphor-icons@1.4.2/src/fonts/Phosphor.woff2',\r
      alturl: 'https://cdn.jsdelivr.net/npm/phosphor-icons@1.4.2/src/css/icons.min.css'\r
    }\r
  ];\r
\r
  // re-generate the Nodes when the font is changed\r
  function changeFont() {\r
    let ani_old_value = myDiagram.animationManager.isEnabled;\r
    myDiagram.animationManager.isEnabled = false;\r
\r
    let f = Fonts[document.getElementById('fontSelector').value];\r
\r
    myDiagram.model.commit(m => {\r
      m.set(m.modelData, 'color', f.color);\r
    });\r
    myDiagram.setDivBackground(f.color);\r
\r
    linkArr = [];\r
\r
    let stop_char = parseInt(f.samples[0], 16) + f.samples[1];\r
    for (let i = parseInt(f.samples[0], 16); i < stop_char; i++) {\r
      let char = String.fromCharCode(i);\r
      let codePoint = char.charCodeAt(0);\r
      let hexString = codePoint.toString(16);\r
      while (hexString.length < 4) {\r
        hexString = '0' + hexString;\r
      }\r
      let ucode = '\\\\u' + hexString;\r
\r
      // some characters are not included in the free versions of the used fonts\r
      // so they must be skipped\r
      if (f.skip.includes(hexString)) {\r
        stop_char += 1;\r
        continue;\r
      }\r
\r
      linkArr.push({\r
        font: \`14pt \${f.name}\`,\r
        text: char,\r
        fill: f.color,\r
        spacing: f.spaceingBelow,\r
        unicode: ucode,\r
        fonturl: f.url,\r
        fonturl2: f.alturl,\r
        officialurl: f.officialurl\r
      });\r
    }\r
\r
    myDiagram.model.nodeDataArray = linkArr;\r
\r
    // select the first node in the diagram\r
    updateSelection({ subject: { part: myDiagram.nodes.first() } });\r
    myDiagram.select(myDiagram.nodes.first());\r
\r
    myDiagram.animationManager.isEnabled = ani_old_value;\r
  }\r
\r
  // generate the example code for the selected Node\r
  function updateSelection(e) {\r
    let part = e.subject.part;\r
\r
    // find the parent node\r
    while ((part.panel || part.part) != part) {\r
      part = part.panel || part.part;\r
    }\r
\r
    let data = part.data;\r
\r
    // get data on selected node\r
    let fontname = data.font.split(' ').slice(1).join(' ');\r
    let f = Fonts.filter(f => f.name == fontname)[0];\r
    let fonturl = data.fonturl;\r
    let alturl = f.alturl;\r
    let color = f.color;\r
    let char = data.unicode;\r
\r
    // update properties menu\r
    let prop_div = document.getElementById('propmenu');\r
    prop_div.style.backgroundColor = new go.Brush(color).lightenBy(0.1).color;\r
\r
    let ele_char = document.getElementById('char');\r
    ele_char.style.fontFamily = fontname;\r
    ele_char.style.fontSize = '50pt';\r
    ele_char.innerText = data.text;\r
    ele_char.style.backgroundColor = color;\r
\r
    document.getElementById('unicode').innerText = char;\r
    document.getElementById('url').href = fonturl;\r
    document.getElementById('alturl').href = alturl;\r
    document.getElementById('fontpage').href = data.officialurl;\r
\r
    // fill out the template code with information from the selected node\r
    templates = TEMPLATE.replaceAll('{FONTNAME}', fontname)\r
      .replaceAll('{CHAR}', char)\r
      .replaceAll('{FONTURL}', fonturl)\r
      .replaceAll('{COLOR}', color)\r
      .replaceAll('{ALTLINK}', alturl)\r
      .replaceAll('{SPACING}', f.spaceingBelow)\r
      .split('\\n\\n');\r
\r
    document.getElementById('codeBox1').textContent = templates[0];\r
    document.getElementById('codeBox2').textContent = templates[1];\r
    document.getElementById('codeBox3').textContent = templates[2];\r
    document.getElementById('codeBox4a').textContent = templates[3];\r
    document.getElementById('codeBox4b').textContent = templates[4];\r
    const box4b = document.getElementById('codeBox4b');\r
    if (window.Prism) {\r
      // Give the code syntax highlighting\r
      window.Prism.highlightAll();\r
    }\r
  }\r
\r
  function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'animationManager.isEnabled': true,\r
      'animationManager.initialAnimationStyle': go.AnimationStyle.None,\r
      'dragSelectingTool.isEnabled': false,\r
      'undoManager.isEnabled': false,\r
      'panningTool.isEnabled': false,\r
      'toolManager.mouseWheelBehavior': 'none',\r
      isReadOnly: true,\r
      allowZoom: false,\r
\r
      // pack the Nodes together\r
      layout: new go.GridLayout({ spacing: new go.Size(0, 0) })\r
    });\r
\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', {\r
          selectionAdorned: false,\r
          mouseEnter: (e, obj) => {\r
            // lighten the Node on hover\r
            if (obj.part.isSelected) return;\r
            let br = new go.Brush(myDiagram.model.modelData.color);\r
            br.lightenBy(0.1);\r
            obj.part.elt(0).fill = br.color;\r
          },\r
          mouseLeave: (e, obj) => {\r
            if (obj.part.isSelected) return;\r
            obj.part.elt(0).fill = myDiagram.model.modelData.color;\r
          }\r
        })\r
        .add(\r
          new go.Shape('RoundedRectangle', {\r
              strokeWidth: 0,\r
              width: 56,\r
              height: 56\r
            })\r
            .trigger(  // animate the color change\r
              new go.AnimationTrigger('fill', { duration: 200 })\r
            )\r
            .bindObject('fill', 'isSelected', (isSelected, obj) => {\r
              return !isSelected ? myDiagram.model.modelData.color : 'white';\r
            }),\r
          new go.TextBlock({ margin: 8, font: 'bold 14px sans-serif', stroke: '#333' })\r
            .bind('text')\r
            .bind('font')\r
            .bind('spacingBelow', 'spacing')\r
        );\r
\r
    // add all font options to drop down\r
    let fontSelector = document.getElementById('fontSelector');\r
    Fonts.forEach((f, i) => {\r
      let opt = document.createElement('option');\r
      opt.innerText = f.name;\r
      opt.value = i;\r
      if (i == 0) fontSelector.value = opt.value;\r
      fontSelector.appendChild(opt);\r
    });\r
\r
    changeFont();\r
    myDiagram.addDiagramListener('ObjectSingleClicked', updateSelection);\r
  }\r
\r
  document.addEventListener('DOMContentLoaded', () => {\r
    let n_loaded = 0;\r
\r
    Fonts.forEach(f => {\r
      // load each fonts\r
      new FontFace(f.name, \`url(\${f.url})\`).load().then(\r
        font => {\r
          document.fonts.add(font);\r
\r
          // call init once all fonts have been loaded\r
          if (++n_loaded == Fonts.length) {\r
            init();\r
          }\r
        },\r
        err => {\r
          console.error(f.name + '\\n' + err);\r
        }\r
      );\r
    });\r
  });`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    This <a>Diagram</a> uses custom icon fonts in <a>TextBlock</a>s to display symbols.\r
    Alternatively this could be done using SVG <a>Shape</a>s, which can be seen in the\r
    <a href="icons">Icons sample</a>.\r
  </p>\r
  <p>\r
    There are a few example fonts in this page -- to switch between them use the dropdown above\r
    the <a>Diagram</a>.\r
    To see all of the icons available in the <i>Google Material</i> font, visit\r
    <a href="https://fonts.google.com/icons">fonts.google.com/icons</a>.\r
    For <i>Font Awesome</i>, visit\r
    <a href="https://fontawesome.com/search">fontawesome.com/search</a>.\r
    For <i>Phosphor Icons</i>, visit <a href="https://phosphoricons.com/">phosphoricons.com</a>.\r
  </p>\r
  <p>\r
    When clicking on these <a>Node</a>s some sample code will be generated\r
    showing how these fonts can be used in your own <a>Diagram</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`svg`,`gridlayout`,`animation`];var g=y();l(`wkbsry`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};