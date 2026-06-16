import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Interactive Voice Response Tree Diagram with Collapsible List of Details`,titleShort:`IVR Tree Diagram`,indexDescription:`Diagram representation of an Interactive Voice Response Tree (IVR tree). Nodes may have a collapsible list of details.`,screenshot:`ivrtree`,priority:2,tags:[`tables`,`itemarrays`,`treelayout`,`buttons`,`theme`],description:`An IVR (Interactive Voice Response) diagram showing a call-menu tree with various prompts and responses.`},htmlContent:`<div id="myDiagramDiv" style="border: solid 1px black; width: 100%; height: 500px"></div>\r
  Theme:\r
  <select id="theme" onchange="changeTheme()">\r
    <option value="system">System</option>\r
    <option value="light">Light</option>\r
    <option value="dark">Dark</option>\r
  </select>\r
  Screen Reader: <output id="screenreader"></output>`,jsCode:`function init() {\r
    myDiagram = new go.Diagram('myDiagramDiv', {\r
      allowCopy: false,\r
      'draggingTool.dragsTree': true,\r
      'commandHandler.deletesTree': true,\r
      'commandHandler.liveElementId': 'screenreader',\r
      'commandHandler.focusChanged': (oldfocus, newfocus, cmd) => updateFocus(newfocus, oldfocus),\r
      'TreeCollapsed': e => updateFocus(e.subject.first().findObject('TreeExpander')),\r
      'TreeExpanded': e => updateFocus(e.subject.first().findObject('TreeExpander')),\r
      'Changed': e => { // there's no DiagramEvent for 'PanelExpanderButton' actions\r
        if (e.change === go.ChangeType.Property && e.object.name === 'COLLAPSIBLE' && e.propertyName === 'visible') {\r
          updateFocus(e.object.part.findObject('PanelExpander'));\r
        }\r
      },\r
      layout: new go.TreeLayout({ angle: 90, arrangement: go.TreeArrangement.FixedRoots }),\r
      'undoManager.isEnabled': true,\r
      // use "Modern" themes from extensions/Themes\r
      'themeManager.themeMap': new go.Map([\r
        { key: 'light', value: Modern },\r
        { key: 'dark', value: ModernDark }\r
      ]),\r
      'themeManager.changesDivBackground': true,\r
      'themeManager.currentTheme': document.getElementById('theme').value\r
    });\r
\r
    function updateFocus(newfocus, oldfocus) {\r
      const cmd = myDiagram.commandHandler;\r
      if (!newfocus) newfocus = cmd.focus;\r
      if (!oldfocus) oldfocus = null;\r
      let msg = '';\r
      if (newfocus instanceof go.Link) {\r
        msg = cmd.describe(oldfocus, newfocus);\r
      } else {\r
        const node = (newfocus && !(newfocus instanceof go.Node) && newfocus.part instanceof go.Node) ? newfocus.part : null;\r
        if (newfocus instanceof go.Node) {\r
          msg = newfocus.data.question || newfocus.data.text;\r
          if (Array.isArray(newfocus.data.actions) && newfocus.data.actions.length > 0) {\r
            msg += '. Choices: ' + newfocus.data.actions.map(act => act.text).join(', ');\r
          }\r
        } else if (newfocus && newfocus.name === 'PanelExpander') {\r
          msg = 'Button: ' + (newfocus.part.findObject('COLLAPSIBLE').visible ? 'Collapse' : 'Expand') + ' list of choices';\r
          if (node) msg += '. Type Escape to focus on ' + (node.data.question || node.data.text);\r
        } else if (newfocus && newfocus.name === 'TreeExpander') {\r
          msg = 'Button: ' + (newfocus.part.isTreeExpanded ? 'Collapse' : 'Expand') + ' subtree of choices or people';\r
          if (node) msg += '. Type Escape to focus on ' + (node.data.question || node.data.text);\r
        }\r
      }\r
      // normal use of the <span> holding content that is read aloud:\r
      const screenreader = document.getElementById('screenreader');\r
      if (screenreader) screenreader.textContent = msg;\r
    }\r
\r
    myDiagram.themeManager.set('', {\r
      colors: {\r
        primary: '#155e75',\r
        terminal: '#047857'\r
      }\r
    });\r
\r
    // when the document is modified, add a "*" to the title and enable the "Save" button\r
    myDiagram.addDiagramListener('Modified', e => {\r
      const button = document.getElementById('SaveButton');\r
      if (button) button.disabled = !myDiagram.isModified;\r
      const idx = document.title.indexOf('*');\r
      if (myDiagram.isModified) {\r
        if (idx < 0) document.title += '*';\r
      } else {\r
        if (idx >= 0) document.title = document.title.slice(0, idx);\r
      }\r
    });\r
\r
    go.Shape.defineFigureGenerator('Van', (shape, w, h) => {\r
      var geo = go.Geometry.parse(\r
        'M37.409,18.905l-4.946-7.924c-0.548-0.878-1.51-1.411-2.545-1.411H3c-1.657,0-3,1.343-3,3v16.86c0,1.657,1.343,3,3,3h0.787 c0.758,1.618,2.391,2.75,4.293,2.75s3.534-1.132,4.292-2.75h20.007c0.758,1.618,2.391,2.75,4.293,2.75 c1.9,0,3.534-1.132,4.291-2.75h0.787c1.656,0,3-1.343,3-3v-2.496C44.75,22.737,41.516,19.272,37.409,18.905z M8.087,32.395 c-1.084,0-1.963-0.879-1.963-1.963s0.879-1.964,1.963-1.964s1.963,0.88,1.963,1.964S9.171,32.395,8.087,32.395z M26.042,21.001 V15.57v-2.999h3.876l5.264,8.43H26.042z M36.671,32.395c-1.084,0-1.963-0.879-1.963-1.963s0.879-1.964,1.963-1.964 s1.963,0.88,1.963,1.964S37.755,32.395,36.671,32.395z'\r
      );\r
      return geo.scale(w / geo.bounds.width, h / geo.bounds.height);\r
    });\r
    go.Shape.defineFigureGenerator('SUV', (shape, w, h) => {\r
      var geo = go.Geometry.parse(\r
        'M246,90.011V59.995c0-5.523-4.48-9.995-10-9.995h-50L156.97,6.416C155.11,3.634,152.34,2,149,2H28 c-5.52,0-10,4.446-10,9.969V30h-8c-4.42,0-8,3.56-8,7.983v40.022C2,82.427,5.58,86,10,86h8v20h16.458 c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958c2.8-15.959,16.764-28.066,33.524-28.066 c16.75,0,30.624,12.107,33.434,28.066H250c4.42,0,8-3.563,8-7.985v-8.004H246z M86,50H30V13.97h56V50z M98,50V13.97h48L170,50H98z M68,138c-14.336,0-26.083-11.706-26.083-26.051s11.664-26.014,26-26.014s26,11.669,26,26.014S82.336,138,68,138z M67.917,99.943 c-6.617,0-12,5.386-12,12.006c0,6.621,5.383,12.006,12,12.006s12-5.386,12-12.006C79.917,105.329,74.534,99.943,67.917,99.943z M208,138c-14.337,0-26.083-11.706-26.083-26.051s11.663-26.014,26-26.014s26,11.669,26,26.014S222.337,138,208,138z M207.917,99.943c-6.617,0-12,5.386-12,12.006c0,6.621,5.383,12.006,12,12.006s12-5.386,12-12.006 C219.917,105.329,214.534,99.943,207.917,99.943z'\r
      );\r
      return geo.scale(w / geo.bounds.width, h / geo.bounds.height);\r
    });\r
    go.Shape.defineFigureGenerator('Hammer', (shape, w, h) => {\r
      var geo = go.Geometry.parse(\r
        'M19 5.5a4.5 4.5 0 01-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 11-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 015.873-4.575c.324.105.39.51.15.752L13.34 4.66a.455.455 0 00-.11.494 3.01 3.01 0 001.617 1.617c.17.07.363.02.493-.111l2.692-2.692c.241-.241.647-.174.752.15.14.435.216.9.216 1.382zM4 17a1 1 0 100-2 1 1 0 000 2z'\r
      );\r
      return geo.scale(w / geo.bounds.width, h / geo.bounds.height);\r
    });\r
\r
    // each action is represented by a shape and some text\r
    var actionTemplate =\r
      new go.Panel('TableRow')\r
        .add(\r
          new go.Shape({ column: 0, width: 20, height: 20, fill: null })\r
            .bind('figure')\r
            .theme('stroke', 'text'),\r
          new go.TextBlock({ column: 1, font: '11pt Verdana, sans-serif' })\r
            .bind('text')\r
            .theme('stroke', 'text'),\r
          new go.TextBlock({ column: 2, font: '11pt Verdana, sans-serif' })\r
            .bindObject('text', 'itemIndex', i => \`[\${i}]\`)\r
            .theme('stroke', 'text')\r
        );\r
\r
    // each regular Node has body consisting of a title followed by a collapsible list of actions,\r
    // controlled by a PanelExpanderButton, with a TreeExpanderButton underneath the body\r
    myDiagram.nodeTemplate = // the default node template\r
      new go.Node('Vertical', {\r
          selectionObjectName: 'BODY',\r
          locationSpot: go.Spot.Top  // centered vertically, aligned at top horizontally\r
        })\r
        // the main "BODY" consists of a RoundedRectangle surrounding nested Panels\r
        .bindTwoWay('isTreeExpanded') // remember the expansion state for\r
        .bindTwoWay('wasTreeExpanded') //   when the model is re-loaded\r
        .add(\r
          new go.Panel('Auto', { name: 'BODY' })\r
            .add(\r
              new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
                .theme('fill', 'primary'),\r
              new go.Panel('Vertical', { margin: 3 })\r
                .add(\r
                  // the title\r
                  new go.TextBlock({\r
                      stretch: go.Stretch.Horizontal,\r
                      font: 'bold 12pt Verdana, sans-serif',\r
                      stroke: 'white'\r
                    })\r
                    .bind('text', 'question'),\r
                  // the optional list of actions\r
                  new go.Panel('Vertical', {\r
                      stretch: go.Stretch.Horizontal,\r
                      visible: false\r
                    }) // not visible unless there is at least one action\r
                    .bind('visible', 'actions', acts => Array.isArray(acts) && acts.length > 0)\r
                    .add(\r
                      // headered by a label and a PanelExpanderButton inside a Table\r
                      new go.Panel('Table', { stretch: go.Stretch.Horizontal })\r
                        .add(\r
                          new go.TextBlock('Choices', {\r
                            alignment: go.Spot.Left,\r
                            font: '10pt Verdana, sans-serif',\r
                            stroke: 'white'\r
                          }),\r
                          go.GraphObject.build('PanelExpanderButton', {\r
                              name: 'PanelExpander',\r
                              column: 1,\r
                              alignment: go.Spot.Right,\r
                              'ButtonIcon.stroke': 'white'\r
                            },\r
                            'COLLAPSIBLE') // name of the object to make visible or invisible\r
                        ), // end Table panel\r
                      // with the list data bound in the Table Panel\r
                      new go.Panel('Table', {\r
                          name: 'COLLAPSIBLE', // identify to the PanelExpanderButton\r
                          padding: 2,\r
                          stretch: go.Stretch.Horizontal, // take up whole available width\r
                          defaultAlignment: go.Spot.Left, // thus no need to specify alignment on each element\r
                          defaultSeparatorPadding: 3,\r
                          itemTemplate: actionTemplate // the Panel created for each item in Panel.itemArray\r
                        })\r
                        .theme('background', 'div')\r
                        .bind('itemArray', 'actions')\r
                        // bind Panel.itemArray to nodedata.actions\r
                    ) // end optional Vertical Panel\r
                ) // end outer Vertical Panel\r
            ), // end "BODY"  Auto Panel\r
          new go.Panel({ // this is underneath the "BODY"\r
              height: 17 // always this height, even if the TreeExpanderButton is not visible\r
            })\r
            .add(go.GraphObject.build('TreeExpanderButton', { name: 'TreeExpander' }))\r
        );\r
\r
    // define a second kind of Node:\r
    myDiagram.nodeTemplateMap.add('Terminal',\r
      new go.Node('Spot', { locationSpot: go.Spot.Top })\r
        .add(\r
          new go.Shape('Circle', { width: 55, height: 55, strokeWidth: 0 })\r
            .theme('fill', 'terminal'),\r
          new go.TextBlock({ font: '10pt Verdana, sans-serif', stroke: 'white' })\r
            .bind('text')\r
        )\r
    );\r
\r
    myDiagram.linkTemplate =\r
      new go.Link({\r
          routing: go.Routing.Orthogonal, corner: 10,\r
          deletable: false, toShortLength: 4\r
        })\r
        .add(\r
          new go.Shape({ strokeWidth: 2 })\r
            .theme('stroke', 'link'),\r
          new go.Shape({ toArrow: 'Standard', strokeWidth: 0 }) // the arrowhead\r
            .theme('fill', 'link')\r
        );\r
\r
    var nodeDataArray = [\r
      {\r
        key: 1,\r
        question: 'Greeting',\r
        actions: [\r
          { text: 'Sales', figure: 'BpmnEventConditional' },\r
          { text: 'Parts and Services', figure: 'Gear' },\r
          { text: 'Representative', figure: 'BpmnTaskUser' }\r
        ]\r
      },\r
      {\r
        key: 2,\r
        question: 'Sales',\r
        actions: [\r
          { text: 'Compact', figure: 'RailShipment' },\r
          { text: 'Mid-Size', figure: 'Forklift' },\r
          { text: 'Large', figure: 'TruckShipment' }\r
        ]\r
      },\r
      {\r
        key: 3,\r
        question: 'Parts and Services',\r
        actions: [\r
          { text: 'Maintenance', figure: 'Hammer' },\r
          { text: 'Repairs', figure: 'Caution' },\r
          { text: 'State Inspection', figure: 'BpmnTaskMessage' }\r
        ]\r
      },\r
      { key: 4, question: 'Representative' },\r
      { key: 5, question: 'Compact' },\r
      { key: 6, question: 'Mid-Size' },\r
      {\r
        key: 7,\r
        question: 'Large',\r
        actions: [\r
          { text: 'SUV', figure: 'SUV' },\r
          { text: 'Van', figure: 'Van' }\r
        ]\r
      },\r
      { key: 8, question: 'Maintenance' },\r
      { key: 9, question: 'Repairs' },\r
      { key: 10, question: 'State Inspection' },\r
      { key: 11, question: 'SUV' },\r
      { key: 12, question: 'Van' },\r
      { key: 13, category: 'Terminal', text: 'Susan' },\r
      { key: 14, category: 'Terminal', text: 'Eric' },\r
      { key: 15, category: 'Terminal', text: 'Steven' },\r
      { key: 16, category: 'Terminal', text: 'Tom' },\r
      { key: 17, category: 'Terminal', text: 'Emily' },\r
      { key: 18, category: 'Terminal', text: 'Tony' },\r
      { key: 19, category: 'Terminal', text: 'Ken' },\r
      { key: 20, category: 'Terminal', text: 'Rachel' },\r
      { key: 21, category: 'Terminal', text: 'John' },\r
      { key: 22, category: 'Terminal', text: 'Jake' }\r
    ];\r
    var linkDataArray = [\r
      { from: 1, to: 2, answer: 1 },\r
      { from: 1, to: 3, answer: 2 },\r
      { from: 1, to: 4, answer: 3 },\r
      { from: 2, to: 5, answer: 1 },\r
      { from: 2, to: 6, answer: 2 },\r
      { from: 2, to: 7, answer: 3 },\r
      { from: 3, to: 8, answer: 1 },\r
      { from: 3, to: 9, answer: 2 },\r
      { from: 3, to: 10, answer: 3 },\r
      { from: 7, to: 11, answer: 1 },\r
      { from: 7, to: 12, answer: 2 },\r
      { from: 5, to: 13 },\r
      { from: 6, to: 14 },\r
      { from: 11, to: 15 },\r
      { from: 12, to: 16 },\r
      { from: 8, to: 17 },\r
      { from: 9, to: 18 },\r
      { from: 10, to: 19 },\r
      { from: 4, to: 20 },\r
      { from: 4, to: 21 },\r
      { from: 8, to: 22 }\r
    ];\r
\r
    // create the Model with the above data, and assign to the Diagram\r
    myDiagram.model = new go.GraphLinksModel({\r
      copiesArrays: true,\r
      copiesArrayObjects: true,\r
      nodeDataArray: nodeDataArray,\r
      linkDataArray: linkDataArray\r
    });\r
  }\r
\r
  const changeTheme = () => {\r
    const myDiagram = go.Diagram.fromDiv('myDiagramDiv');\r
    if (myDiagram) {\r
      myDiagram.themeManager.currentTheme = document.getElementById('theme').value;\r
    }\r
  };\r
\r
  window.addEventListener('DOMContentLoaded', init);\r
\r
  function enableKeyboard() {\r
    window.removeEventListener('keydown', enableKeyboard);\r
    myDiagram.commandHandler.isFocusEnabled = true;\r
    myDiagram.commandHandler.isVirtualPointerEnabled = true;\r
  }\r
\r
  window.addEventListener('keydown', enableKeyboard);`,cssCode:``,externalStyles:[],externalScripts:[`../extensions/Figures.js`,`../extensions/Themes.js`],descriptionHtml:`<p>\r
    An <em>IVR tree</em>, or Interactive Voice Response Tree, is typically used by automated answering systems to direct calls to the correct party. This\r
    particular example is for a car dealership to route calls.\r
  </p>\r
  <p>\r
    This Interactive Voice Response Tree (IVR tree) has nodes that contain a collapsible list of actions, controlled by a <b>PanelExpanderButton</b>, with a\r
    <b>TreeExpanderButton</b> underneath the body. See the <a href="../intro/buttons">learn page on buttons</a> for more GoJS button information.\r
  </p>\r
  <p>\r
    Once <a>CommandHandler.isFocusEnabled</a> has been set to true, the root node becomes the GoJS <a>CommandHandler.focus</a>,\r
    as shown by a double-colored dashed box around the node.\r
    This allows the user to use the arrow keys to change focus, <code>Space</code> to select the focused Part,\r
    and <code>Enter</code> to go into Nodes and click buttons such as the "PanelExpanderButton" or "TreeExpanderButton".\r
    Read more about <a href="../learn/interactivity.html#FocusKeyboardControlTools">Keyboard Control</a>.\r
  </p>\r
  <p>\r
    Once <a>CommandHandler.isVirtualPointerEnabled</a> has also been set to true, then when the user holds down the <code>Shift</code> key,\r
    it shows a virtual pointer that allows the user to use <code>Shift-Enter</code> and <code>Shift-arrow</code> keys to drag nodes.\r
    The user can always toggle "keyboard control mode" using the <code>Ctrl-Alt-Enter</code> keyboard command.\r
  </p>\r
  <p>\r
    For another sample demonstrating screen-reader assistance, see <a href="./Accessibility">Accessibility</a> sample.\r
  </p>\r
  <p>\r
    The dark and light themes are controlled using the <a>ThemeManager</a>.\r
  </p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`itemarrays`,`treelayout`,`buttons`,`theme`];var g=y();l(`getow`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};