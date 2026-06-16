import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Decision Tree Diagram Incrementally User-Expanded`,titleShort:`Decision Tree`,indexDescription:`Allows a user to make progressive decisions.`,screenshot:`decisiontree`,priority:2,tags:[`treelayout`,`tooltips`,`buttons`],description:`Interactive decision diagram with automatic expansion as the user makes choices.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 500px"></div>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      initialContentAlignment: go.Spot.Left,\r
      toolTipDuration: Infinity, // allow people to read the tool tips for as long as they want\r
      allowSelect: false, // the user cannot select any part\r
      // create a TreeLayout for the decision tree\r
      layout: new go.TreeLayout({ arrangement: go.TreeArrangement.FixedRoots })\r
    });\r
\r
    // custom behavior for expanding/collapsing half of the subtree from a node\r
    function buttonExpandCollapse(e, port) {\r
      var node = port.part;\r
      node.diagram.startTransaction('expand/collapse');\r
      var portid = port.portId;\r
      node.findLinksOutOf(portid).each(l => {\r
        if (l.visible) {\r
          // collapse whole subtree recursively\r
          collapseTree(node, portid);\r
        } else {\r
          // only expands immediate children and their links\r
          l.visible = true;\r
          var n = l.getOtherNode(node);\r
          if (n !== null) {\r
            n.location = node.getDocumentPoint(go.Spot.TopRight);\r
            n.visible = true;\r
          }\r
        }\r
      });\r
      myDiagram.toolManager.hideToolTip();\r
      node.diagram.commitTransaction('expand/collapse');\r
    }\r
\r
    // recursive function for collapsing complete subtree\r
    function collapseTree(node, portid) {\r
      node.findLinksOutOf(portid).each(l => {\r
        l.visible = false;\r
        var n = l.getOtherNode(node);\r
        if (n !== null) {\r
          n.visible = false;\r
          collapseTree(n, null); // null means all links, not just for a particular portId\r
        }\r
      });\r
    }\r
\r
    // get the text for the tooltip from the data on the object being hovered over\r
    function tooltipTextConverter(data) {\r
      var str = '';\r
      var e = myDiagram.lastInput;\r
      var currobj = e.targetObject;\r
      if (currobj !== null && (currobj.name === 'ButtonA' || (currobj.panel !== null && currobj.panel.name === 'ButtonA'))) {\r
        str = data.aToolTip;\r
      } else {\r
        str = data.bToolTip;\r
      }\r
      return str;\r
    }\r
\r
    // define tooltips for buttons\r
    var tooltipTemplate =\r
      go.GraphObject.build('ToolTip', {\r
          'Border.fill': 'whitesmoke',\r
          'Border.stroke': 'lightgray'\r
        })\r
        .add(\r
          new go.TextBlock({\r
              font: '8pt Roboto, sans-serif',\r
              wrap: go.Wrap.Fit,\r
              desiredSize: new go.Size(200, NaN),\r
              alignment: go.Spot.Center,\r
              margin: 6\r
            })\r
            .bind('text', '', tooltipTextConverter)\r
        );\r
\r
    // define the Node template for non-leaf nodes\r
    myDiagram.nodeTemplateMap.add('decision',\r
      new go.Node('Auto')\r
        .bind('text', 'key')\r
        // define the node's outer shape, which will surround the Horizontal Panel\r
        .add(\r
          new go.Shape('Rectangle', { fill: 'whitesmoke', stroke: 'lightgray' }),\r
          // define a horizontal Panel to place the node's text alongside the buttons\r
          new go.Panel('Horizontal')\r
            .add(\r
              new go.TextBlock({ font: '30px Roboto, sans-serif', margin: 5 })\r
                .bind('text', 'key'),\r
              // define a vertical panel to place the node's two buttons one above the other\r
              new go.Panel('Vertical', { defaultStretch: go.Stretch.Fill, margin: 3 })\r
                .add(\r
                  go.GraphObject.build('Button', { // button A\r
                      name: 'ButtonA',\r
                      click: buttonExpandCollapse,\r
                      toolTip: tooltipTemplate\r
                    })\r
                    .bind('portId', 'a')\r
                    .add(\r
                      new go.TextBlock({ font: '900 16px Roboto, sans-serif' })\r
                        .bind('text', 'aText')\r
                    ), // end button A\r
                  go.GraphObject.build('Button', { // button B\r
                      name: 'ButtonB',\r
                      click: buttonExpandCollapse,\r
                      toolTip: tooltipTemplate\r
                    })\r
                    .bind('portId', 'b')\r
                    .add(\r
                      new go.TextBlock({ font: '900 16px Roboto, sans-serif' })\r
                        .bind('text', 'bText')\r
                    ) // end button B\r
                ) // end Vertical Panel\r
            ) // end Horizontal Panel\r
        )); // end Node and call to add\r
\r
    // define the Node template for leaf nodes\r
    myDiagram.nodeTemplateMap.add('personality',\r
      new go.Node('Auto')\r
        .bind('text', 'key')\r
        .add(\r
          new go.Shape('Rectangle', { fill: 'whitesmoke', stroke: 'lightgray' }),\r
          new go.TextBlock({\r
              font: '13px Roboto, sans-serif',\r
              wrap: go.Wrap.Fit,\r
              desiredSize: new go.Size(200, NaN),\r
              margin: 5\r
            })\r
            .bind('text', 'text')\r
        ));\r
\r
    // define the only Link template\r
    myDiagram.linkTemplate =\r
      new go.Link({ routing: go.Routing.Orthogonal, fromPortId: '' }) // the whole link panel\r
        .bind('fromPortId', 'fromport')\r
        .add(\r
          new go.Shape({ stroke: 'lightblue', strokeWidth: 2 }) // the link shape\r
        );\r
\r
    // create the model for the decision tree\r
    var model = new go.GraphLinksModel({ linkFromPortIdProperty: 'fromport' });\r
    // set up the model with the node and link data\r
    makeNodes(model);\r
    makeLinks(model);\r
    myDiagram.model = model;\r
\r
    // make all but the start node invisible\r
    myDiagram.nodes.each(n => {\r
      if (n.text !== 'Start') n.visible = false;\r
    });\r
    myDiagram.links.each(l => {\r
      l.visible = false;\r
    });\r
  }\r
\r
  function makeNodes(model) {\r
    var nodeDataArray = [\r
      { key: 'Start' }, // the root node\r
\r
      // intermediate nodes: decisions on personality characteristics\r
      { key: 'I' },\r
      { key: 'E' },\r
\r
      { key: 'IN' },\r
      { key: 'IS' },\r
      { key: 'EN' },\r
      { key: 'ES' },\r
\r
      { key: 'INT' },\r
      { key: 'INF' },\r
      { key: 'IST' },\r
      { key: 'ISF' },\r
      { key: 'ENT' },\r
      { key: 'ENF' },\r
      { key: 'EST' },\r
      { key: 'ESF' },\r
\r
      // terminal nodes: the personality descriptions\r
      {\r
        key: 'INTJ',\r
        text: 'INTJ: Scientist\\nThe most self-confident of all types.  They focus on possibilities and use empirical logic to think about the future.  They prefer that events and people serve some positive use.  1% of population.'\r
      },\r
      {\r
        key: 'INTP',\r
        text: 'INTP: Architect\\nAn architect of ideas, number systems, computer languages, and many other concepts.  They exhibit great precision in thought and language.  1% of the population.'\r
      },\r
      {\r
        key: 'INFJ',\r
        text: 'INFJ: Author\\nFocus on possibilities.  Place emphasis on values and come to decisions easily.  They have a strong drive to contribute to the welfare of others.  1% of population.'\r
      },\r
      {\r
        key: 'INFP',\r
        text: 'INFP: Questor\\nPresent a calm and pleasant face to the world.  Although they seem reserved, they are actually very idealistic and care passionately about a few special people or a cause.  1% of the population.'\r
      },\r
      {\r
        key: 'ISTJ',\r
        text: 'ISTJ: Trustee\\nISTJs like organized lives. They are dependable and trustworthy, as they dislike chaos and work on a task until completion. They prefer to deal with facts rather than emotions. 6% of the population.'\r
      },\r
      {\r
        key: 'ISTP',\r
        text: 'ISTP: Artisan\\nISTPs are quiet people who are very capable at analyzing how things work. Though quiet, they can be influential, with their seclusion making them all the more skilled. 17% of the population.'\r
      },\r
      {\r
        key: 'ISFJ',\r
        text: 'ISFJ: Conservator\\nISFJs are not particularly social and tend to be most concerned with maintaining order in their lives. They are dutiful, respectful towards, and interested in others, though they are often shy. They are, therefore, trustworthy, but not bossy. 6% of the population.'\r
      },\r
      {\r
        key: 'ISFP',\r
        text: 'ISFP: Author\\nFocus on possibilities.  Place emphasis on values and come to decisions easily.  They have a strong drive to contribute to the welfare of others.  1% of population.'\r
      },\r
      {\r
        key: 'ENTJ',\r
        text: 'ENTJ: Fieldmarshal\\nThe driving force of this personality is to lead.  They like to impose structure and harness people to work towards distant goals.  They reject inefficiency.  5% of the population.'\r
      },\r
      {\r
        key: 'ENTP',\r
        text: 'ENTP: Inventor\\nExercise their ingenuity by dealing with social, physical, and mechanical relationships.  They are always sensitive to future possibilities.  5% of the population.'\r
      },\r
      {\r
        key: 'ENFJ',\r
        text: 'ENFJ: Pedagogue\\nExcellent leaders; they are charismatic and never doubt that others will follow them and do as they ask.   They place a high value on cooperation.  5% of the population.'\r
      },\r
      {\r
        key: 'ENFP',\r
        text: 'ENFP: Journalist\\nPlace significance in everyday occurrences.  They have great ability to understand the motives of others.  They see life as a great drama.  They have a great impact on others.  5% of the population.'\r
      },\r
      {\r
        key: 'ESTJ',\r
        text: 'ESTJ: Administrator\\nESTJs are pragmatic, and thus well-suited for business or administrative roles. They are traditionalists and conservatives, believing in the status quo. 13% of the population.'\r
      },\r
      {\r
        key: 'ESTP',\r
        text: 'ESTP: Promoter\\nESTPs tend to manipulate others in order to attain access to the finer aspects of life. However, they enjoy heading to such places with others. They are social and outgoing and are well-connected. 13% of the population.'\r
      },\r
      {\r
        key: 'ESFJ',\r
        text: 'ESFJ: Seller\\nESFJs tend to be social and concerned for others. They follow tradition and enjoy a structured community environment. Always magnanimous towards others, they expect the same respect and appreciation themselves. 13% of the population.'\r
      },\r
      {\r
        key: 'ESFP',\r
        text: 'ESFP: Entertainer\\nThe mantra of the ESFP would be "Carpe Diem." They enjoy life to the fullest. They do not, thus, like routines and long-term goals. In general, they are very concerned with others and tend to always try to help others, often perceiving well their needs. 13% of the population.'\r
      }\r
    ];\r
\r
    // Provide the same choice information for all of the nodes on each level.\r
    // The level is implicit in the number of characters in the Key, except for the root node.\r
    // In a different application, there might be different choices for each node, so the initialization would be above, where the Info's are created.\r
    // But for this application, it makes sense to share the initialization code based on tree level.\r
    for (var i = 0; i < nodeDataArray.length; i++) {\r
      var d = nodeDataArray[i];\r
      if (d.key === 'Start') {\r
        d.category = 'decision';\r
        d.a = 'I';\r
        d.aText = 'Introversion';\r
        d.aToolTip =\r
          'The Introvert is “territorial” and desires space and solitude to recover energy.  Introverts enjoy solitary activities such as reading and meditating.  25% of the population.';\r
        d.b = 'E';\r
        d.bText = 'Extraversion';\r
        d.bToolTip =\r
          'The Extravert is “sociable” and is energized by the presence of other people.  Extraverts experience loneliness when not in contact with others.  75% of the population.';\r
      } else {\r
        switch (d.key.length) {\r
          case 1:\r
            d.category = 'decision';\r
            d.a = 'N';\r
            d.aText = 'Intuition';\r
            d.aToolTip =\r
              'The “intuitive” person bases their lives on predictions and ingenuity.  They consider the future and enjoy planning ahead.  25% of the population.';\r
            d.b = 'S';\r
            d.bText = 'Sensing';\r
            d.bToolTip =\r
              'The “sensing” person bases their life on facts, thinking primarily of their present situation.  They are realistic and practical.  75% of the population.';\r
            break;\r
          case 2:\r
            d.category = 'decision';\r
            d.a = 'T';\r
            d.aText = 'Thinking';\r
            d.aToolTip =\r
              'The “thinking” person bases their decisions on facts and without personal bias.  They are more comfortable with making impersonal judgments.  50% of the population.';\r
            d.b = 'F';\r
            d.bText = 'Feeling';\r
            d.bToolTip =\r
              'The “feeling” person bases their decisions on personal experience and emotion.  They make their emotions very visible.  50% of the population.';\r
            break;\r
          case 3:\r
            d.category = 'decision';\r
            d.a = 'J';\r
            d.aText = 'Judgment';\r
            d.aToolTip =\r
              'The “judging” person enjoys closure.  They establish deadlines and take them seriously.  They despise being late.  50% of the population.';\r
            d.b = 'P';\r
            d.bText = 'Perception';\r
            d.bToolTip =\r
              'The “perceiving” person likes to keep options open and fluid.  They have little regard for deadlines.  Dislikes making decisions unless they are completely sure they are right.  50% of the population.';\r
            break;\r
          default:\r
            d.category = 'personality';\r
            break;\r
        }\r
      }\r
    }\r
    model.nodeDataArray = nodeDataArray;\r
  }\r
\r
  // The key strings implicitly hold the relationship information, based on their spellings.\r
  // Other than the root node ("Start"), each node's key string minus its last letter is the\r
  // key to the "parent" node.\r
  function makeLinks(model) {\r
    var linkDataArray = [];\r
    var nda = model.nodeDataArray;\r
    for (var i = 0; i < nda.length; i++) {\r
      var key = nda[i].key;\r
      if (key === 'Start' || key.length === 0) continue;\r
      // e.g., if key=="INTJ", we want: prefix="INT" and letter="J"\r
      var prefix = key.slice(0, key.length - 1);\r
      var letter = key.charAt(key.length - 1);\r
      if (prefix.length === 0) prefix = 'Start';\r
      var obj = { from: prefix, fromport: letter, to: key };\r
      linkDataArray.push(obj);\r
    }\r
    model.linkDataArray = linkDataArray;\r
  }\r
\r
  window.addEventListener('DOMContentLoaded', () => {\r
    const roboto = new FontFace("Roboto", "url(https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff)");\r
    document.fonts.add(roboto);\r
    // wait for the Roboto font to load before actually loading the diagram\r
    roboto.load().then(() => init());\r
  });`,cssCode:``,externalStyles:[],externalScripts:[],descriptionHtml:`<p>This sample allows a user to make progressive decisions about personality types.</p>\r
  <p>\r
    There are two kinds of nodes, so there are two node templates ("decision" and "personality") that determine the appearance and behavior of each <a>Node</a>.\r
  </p>\r
  <p>\r
    The "decision" template displays the abbreviated personality type and two choice buttons, all surrounded by a figure. Clicking a button will either expand\r
    the choice or will collapse all nodes leading from that choice.\r
  </p>\r
  <p>The "personality" template displays the personality descriptions, as the "leaf" nodes for the tree.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`treelayout`,`tooltips`,`buttons`];var g=y();l(`1ddanzj`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};