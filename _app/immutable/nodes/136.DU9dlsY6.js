import{$ as e,C as t,G as n,H as r,L as i,T as a,W as o,c as s,et as c,m as l,st as u,x as d,z as f}from"../chunks/BY_RssUb.js";import"../chunks/DTR9fq_7.js";import"../chunks/xihTtKlq.js";import{n as p,t as m}from"../chunks/DzUjTTvJ.js";var h=u({load:()=>g,prerender:()=>!0}),g=()=>({metadata:{title:`Family Tree Diagram of British Nobility`,titleShort:`Family Tree`,indexDescription:`Shows a standard family tree.`,screenshot:`familytree`,priority:.6,tags:[`tables`,`treelayout`],description:`A family tree diagram of British nobility.`},htmlContent:`<div id="myDiagramDiv" style="background-color: white; border: solid 1px black; width: 100%; height: 550px"></div>\r
  <p><button id="zoomToFit">Zoom to Fit</button> <button id="centerRoot">Center on root</button></p>\r
  <p id="hidden">this forces the font to load in Chromium browsers</p>`,jsCode:`// This GoJS sample was designed by Synergy Codes, our consultant partner with\r
  // over a decade of experience and cooperation with the GoJS team.\r
  // See https://synergycodes.com/gojs/ for more\r
\r
  // This sample demonstrates polished Node and Link template design,\r
  // which involves considerable code and opinionated choices.\r
  // It may be unsuitable as a starting point unless you want to copy these specific styles.\r
  // As part of your evaluation, the GoJS team is happy to help you craft your own templates.\r
  // For a more rudimentary family tree, see familyTreeJP.html\r
\r
  // properties used in bindings,\r
  // defined to not use simple strings in bindings across application\r
  const nameProperty = 'name';\r
  const genderProperty = 'gender';\r
  const statusProperty = 'status';\r
  const countProperty = 'count';\r
\r
  const theme = {\r
    colors: {\r
      femaleBadgeBackground: '#FFCBEA',\r
      maleBadgeBackground: '#A2DAFF',\r
      femaleBadgeText: '#7A005E',\r
      maleBadgeText: '#001C76',\r
      kingQueenBorder: '#FEBA00',\r
      princePrincessBorder: '#679DDA',\r
      civilianBorder: '#58ADA7',\r
      personText: '#383838',\r
      personNodeBackground: '#FFFFFF',\r
      selectionStroke: '#485670',\r
      counterBackground: '#485670',\r
      counterBorder: '#FFFFFF',\r
      counterText: '#FFFFFF',\r
      link: '#686E76'\r
    },\r
    fonts: {\r
      badgeFont: 'bold 12px Poppins',\r
      birthDeathFont: '14px Poppins',\r
      nameFont: '500 18px Poppins',\r
      counterFont: '14px Poppins'\r
    }\r
  };\r
\r
  // toggle highlight on mouse enter/leave\r
  // this sample also uses highlight for selection, so only unhighlight if unselected\r
  const onMouseEnterPart = (e, part) => part.isHighlighted = true;\r
  const onMouseLeavePart = (e, part) => { if (!part.isSelected) part.isHighlighted = false; }\r
  const onSelectionChange = part => { part.isHighlighted = part.isSelected; }\r
\r
  const STROKE_WIDTH = 3;\r
  const ADORNMENT_STROKE_WIDTH = STROKE_WIDTH + 1;\r
  const CORNER_ROUNDNESS = 12;\r
  const IMAGE_TOP_MARGIN = 20;\r
  const MAIN_SHAPE_NAME = 'mainShape';\r
  const IMAGE_DIAMETER = 40;\r
\r
  const getStrokeForStatus = status => {\r
    switch (status) {\r
      case 'king':\r
      case 'queen':\r
        return theme.colors.kingQueenBorder;\r
      case 'prince':\r
      case 'princess':\r
        return theme.colors.princePrincessBorder;\r
      case 'civilian':\r
      default:\r
        return theme.colors.civilianBorder;\r
    }\r
  };\r
\r
  function strokeStyle(shape) {\r
    shape.fill = theme.colors.personNodeBackground;\r
    shape.strokeWidth = STROKE_WIDTH;\r
    shape.bind('stroke', statusProperty, status => getStrokeForStatus(status));\r
    shape.bindObject('stroke', 'isHighlighted',\r
        (isHighlighted, obj) =>\r
          isHighlighted\r
            ? theme.colors.selectionStroke\r
            : getStrokeForStatus(obj.part.data.status));\r
  }\r
\r
  const genderToText = gender => gender === 'M' ? 'MALE' : 'FEMALE';\r
\r
  const genderToTextColor =\r
    gender => gender === 'M' ? theme.colors.maleBadgeText : theme.colors.femaleBadgeText;\r
\r
  const genderToFillColor =\r
    gender => gender === 'M' ? theme.colors.maleBadgeBackground : theme.colors.femaleBadgeBackground;\r
\r
  const personBadge = () =>\r
    new go.Panel('Auto', {\r
        alignmentFocus: go.Spot.TopRight,\r
        alignment: new go.Spot(1, 0, -25, STROKE_WIDTH - 0.5)\r
      })\r
      .add(\r
        new go.Shape({\r
            figure: 'RoundedRectangle',\r
            parameter1: CORNER_ROUNDNESS,\r
            parameter2: 4 | 8, // round only the bottom\r
            desiredSize: new go.Size(NaN, 22.5),\r
            stroke: null\r
          })\r
          .bind('fill', genderProperty, genderToFillColor),\r
      new go.TextBlock({\r
          font: theme.fonts.badgeFont\r
        })\r
        .bind('stroke', genderProperty, genderToTextColor)\r
        .bind('text', genderProperty, genderToText)\r
      )\r
\r
  const personBirthDeathTextBlock = () =>\r
    new go.TextBlock({\r
        stroke: theme.colors.personText,\r
        font: theme.fonts.birthDeathFont,\r
        alignmentFocus: go.Spot.Top,\r
        alignment: new go.Spot(0.5, 1, 0, -35)\r
      })\r
      .bind('text', '', ({ born, death }) => {\r
        if (!born) return '';\r
        return \`\${born} - \${death ?? ''}\`;\r
      })\r
\r
  // Panel to display the number of children a node has\r
  const personCounter = () =>\r
    new go.Panel('Auto', {\r
        visible: false,\r
        alignmentFocus: go.Spot.Center,\r
        alignment: go.Spot.Bottom\r
      })\r
      .bindObject('visible', '', obj => obj.findLinksOutOf().count > 0)\r
      .add(\r
        new go.Shape('Circle', {\r
          desiredSize: new go.Size(29, 29),\r
          strokeWidth: STROKE_WIDTH,\r
          stroke: theme.colors.counterBorder,\r
          fill: theme.colors.counterBackground\r
        }),\r
        new go.TextBlock({\r
            alignment: new go.Spot(0.5, 0.5, 0, 1),\r
            stroke: theme.colors.counterText,\r
            font: theme.fonts.counterFont,\r
            textAlign: 'center'\r
          })\r
          .bindObject('text', '', obj => obj.findNodesOutOf().count)\r
      )\r
\r
  function pictureStyle(pic) {\r
    pic\r
      .bind('source', '', ({ status, gender }) => {\r
        switch (status) {\r
          case 'king':\r
          case 'queen':\r
            return './images/king.svg';\r
          case 'prince':\r
          case 'princess':\r
            return './images/prince.svg';\r
          case 'civilian':\r
            return gender === 'M'\r
              ? './images/male-civilian.svg'\r
              : './images/female-civilian.svg';\r
          default:\r
            return './images/male-civilian.svg';\r
        }\r
      })\r
      // The SVG files are different sizes, so this keeps their aspect ratio reasonable\r
      .bind('desiredSize', 'status', status => {\r
        switch (status) {\r
          case 'king':\r
          case 'queen':\r
            return new go.Size(30, 20)\r
          case 'prince':\r
          case 'princess':\r
            return new go.Size(28, 20)\r
          case 'civilian':\r
          default:\r
            return new go.Size(24, 24)\r
        }\r
      });\r
  }\r
\r
  const personImage = () =>\r
    new go.Panel('Spot', {\r
        alignmentFocus: go.Spot.Top,\r
        alignment: new go.Spot(0, 0, STROKE_WIDTH / 2, IMAGE_TOP_MARGIN)\r
      })\r
      .add(\r
        new go.Shape({\r
            figure: 'Circle',\r
            desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER)\r
          })\r
          .apply(strokeStyle),\r
        new go.Picture({ scale: 0.9 })\r
          .apply(pictureStyle)\r
      );\r
\r
  const personMainShape = () =>\r
    new go.Shape({\r
        figure: 'RoundedRectangle',\r
        desiredSize: new go.Size(215, 110),\r
        portId: '',\r
        parameter1: CORNER_ROUNDNESS\r
      })\r
      .apply(strokeStyle);\r
\r
  const personNameTextBlock = () =>\r
    new go.TextBlock({\r
        stroke: theme.colors.personText,\r
        font: theme.fonts.nameFont,\r
        desiredSize: new go.Size(160, 50),\r
        overflow: go.TextOverflow.Ellipsis,\r
        textAlign: 'center',\r
        verticalAlignment: go.Spot.Center,\r
        toolTip:\r
          go.GraphObject.build('ToolTip')\r
            .add(\r
              new go.TextBlock({ margin: 4 })\r
                .bind('text', nameProperty)\r
            ),\r
        alignmentFocus: go.Spot.Top,\r
        alignment: new go.Spot(0.5, 0, 0, 25)\r
      })\r
      .bind('text', nameProperty)\r
\r
\r
  const createNodeTemplate = () =>\r
    new go.Node('Spot', {\r
        selectionAdorned: false,\r
        mouseEnter: onMouseEnterPart,\r
        mouseLeave: onMouseLeavePart,\r
        selectionChanged: onSelectionChange\r
      })\r
      .add(\r
        new go.Panel('Spot')\r
          .add(\r
            personMainShape(),\r
            personNameTextBlock(),\r
            personBirthDeathTextBlock()\r
          ),\r
        personImage(),\r
        personBadge(),\r
        personCounter()\r
      )\r
\r
  const createLinkTemplate = () =>\r
    new go.Link({\r
        selectionAdorned: false,\r
        routing: go.Routing.Orthogonal,\r
        layerName: 'Background',\r
        mouseEnter: onMouseEnterPart,\r
        mouseLeave: onMouseLeavePart\r
      })\r
      .add(\r
        new go.Shape({\r
            stroke: theme.colors.link,\r
            strokeWidth: 1\r
          })\r
          .bindObject('stroke', 'isHighlighted',\r
            isHighlighted => isHighlighted ? theme.colors.selectionStroke : theme.colors.link)\r
          .bindObject('stroke', 'isSelected',\r
            selected => selected ? theme.colors.selectionStroke : theme.colors.link)\r
          .bindObject('strokeWidth', 'isSelected', selected => selected ? 2 : 1)\r
      );\r
\r
\r
  const initDiagram = divId => {\r
    const diagram = new go.Diagram(divId, {\r
      layout: new go.TreeLayout({\r
        angle: 90,\r
        nodeSpacing: 20,\r
        layerSpacing: 50,\r
        layerStyle: go.TreeLayout.LayerUniform,\r
\r
        // For compaction, make the last parents place their children in a bus\r
        treeStyle: go.TreeStyle.LastParents,\r
        alternateAngle: 90,\r
        alternateLayerSpacing: 35,\r
        alternateAlignment: go.TreeAlignment.BottomRightBus,\r
        alternateNodeSpacing: 20\r
      }),\r
      'toolManager.hoverDelay': 100,\r
      linkTemplate: createLinkTemplate(),\r
      model: new go.TreeModel({ nodeKeyProperty: 'name' })\r
    });\r
\r
    diagram.nodeTemplate = createNodeTemplate();\r
    const nodes = familyData;\r
    diagram.model.addNodeDataCollection(nodes);\r
\r
    // Initially center on root:\r
    diagram.addDiagramListener('InitialLayoutCompleted', () => {\r
      const root = diagram.findNodeForKey('King George V');\r
      if (!root) return;\r
      diagram.scale = 0.6;\r
      diagram.scrollToRect(root.actualBounds);\r
    });\r
\r
    // Setup zoom to fit button\r
    document.getElementById('zoomToFit').addEventListener('click', () => diagram.commandHandler.zoomToFit());\r
\r
    document.getElementById('centerRoot').addEventListener('click', () => {\r
      diagram.scale = 1;\r
      diagram.commandHandler.scrollToPart(diagram.findNodeForKey('King George V'));\r
    });\r
  };\r
\r
  const familyData = [\r
    {\r
      name: 'King George V',\r
      gender: 'M', status: 'king', born: '1865', death: '1936'\r
      // no parent value, this is the root\r
    },\r
    {\r
      name: 'King Edward VIII',\r
      gender: 'M', status: 'king', born: '1894', death: '1972',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'King George VI',\r
      gender: 'M', status: 'king', born: '1895', death: '1952',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'Princess Mary, Princess Royal and Countess of Harewood',\r
      gender: 'F', status: 'princess', born: '1897', death: '1965',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'Prince Henry, Duke of Gloucester',\r
      gender: 'M', status: 'prince', born: '1900', death: '1974',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'Prince George, Duke of Kent',\r
      gender: 'M', status: 'prince', born: '1902', death: '1942',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'Prince John of the United Kingdom',\r
      gender: 'M', status: 'prince', born: '1905', death: '1919',\r
      parent: 'King George V'\r
    },\r
    {\r
      name: 'Queen Elizabeth II',\r
      gender: 'F', status: 'queen', born: '1926', death: '2022',\r
      parent: 'King George VI'\r
    },\r
    {\r
      name: 'Princess Margaret, Countess of Snowdon',\r
      gender: 'F', status: 'princess', born: '1930', death: '2002',\r
      parent: 'King George VI'\r
    },\r
    {\r
      name: 'George Lascelles',\r
      gender: 'M', status: 'civilian', born: '1923', death: '2011',\r
      parent: 'Princess Mary, Princess Royal and Countess of Harewood'\r
    },\r
    {\r
      name: 'Gerald Lascelles',\r
      gender: 'M', status: 'civilian', born: '1924', death: '1998',\r
      parent: 'Princess Mary, Princess Royal and Countess of Harewood'\r
    },\r
    {\r
      name: 'Prince William of Gloucester',\r
      gender: 'M', status: 'prince', born: '1941', death: '1972',\r
      parent: 'Prince Henry, Duke of Gloucester'\r
    },\r
    {\r
      name: 'Prince Richard, Duke of Gloucester',\r
      gender: 'M', status: 'prince', born: '1944', death: null,\r
      parent: 'Prince Henry, Duke of Gloucester'\r
    },\r
    {\r
      name: 'Prince Edward, Duke of Kent',\r
      gender: 'M', status: 'prince', born: '1935', death: null,\r
      parent: 'Prince George, Duke of Kent'\r
    },\r
    {\r
      name: 'Princess Alexandra, The Honourable Lady Ogilvy',\r
      gender: 'F', status: 'princess', born: '1936', death: null,\r
      parent: 'Prince George, Duke of Kent'\r
    },\r
    {\r
      name: 'Prince Michael of Kent',\r
      gender: 'M', status: 'prince', born: '1942', death: null,\r
      parent: 'Prince George, Duke of Kent'\r
    },\r
    {\r
      name: 'King Charles III',\r
      gender: 'M', status: 'king', born: '1948', death: null,\r
      parent: 'Queen Elizabeth II'\r
    },\r
    {\r
      name: 'Princess Anne, Princess Royal',\r
      gender: 'F', status: 'princess', born: '1950', death: null,\r
      parent: 'Queen Elizabeth II'\r
    },\r
    {\r
      name: 'Prince Andrew, Duke of York',\r
      gender: 'M', status: 'prince', born: '1960', death: null,\r
      parent: 'Queen Elizabeth II'\r
    },\r
    {\r
      name: 'Prince Edward, Duke of Edinburgh',\r
      gender: 'M', status: 'prince', born: '1964', death: null,\r
      parent: 'Queen Elizabeth II'\r
    },\r
    {\r
      name: 'David Armstrong-Jones, 2nd Earl of Snowdon',\r
      gender: 'M', status: 'prince', born: '1961', death: null,\r
      parent: 'Princess Margaret, Countess of Snowdon'\r
    },\r
    {\r
      name: 'Lady Sarah Chatto Armstrong-Jones',\r
      gender: 'F', status: 'princess', born: '1964', death: null,\r
      parent: 'Princess Margaret, Countess of Snowdon'\r
    },\r
    {\r
      name: 'David Lascelles',\r
      gender: 'M', status: 'civilian', born: '1950', death: null,\r
      parent: 'George Lascelles'\r
    },\r
    {\r
      name: 'James Lascelles',\r
      gender: 'M', status: 'civilian', born: '1953', death: null,\r
      parent: 'George Lascelles'\r
    },\r
    {\r
      name: 'Jeremy Lascelles',\r
      gender: 'M', status: 'civilian', born: '1955', death: null,\r
      parent: 'George Lascelles'\r
    },\r
    {\r
      name: 'Mark Lascelles',\r
      gender: 'M', status: 'civilian', born: '1964', death: null,\r
      parent: 'George Lascelles'\r
    },\r
    {\r
      name: 'Martin David Lascelles',\r
      gender: 'M', status: 'civilian', born: '1962', death: null,\r
      parent: 'Gerald Lascelles'\r
    },\r
    {\r
      name: 'Henry Lascelles',\r
      gender: 'M', status: 'civilian', born: '1953', death: null,\r
      parent: 'Gerald Lascelles'\r
    },\r
    {\r
      name: 'Alexander Windsor, Earl of Ulster',\r
      gender: 'M', status: 'civilian', born: '1974', death: null,\r
      parent: 'Prince Richard, Duke of Gloucester'\r
    },\r
    {\r
      name: 'Lady Davina Lewis',\r
      gender: 'F', status: 'civilian', born: '1977', death: null,\r
      parent: 'Prince Richard, Duke of Gloucester'\r
    },\r
    {\r
      name: 'Lady Rose Gilman',\r
      gender: 'F', status: 'civilian', born: '1980', death: null,\r
      parent: 'Prince Richard, Duke of Gloucester'\r
    },\r
    {\r
      name: 'George Windsor',\r
      gender: 'M', status: 'civilian', born: '1962', death: null,\r
      parent: 'Prince Edward, Duke of Kent'\r
    },\r
    {\r
      name: 'Lady Helen Taylor',\r
      gender: 'F', status: 'civilian', born: '1964', death: null,\r
      parent: 'Prince Edward, Duke of Kent'\r
    },\r
    {\r
      name: 'Lord Nicholas Windsor',\r
      gender: 'M', status: 'civilian', born: '1970', death: null,\r
      parent: 'Prince Edward, Duke of Kent'\r
    },\r
    {\r
      name: 'James Ogilvy',\r
      gender: 'M', status: 'civilian', born: '1964', death: null,\r
      parent: 'Princess Alexandra, The Honourable Lady Ogilvy'\r
    },\r
    {\r
      name: 'Marina Ogilvy',\r
      gender: 'F', status: 'civilian', born: '1966', death: null,\r
      parent: 'Princess Alexandra, The Honourable Lady Ogilvy'\r
    },\r
    {\r
      name: 'Lord Frederick Windsor',\r
      gender: 'M', status: 'civilian', born: '1979', death: null,\r
      parent: 'Prince Michael of Kent'\r
    },\r
    {\r
      name: 'Lady Gabriella Windsor',\r
      gender: 'F', status: 'civilian', born: '1981', death: null,\r
      parent: 'Prince Michael of Kent'\r
    },\r
    {\r
      name: 'Prince William, Prince of Wales',\r
      gender: 'M', status: 'prince', born: '1982', death: null,\r
      parent: 'King Charles III'\r
    },\r
    {\r
      name: 'Prince Harry, Duke of Sussex',\r
      gender: 'M', status: 'prince', born: '1984', death: null,\r
      parent: 'King Charles III'\r
    },\r
    {\r
      name: 'Peter Phillips',\r
      gender: 'M', status: 'civilian', born: '1977', death: null,\r
      parent: 'Princess Anne, Princess Royal'\r
    },\r
    {\r
      name: 'Zara Phillips',\r
      gender: 'F', status: 'civilian', born: '1981', death: null,\r
      parent: 'Princess Anne, Princess Royal'\r
    },\r
    {\r
      name: 'Princess Beatrice of York',\r
      gender: 'F', status: 'princess', born: '1988', death: null,\r
      parent: 'Prince Andrew, Duke of York'\r
    },\r
    {\r
      name: 'Princess Eugenie of York',\r
      gender: 'F', status: 'princess', born: '1990', death: null,\r
      parent: 'Prince Andrew, Duke of York'\r
    },\r
    {\r
      name: 'Lady Louise Windsor',\r
      gender: 'F', status: 'civilian', born: '2003', death: null,\r
      parent: 'Prince Edward, Duke of Edinburgh'\r
    },\r
    {\r
      name: 'James Viscount Severn, Earl of Wessex',\r
      gender: 'M', status: 'prince', born: '2007', death: null,\r
      parent: 'Prince Edward, Duke of Edinburgh'\r
    },\r
    {\r
      name: 'Samuel Chatto',\r
      gender: 'M', status: 'civilian', born: '1996', death: null,\r
      parent: 'Lady Sarah Chatto Armstrong-Jones'\r
    },\r
    {\r
      name: 'Arthur Chatto',\r
      gender: 'M', status: 'civilian', born: '1999', death: null,\r
      parent: 'Lady Sarah Chatto Armstrong-Jones'\r
    },\r
    {\r
      name: 'Emily Shard',\r
      gender: 'F', status: 'civilian', born: '1975', death: null,\r
      parent: 'David Lascelles'\r
    },\r
    {\r
      name: 'Benjamin Lascelles',\r
      gender: 'M', status: 'civilian', born: '1978', death: null,\r
      parent: 'David Lascelles'\r
    },\r
    {\r
      name: 'Alexander Lascelles',\r
      gender: 'M', status: 'civilian', born: '1980', death: null,\r
      parent: 'David Lascelles'\r
    },\r
    {\r
      name: 'Edward Lascelles',\r
      gender: 'M', status: 'civilian', born: '1982', death: null,\r
      parent: 'David Lascelles'\r
    },\r
    {\r
      name: 'Tanit Lascelles',\r
      gender: 'F', status: 'civilian', born: '1981', death: null,\r
      parent: 'James Lascelles'\r
    },\r
    {\r
      name: 'Tewa Lascelles',\r
      gender: 'M', status: 'civilian', born: '1985', death: null,\r
      parent: 'James Lascelles'\r
    },\r
    {\r
      name: 'Sophie Lascelles',\r
      gender: 'F', status: 'civilian', born: '1973', death: null,\r
      parent: 'James Lascelles'\r
    },\r
    {\r
      name: 'Rowan Lascelles',\r
      gender: 'M', status: 'civilian', born: '1977', death: null,\r
      parent: 'James Lascelles'\r
    },\r
    {\r
      name: 'Tallulah Lascelles',\r
      gender: 'F', status: 'civilian', born: '2005', death: null,\r
      parent: 'Jeremy Lascelles'\r
    },\r
    {\r
      name: 'Thomas Lascelles',\r
      gender: 'M', status: 'civilian', born: '1982', death: null,\r
      parent: 'Jeremy Lascelles'\r
    },\r
    {\r
      name: 'Ellen Lascelles',\r
      gender: 'F', status: 'civilian', born: '1984', death: null,\r
      parent: 'Jeremy Lascelles'\r
    },\r
    {\r
      name: 'Amy Lascelles',\r
      gender: 'F', status: 'civilian', born: '1986', death: null,\r
      parent: 'Jeremy Lascelles'\r
    },\r
    {\r
      name: 'Charlotte Lascelles',\r
      gender: 'F', status: 'civilian', born: '1996', death: null,\r
      parent: 'Mark Lascelles'\r
    },\r
    {\r
      name: 'Imogen Lascelles',\r
      gender: 'F', status: 'civilian', born: '1998', death: null,\r
      parent: 'Mark Lascelles'\r
    },\r
    {\r
      name: 'Miranda Lascelles',\r
      gender: 'F', status: 'civilian', born: '2000', death: null,\r
      parent: 'Mark Lascelles'\r
    },\r
    {\r
      name: 'Alexandre Joshua Lascelles',\r
      gender: 'M', status: 'civilian', born: '1996', death: null,\r
      parent: 'Martin David Lascelles'\r
    },\r
    {\r
      name: 'Maximillian David Lascelles',\r
      gender: 'M', status: 'civilian', born: '1991', death: null,\r
      parent: 'Henry Lascelles'\r
    },\r
    {\r
      name: 'Xan Windsor',\r
      gender: 'M', status: 'civilian', born: '2007', death: null,\r
      parent: 'Alexander Windsor, Earl of Ulster'\r
    },\r
    {\r
      name: 'Lady Cosima Windsor',\r
      gender: 'F', status: 'civilian', born: '2010', death: null,\r
      parent: 'Alexander Windsor, Earl of Ulster'\r
    },\r
    {\r
      name: 'Senna Lewis',\r
      gender: 'F', status: 'civilian', born: '2010', death: null,\r
      parent: 'Lady Davina Lewis'\r
    },\r
    {\r
      name: 'Lyla Gilman',\r
      gender: 'F', status: 'civilian', born: '2010', death: null,\r
      parent: 'Lady Rose Gilman'\r
    },\r
    {\r
      name: 'Edward Windsor',\r
      gender: 'M', status: 'civilian', born: '1988', death: null,\r
      parent: 'George Windsor'\r
    },\r
    {\r
      name: 'Lady Marina-Charlotte Windsor',\r
      gender: 'F', status: 'civilian', born: '1992', death: null,\r
      parent: 'George Windsor'\r
    },\r
    {\r
      name: 'Lady Amelia Windsor',\r
      gender: 'F', status: 'civilian', born: '1995', death: null,\r
      parent: 'George Windsor'\r
    },\r
    {\r
      name: 'Columbus Taylor',\r
      gender: 'M', status: 'civilian', born: '1994', death: null,\r
      parent: 'Lady Helen Taylor'\r
    },\r
    {\r
      name: 'Cassius Taylor',\r
      gender: 'M', status: 'civilian', born: '1996', death: null,\r
      parent: 'Lady Helen Taylor'\r
    },\r
    {\r
      name: 'Eloise Taylor',\r
      gender: 'F', status: 'civilian', born: '2003', death: null,\r
      parent: 'Lady Helen Taylor'\r
    },\r
    {\r
      name: 'Estella Taylor',\r
      gender: 'F', status: 'civilian', born: '2004', death: null,\r
      parent: 'Lady Helen Taylor'\r
    },\r
    {\r
      name: 'Albert Windsor',\r
      gender: 'M', status: 'civilian', born: '2007', death: null,\r
      parent: 'Lord Nicholas Windsor'\r
    },\r
    {\r
      name: 'Leopold Windsor',\r
      gender: 'M', status: 'civilian', born: '2009', death: null,\r
      parent: 'Lord Nicholas Windsor'\r
    },\r
    {\r
      name: 'Flora Ogilvy',\r
      gender: 'F', status: 'civilian', born: '1994', death: null,\r
      parent: 'James Ogilvy'\r
    },\r
    {\r
      name: 'Alexander Ogilvy',\r
      gender: 'M', status: 'civilian', born: '1996', death: null,\r
      parent: 'James Ogilvy'\r
    },\r
    {\r
      name: 'Zenouska Mowatt',\r
      gender: 'F', status: 'civilian', born: '1990', death: null,\r
      parent: 'Marina Ogilvy'\r
    },\r
    {\r
      name: 'Christian Mowatt',\r
      gender: 'M', status: 'civilian', born: '1993', death: null,\r
      parent: 'Marina Ogilvy'\r
    },\r
    {\r
      name: 'Prince George of Wales',\r
      gender: 'M', status: 'prince', born: '2013', death: null,\r
      parent: 'Prince William, Prince of Wales'\r
    },\r
    {\r
      name: 'Princess Charlotte of Wales',\r
      gender: 'F', status: 'princess', born: '2015', death: null,\r
      parent: 'Prince William, Prince of Wales'\r
    },\r
    {\r
      name: 'Prince Louis of Wales',\r
      gender: 'M', status: 'prince', born: '2018', death: null,\r
      parent: 'Prince William, Prince of Wales'\r
    },\r
    {\r
      name: 'Prince Archie of Sussex',\r
      gender: 'M', status: 'prince', born: '2019', death: null,\r
      parent: 'Prince Harry, Duke of Sussex'\r
    },\r
    {\r
      name: 'Princess Lilibet of Sussex',\r
      gender: 'F', status: 'princess', born: '2021', death: null,\r
      parent: 'Prince Harry, Duke of Sussex'\r
    },\r
    {\r
      name: 'Savannah Anne Kathleen Phillips',\r
      gender: 'F', status: 'civilian', born: '2010', death: null,\r
      parent: 'Peter Phillips'\r
    },\r
    {\r
      name: 'Isla Elizabeth Phillips',\r
      gender: 'F', status: 'civilian', born: '2012', death: null,\r
      parent: 'Peter Phillips'\r
    },\r
    {\r
      name: 'Mia Grace Tindall',\r
      gender: 'F', status: 'civilian', born: '2014', death: null,\r
      parent: 'Zara Phillips'\r
    },\r
    {\r
      name: 'Lena Elizabeth Tindall',\r
      gender: 'F', status: 'civilian', born: '2018', death: null,\r
      parent: 'Zara Phillips'\r
    },\r
    {\r
      name: 'Lucas Philip Tindall',\r
      gender: 'M', status: 'civilian', born: '2021', death: null,\r
      parent: 'Zara Phillips'\r
    },\r
    {\r
      name: 'Sienna Mapeli Mozzi',\r
      gender: 'F', status: 'civilian', born: '2021', death: null,\r
      parent: 'Princess Beatrice of York'\r
    },\r
    {\r
      name: 'August Brooksbank',\r
      gender: 'M', status: 'civilian', born: '2021', death: null,\r
      parent: 'Princess Eugenie of York'\r
    },\r
    {\r
      name: 'Ernest Brooksbank',\r
      gender: 'M', status: 'civilian', born: '2023', death: null,\r
      parent: 'Princess Eugenie of York'\r
    }\r
  ];\r
\r
\r
  window.addEventListener('DOMContentLoaded', () => {\r
    // setTimeout only to ensure font is loaded before loading diagram\r
    // you may want to use an asset loading library for this\r
    // to keep this sample simple, it does not\r
    setTimeout(() => {\r
      initDiagram('myDiagramDiv');\r
    }, 300);\r
  });`,cssCode:`#hidden {\r
    font: 500 0px Poppins;\r
    opacity: 0;\r
  }`,externalStyles:[`https://fonts.googleapis.com/css?family=Poppins:regular,medium,bold&subset=latin,latin-ext`],externalScripts:[],descriptionHtml:`<p>This GoJS sample was designed by <a href="https://synergycodes.com/gojs/" target="_blank">Synergy Codes</a>, our\r
    consultant partner with over a decade of experience and cooperation with the GoJS team.</p>\r
  <p>This family tree diagram shows several generations of British nobility beginning with George V (1865-1936).</p>\r
  <p><a>Node</a> data contains information about gender, and a data binding assigns a corresponding color.</p>\r
  <p>For a more rudimentary family tree, see the <a href="familyTreeJP">Japanese family tree sample</a>.</p>\r
  <p>For a more complex family tree see the <a href="genogram">genogram sample</a>.</p>\r
  <p>This sample demonstrates polished Node and Link template design, which involves considerable code and opinionated\r
    choices. It may be unsuitable as a starting point unless you want to copy these specific styles. As part of your\r
    evaluation, the <a href="https://nwoods.com/support.html?ft" target="_blank">GoJS team</a> is happy to help you\r
    craft your own templates.</p>`,descriptionCodeBlocks:[]}),_=a(`<meta name="description"/> <meta property="og:description"/>`,1),v=a(`<meta property="og:title"/> <!>`,1),y=a(`<!> <!>`,1);function b(a,u){c(u,!0);let h=[`tables`,`treelayout`];var g=y();l(`1bgunwp`,e=>{var a=v(),c=o(a),l=n(c,2),p=e=>{var r=_(),i=o(r),a=n(i,2);f(()=>{s(i,`content`,u.data.metadata.description),s(a,`content`,u.data.metadata.description)}),t(e,r)};d(l,e=>{u.data.metadata.description&&e(p)}),f(()=>s(c,`content`,`${u.data.metadata.title??``} | GoJS Diagramming Library`)),i(()=>{r.title=`${u.data.metadata.title??``} | GoJS Diagramming Library`}),t(e,a)});var b=o(g);p(b,{get data(){return u.data}}),m(n(b,2),{get tags(){return h}}),t(a,g),e()}export{b as component,h as universal};