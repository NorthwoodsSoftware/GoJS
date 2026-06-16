import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Tournament Bracket Diagram with Automatic Computations`,titleShort:`Tournament Bracket`,indexDescription:`Tournament bracket with dynamic advancement as scores are entered.`,screenshot:`tournament`,priority:2,tags:[`tables`,`treelayout`],description:`A tournament or bracket diagram, with automatic promotion as results are entered interactively.`},htmlContent:`<!-- The DIV for the Diagram needs an explicit size or else we won't see anything.\r
       Also add a border to help see the edges. -->\r
  <div id="myDiagramDiv" style="border: solid 1px black; background: #4d4d4d; width: 100%; height: 600px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      'textEditingTool.starting': go.TextEditingStarting.SingleClick,\r
      'textEditingTool.textValidation': isValidScore,\r
      layout: new go.TreeLayout({ angle: 180 }),\r
      'undoManager.isEnabled': true\r
    });\r
\r
    // validation function for editing text\r
    function isValidScore(textblock, oldstr, newstr) {\r
      if (newstr === '') return true;\r
      var num = parseInt(newstr, 10);\r
      return !isNaN(num) && num >= 0 && num < 1000;\r
    }\r
\r
    // define a simple Node template\r
    myDiagram.nodeTemplate =\r
      new go.Node('Auto', { selectable: false })\r
        .add(\r
          new go.Shape('Rectangle', { fill: '#8C8C8C', stroke: null })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.Panel('Table')\r
            .addColumnDefinition(0, { separatorStroke: 'black' })\r
            .addColumnDefinition(1, { separatorStroke: 'black', background: '#BABABA' })\r
            .addRowDefinition(0, { separatorStroke: 'black' })\r
            .addRowDefinition(1, { separatorStroke: 'black' })\r
            .add(\r
              new go.TextBlock('', {\r
                  row: 0,\r
                  wrap: go.Wrap.None,\r
                  margin: 5,\r
                  width: 90,\r
                  isMultiline: false,\r
                  textAlign: 'left',\r
                  font: '10pt  Segoe UI,sans-serif',\r
                  stroke: 'white'\r
                })\r
                .bindTwoWay('text', 'player1'),\r
              new go.TextBlock('', {\r
                  row: 1,\r
                  wrap: go.Wrap.None,\r
                  margin: 5,\r
                  width: 90,\r
                  isMultiline: false,\r
                  textAlign: 'left',\r
                  font: '10pt  Segoe UI,sans-serif',\r
                  stroke: 'white'\r
                })\r
                .bindTwoWay('text', 'player2'),\r
              new go.TextBlock('', {\r
                  column: 1,\r
                  row: 0,\r
                  wrap: go.Wrap.None,\r
                  margin: 2,\r
                  width: 25,\r
                  isMultiline: false,\r
                  editable: true,\r
                  textAlign: 'center',\r
                  font: '10pt  Segoe UI,sans-serif',\r
                  stroke: 'black'\r
                })\r
                .bindTwoWay('text', 'score1'),\r
              new go.TextBlock('', {\r
                  column: 1,\r
                  row: 1,\r
                  wrap: go.Wrap.None,\r
                  margin: 2,\r
                  width: 25,\r
                  isMultiline: false,\r
                  editable: true,\r
                  textAlign: 'center',\r
                  font: '10pt  Segoe UI,sans-serif',\r
                  stroke: 'black'\r
                })\r
                .bindTwoWay('text', 'score2')\r
            )\r
        );\r
\r
    // define the Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, selectable: false })\r
        .add(\r
          new go.Shape({ strokeWidth: 2, stroke: 'white' })\r
        );\r
\r
    // Generates the original graph from an array of player names\r
    function createPairs(players) {\r
      if (players.length % 2 !== 0) players.push('(empty)');\r
      var startingGroups = players.length / 2;\r
      var currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));\r
      var levelGroups = [];\r
      var currentLevel = Math.ceil(Math.log(startingGroups) / Math.log(2));\r
      for (var i = 0; i < startingGroups; i++) {\r
        levelGroups.push(currentLevel + '-' + i);\r
      }\r
      var totalGroups = [];\r
      makeLevel(levelGroups, currentLevel, totalGroups, players);\r
      return totalGroups;\r
    }\r
\r
    function makeLevel(levelGroups, currentLevel, totalGroups, players) {\r
      currentLevel--;\r
      var len = levelGroups.length;\r
      var parentKeys = [];\r
      var parentNumber = 0;\r
      var p = '';\r
      for (var i = 0; i < len; i++) {\r
        if (parentNumber === 0) {\r
          p = currentLevel + '-' + parentKeys.length;\r
          parentKeys.push(p);\r
        }\r
\r
        if (players !== null) {\r
          var p1 = players[i * 2];\r
          var p2 = players[i * 2 + 1];\r
          totalGroups.push({\r
            key: levelGroups[i],\r
            parent: p,\r
            player1: p1,\r
            player2: p2,\r
            parentNumber: parentNumber\r
          });\r
        } else {\r
          totalGroups.push({ key: levelGroups[i], parent: p, parentNumber: parentNumber });\r
        }\r
\r
        parentNumber++;\r
        if (parentNumber > 1) parentNumber = 0;\r
      }\r
\r
      // after the first created level there are no player names\r
      if (currentLevel >= 0) makeLevel(parentKeys, currentLevel, totalGroups, null);\r
    }\r
\r
    function updateNode(data) {\r
      if (isNaN(data.score1) || isNaN(data.score2)) return;\r
\r
      // TODO: What happens if score1 and score2 are the same number?\r
\r
      // both score1 and score2 are numbers,\r
      // set the name of the higher-score'd player in the advancing (parent) node\r
      // if the data.parentNumber is 0, then we set player1 on the parent\r
      // if the data.parentNumber is 1, then we set player2\r
      var parent = myDiagram.findNodeForKey(data.parent);\r
      if (parent === null) return;\r
\r
      var playerName = parseInt(data.score1) > parseInt(data.score2) ? data.player1 : data.player2;\r
      if (parseInt(data.score1) === parseInt(data.score2)) playerName = '';\r
      myDiagram.model.set(parent.data, data.parentNumber === 0 ? 'player1' : 'player2', playerName);\r
\r
      updateNode(parent.data); // go up the tree propagating changes\r
    }\r
\r
    function makeModel(players) {\r
      var model = new go.TreeModel(createPairs(players));\r
\r
      model.addChangedListener(e => {\r
        if (e.propertyName !== 'score1' && e.propertyName !== 'score2') return;\r
        updateNode(e.object);\r
      });\r
\r
      myDiagram.model = model;\r
\r
      // provide initial scores for at most three pairings\r
      for (var i = 0; i < Math.min(3, model.nodeDataArray.length); i++) {\r
        var d = model.nodeDataArray[i];\r
        if (d.player1 && d.player2) {\r
          // TODO: doesn't prevent tie scores\r
          model.set(d, 'score1', Math.floor(Math.random() * 100));\r
          model.set(d, 'score2', Math.floor(Math.random() * 100));\r
        }\r
      }\r
    }\r
\r
    makeModel(['Adler', 'Pollock', 'Montgomery', 'Lestrade', 'Wilson', 'Moran', 'Bardle', 'Edwards']);\r
  } // end init\r
  window.addEventListener('DOMContentLoaded', init);`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>\r
    Click on the empty score boxes next to names to fill in scores for each player. The scores must be non-negative numbers with at most 3 digits. Scores are\r
    validated using a <a>TextEditingTool.textValidation</a> function. When two players in a "game" have a score, one of them will automatically advance to the\r
    next round of the bracket.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`];var g=y();l(`1p29yvg`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};