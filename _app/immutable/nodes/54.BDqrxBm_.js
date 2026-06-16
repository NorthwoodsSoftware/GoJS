import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`React`,category:`Frameworks`},htmlContent:`<h1>Using GoJS with React</h1>\r
<p class="box bg-info">\r
  Examples of most of the topics discussed on this page can be found in the <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">gojs-react-basic</a> project,\r
  which serves as a simple starter project.\r
</p>\r
\r
<p>\r
  If you are new to GoJS, it may be helpful to first visit the <a href="./" target="_blank">Quick Start Tutorial</a>.\r
</p>\r
\r
<p>\r
  The easiest way to get a component set up for a GoJS Diagram is to use the <a href="https://github.com/NorthwoodsSoftware/gojs-react" target="_blank">gojs-react</a> package,\r
  which exports React Components for GoJS Diagrams, Palettes, and Overviews.\r
  The <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">gojs-react-basic</a> project demonstrates how to use these components.\r
  More information about the package, including the various props it takes, can be found on the <a href="https://github.com/NorthwoodsSoftware/gojs-react" target="_blank">Github</a> or\r
  <a href="https://npmjs.com/gojs-react" target="_blank">NPM</a> pages. Our examples will be using a <a href="../api/symbols/GraphLinksModel.html" target="api">GraphLinksModel</a>, but any model can be used.\r
</p>\r
\r
<h2 id="quickstart"><a class="not-prose heading-anchor" href="#quickstart">Quick start with an existing React application</a></h2>\r
<h4 id="Installation">Installation</h4>\r
<p>\r
  Start by installing GoJS and gojs-react: <code>npm install gojs gojs-react</code>.\r
</p>\r
<h4 id="DiagramStyling">Diagram styling</h4>\r
\r
  Next, set up a CSS class for the GoJS diagram's div:\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<h4 id="RenderingComponent">Rendering the component</h4>\r
<p>\r
  Finally, add an initDiagram function and a model change handler function, and add the ReactDiagram component inside your render method.\r
  Note that the UndoManager should always be enabled to allow for transactions to take place,\r
  but the <a href="../api/symbols/UndoManager.html#maxhistorylength" target="api">UndoManager.maxHistoryLength</a> can be set to 0 to prevent undo and redo.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  That's it! You should now have a GoJS diagram rendering within your React application.\r
  Try editing the text of a node or deleting a node, and you'll see an alert on the page.\r
</p>\r
\r
<h2 id="addingInteractivity"><a class="not-prose heading-anchor" href="#addingInteractivity">Adding interactivity</a></h2>\r
\r
<p>\r
  The above example shows a simple event handler for <code>onModelChange</code>.\r
  While more advanced handlers can be used to effectively communicate the Diagram's changes to the app, one might want ways to communicate from the app to the Diagram,\r
  and to also have those changes persist across rerenders.\r
</p>\r
<p>\r
  To do this, we can make the Link and Node data arrays stateful, in a React sense.\r
  While <code>useState</code> works, you either need several calls or complex setters.\r
  Instead, all arguments to <code>ReactDiagram</code> that you wish to update later\r
  can stored in a <a href="https://github.com/immerjs/use-immer">useImmer</a> or similar hook,\r
  and then passed to the diagram:\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
<p>\r
  Now that your Diagram's data is stateful, any component with access to <code>updateDiagramData</code> can call it and make changes that will persist across rerenders:\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<h2 id="updatingState"><a class="not-prose heading-anchor" href="#updatingState">Updating state</a></h2>\r
\r
<p>\r
  Because React state is immutable, it cannot be directly reassigned. Updating state works normally for most properties of <code>ReactDiagram</code>, but not all.\r
  When a property like <code>skipsDiagramUpdate</code> is updated with <code>updateDiagramData</code>,\r
  the new value is passed into <code>ReactDiagram</code> and simply replaces the old one.\r
</p>\r
<p>\r
  But, when <code>nodeDataArray</code> or <code>linkDataArray</code> are updated with <code>updateDiagramData</code>,\r
  the new value is passed into <code>ReactDiagram</code> and instead of replacing the old one,\r
  will be merged with <a href="../api/symbols/Diagram.html#mergenodedataarray" target="api">Diagram.mergeNodeDataArray</a> or <a href="../api/symbols/Diagram.html#mergelinkdataarray" target="api">Diagram.mergeLinkDataArray</a>.\r
  Here are some suggested patterns when performing common operations on these properties.\r
</p>\r
\r
<h4>Adding/modifying Node properties</h4>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<h4>Removing Node properties</h4>\r
\r
<p>\r
  GoJS avoids destructive merging; this means properties must be explicitly set to undefined in order to remove them when merging:\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<h4>Adding Nodes</h4>\r
\r
<!-- CODE_BLOCK_6 -->\r
\r
<h4>Removing Nodes</h4>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<h3 id="modeldata"><a class="not-prose heading-anchor" href="#modeldata">ModelData</a></h3>\r
\r
When <code>modelData</code> is modified, its new value will be merged with the old one via <a href="../api/symbols/Model.html#assignalldataproperties" target="api">Model.assignAllDataProperties</a>.\r
\r
<h2 id="stateful"><a class="not-prose heading-anchor" href="#stateful">Usage in a multi-component React app</a></h2>\r
\r
<p>\r
  Now that your Diagram's state is "wired in" with React, we can apply common React design patterns\r
  to create an app where users can change whether or not relinking is allowed on a Diagram.\r
</p>\r
<p>\r
  A basic setup can be seen in the <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">gojs-react-basic</a> project,\r
  but we'll describe some of the methodology here.\r
</p>\r
<p>\r
  First, we will take our Diagram wrapper from earlier and add more functionality to it:\r
</p>\r
<ul>\r
  <li>a set of props coming in from the parent component which holds state and handlers</li>\r
  <li>a ref to the <code>ReactDiagram</code> component so <code>getDiagram()</code> and <code>clear()</code> can be used</li>\r
  <li>a <code>useEffect</code> to add/remove app-specific diagram listeners</li>\r
</ul>\r
<p>\r
  This would be the new outline for the wrapper:\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
<p>\r
  And this will be the outline for the App component:\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
<p>\r
  Below is our finished Diagram wrapper. We pass linkDataArray and modelData as props to the ReactDiagram, but note that they are not always needed in gojs-react components,\r
  so your app may not need to include them. For proper initial loading of data, one should have the data ready before the ReactDiagram component mounts.\r
  This allows layouts and linking to occur properly with the initial data set.\r
</p>\r
<p>\r
  Some important details in this, and in the full example in the <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">gojs-react-basic</a> project,\r
  include management of <code>skipsDiagramUpdate</code>, the setting of <a href="../api/symbols/GraphLinksModel.html#linkkeyproperty" target="api">GraphLinksModel.linkKeyProperty</a>, and the <a href="../api/symbols/GraphLinksMode.html#makeuniquekeyfunction" target="api">GraphLinksMode.makeUniqueKeyFunction</a> and <a href="../api/symbols/GraphLinksModel.html#makeuniquelinkkeyfunction" target="api">GraphLinksModel.makeUniqueLinkKeyFunction</a>.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
\r
<h4 id="UsingWrapperComponentWithinApp">Using the wrapper component within the app</h4>\r
\r
<p>\r
  The application should set up a few things to be passed to the wrapper described above:\r
  <ul>\r
    <li>state containing a <code>nodeDataArray</code>, <code>linkDataArray</code>, <code>modelData</code> object, and <code>skipsDiagramUpdate</code> flag</li>\r
    <li>a <code>handleDiagramEvent</code> function for any app-specific <code>DiagramEvents</code>, such as <a href="events#ChangedSelection">'ChangedSelection'</a></li>\r
    <li>a <code>handleModelChange</code> function for updating state based on updates from the GoJS model</li>\r
  </ul>\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
<h4>A note on Diagram reinitialization</h4>\r
<p>\r
  Occasionally you may want to treat a model update as if you were loading a completely new model.\r
  But initialization is done via the initDiagram function and only when the ReactDiagram mounts,\r
  meaning that even merging an entirely new model would not reinitialize the Diagram.\r
</p>\r
<p>\r
  To address this problem, ReactDiagram exposes a clear() method.\r
  When called, it clears its diagram of all nodes, links, and model data, and\r
  prepares the next state update to be treated as a diagram initialization.\r
  That will result in an initial layout and perform initial diagram content alignment and scaling.\r
  Note that the initDiagram function is not called again.\r
</p>\r
<p>\r
  Here is a small sample of how one might trigger diagram reinitilization using the clear() method.\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
<p>\r
  These are the basics for setting up GoJS within a React application. See <a href="https://github.com/NorthwoodsSoftware/gojs-react-basic" target="_blank">gojs-react-basic</a>\r
  for a working example and the <a href="https://github.com/NorthwoodsSoftware/gojs-react" target="_blank">gojs-react</a> Github page for further explanation of various props\r
  passed to the components.\r
</p>\r
`,codeBlocks:[{id:null,code:`/* App.css */\r
  .diagram-component {\r
    width: 400px;\r
    height: 400px;\r
    border: solid 1px black;\r
    background-color: white;\r
  }`,isExecutable:!1,language:`css`,initiallyVisible:!0},{id:null,code:`// App.js\r
  import React from 'react';\r
\r
  import go from 'gojs';\r
  import { ReactDiagram } from 'gojs-react';\r
\r
  import './App.css';  // contains .diagram-component CSS\r
\r
/**\r
  * Diagram initialization method, which is passed to the ReactDiagram component.\r
  * This method is responsible for making the diagram and initializing the model and any templates.\r
  * The model's data should not be set here, as the ReactDiagram component handles that via the other props.\r
  */\r
function initDiagram() {\r
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";\r
  const diagram =\r
    new go.Diagram(\r
      {\r
        'undoManager.isEnabled': true,  // must be set to allow for model change listening\r
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality\r
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },\r
        model: new go.GraphLinksModel(\r
          {\r
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel\r
          })\r
      });\r
\r
  // define a simple Node template\r
  diagram.nodeTemplate =\r
    new go.Node('Auto')  // the Shape will go around the TextBlock\r
      .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
      .add(\r
        new go.Shape('RoundedRectangle',\r
            { name: 'SHAPE', fill: 'white', strokeWidth: 0 })\r
          // Shape.fill is bound to Node.data.color\r
          .bind('fill', 'color'),\r
        new go.TextBlock({ margin: 8, editable: true })\r
          // TextBlock.text is bound to Node.data.key and vice versa.\r
          // \`TwoWay\` means that after editing, TextBlock.text updates Node.data.key.\r
          .bindTwoWay('text', 'key')\r
      );\r
\r
    return diagram;\r
  }\r
\r
  /**\r
   * This function handles any changes to the GoJS model.\r
   * It is here that you would make any updates to your React state, which is discussed below.\r
   */\r
  function handleModelChange(changes) {\r
    alert('GoJS model changed!');\r
  }\r
\r
// render function...\r
function App() {\r
  return (\r
    <div>\r
      ...\r
      <ReactDiagram\r
        initDiagram={initDiagram}\r
        divClassName='diagram-component'\r
        nodeDataArray={[\r
          { key: 'Alpha', color: 'lightblue',  loc: '0 0' },\r
          { key: 'Beta',  color: 'orange',     loc: '150 0' },\r
          { key: 'Gamma', color: 'lightgreen', loc: '0 150' },\r
          { key: 'Delta', color: 'pink',       loc: '150 150' }\r
        ]}\r
        linkDataArray={[\r
          { from: 'Alpha', to: 'Beta' },\r
          { from: 'Alpha', to: 'Gamma' },\r
          { from: 'Beta',  to: 'Beta' },\r
          { from: 'Gamma', to: 'Delta' },\r
          { from: 'Delta', to: 'Alpha' }\r
        ]}\r
        onModelChange={handleModelChange}\r
      />\r
      ...\r
    </div>\r
  );\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const DiagramWrapper = () => {\r
  const [diagramData, updateDiagramData] = useImmer({\r
    nodeDataArray: [{ text: "Alpha" }, ... ] ,\r
    linkDataArray: [{ from: "Alpha", to: "Alpha"}, ... ],\r
    skipsDiagramUpdate: false,\r
    ...\r
  });\r
\r
  // values that are not expected to change, like initialization and handler functions, should not be included in state.\r
  const initDiagram = () => {\r
    const diagram = new go.Diagram();\r
    ...\r
  }\r
\r
  return (\r
    <ReactDiagram\r
      {...diagramData}\r
      initDiagram={initDiagram}\r
    />\r
  );\r
}`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`function addNode() {\r
  updateDiagramData((draft) => {\r
    draft.nodeDataArray.push({ text: "Beta" });\r
  })\r
}`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`updateDiagramData((draft) => {\r
  // This will find the Node with a key of 1, and if it exists, set its "color" to "green".\r
  const node = draft.nodeDataArray.find(node => node.key === 1)\r
  if (node) node.color = "green"\r
})`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`updateDiagramData((draft) => {\r
  // This will find the Node with a key of one, and if it exists, remove its "color" property.\r
  const node = draft.nodeDataArray.find(node => node.key === 1)\r
  if (node) node.color = undefined\r
})`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`updateDiagramData((draft) => {\r
  draft.nodeDataArray.push({ key: 2, color: "purple" }) // "key" may be omitted; GoJS will generate a key for it.\r
})`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`updateDiagramData((draft) => {\r
  // This will find the Node with a key of 1, and if it exists, remove it\r
  const nodeIndex = draft.nodeDataArray.findIndex(node => node.key === 1)\r
  if (nodeIndex) draft.nodeDataArray.splice(nodeIndex, 1)\r
})`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`// props will contain several properties, like \`nodeDataArray\`, \`skipsDiagramUpdate\`, and \`onDiagramEvent\`\r
export const DiagramWrapper = (props) {\r
  // Ref to ReactDiagram\r
  const diagramRef = useRef(null);\r
\r
  // App-specific diagram listeners\r
  useEffect(() => {\r
    // Add listeners\r
    return () => {\r
      // Remove listeners\r
    }\r
  });\r
\r
  const initDiagram = () => {\r
    const diagram = new go.Diagram(...);\r
    ...\r
    return diagram;\r
  }\r
\r
  return (<ReactDiagram\r
    ref={diagramRef}\r
    initDiagram={initDiagram}\r
    {...props}\r
  />)\r
}`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`export const App = () => {\r
  const [diagramData, updateDiagramData] = useImmer({\r
    nodeDataArray: ...,\r
    linkDataArray: ...,\r
    modelData: { canRelink: true },\r
    selectedKey: null,\r
    ...\r
  })\r
\r
  // Update the modelData\r
  const handleRelinkChange = (e) => {\r
    const value = e.target.value\r
    updateDiagramData(draft => {\r
      draft.modelData = { canRelink: value }\r
    })\r
  }\r
\r
  // Add any other handlers\r
\r
  return (\r
    <>\r
      <ReactDiagram\r
        {...diagramData}\r
        {/* Pass any diagram-specific handlers */}\r
      />\r
      <input\r
        type="checkbox"\r
        onChange={handleRelinkChange}\r
      />\r
    </>\r
  )\r
}`,isExecutable:!1,language:`jsx`,initiallyVisible:!0},{id:null,code:`import go from 'gojs';\r
import { ReactDiagram } from 'gojs-react';\r
import { useEffect, useRef } from 'react';\r
\r
// props passed in from a parent component holding state, some of which will be passed to ReactDiagram\r
interface DiagramProps {\r
  nodeDataArray: Array<go.ObjectData>;\r
  linkDataArray: Array<go.ObjectData>;\r
  modelData: go.ObjectData;\r
  skipsDiagramUpdate: boolean;\r
  onDiagramEvent: (e: go.DiagramEvent) => void;\r
  onModelChange: (e: go.IncrementalData) => void;\r
}\r
\r
export const DiagramWrapper = (props: DiagramProps) => {\r
  // Ref to keep a reference to the component, which provides access to the GoJS diagram via getDiagram().\r
  const diagramRef = useRef<ReactDiagram>(null);\r
\r
  // add/remove listeners\r
  // only done on mount, not any time there's a change to props.onDiagramEvent\r
  useEffect(() => {\r
    if (diagramRef.current === null) return;\r
    const diagram = diagramRef.current.getDiagram();\r
    if (diagram instanceof go.Diagram) {\r
      diagram.addDiagramListener('ChangedSelection', props.onDiagramEvent);\r
    }\r
    return () => {\r
      if (diagram instanceof go.Diagram) {\r
        diagram.addDiagramListener('ChangedSelection', props.onDiagramEvent);\r
      }\r
      return () => {\r
        if (diagram instanceof go.Diagram) {\r
          diagram.removeDiagramListener('ChangedSelection', props.onDiagramEvent);\r
        }\r
      };\r
    }, []);\r
\r
    /**\r
     * Diagram initialization function, which is passed to the ReactDiagram component.\r
     * This is responsible for making the diagram and initializing the model, any templates,\r
     * and maybe doing other initialization tasks like customizing tools.\r
     * The model's data should not be set here, as the ReactDiagram component handles that via the other props.\r
     */\r
    const initDiagram = (): go.Diagram => {\r
      // set your license key here before creating the diagram: go.Diagram.licenseKey = '...';\r
      const diagram =\r
        new go.Diagram(\r
          {\r
            'undoManager.isEnabled': true,  // must be set to allow for model change listening\r
            // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality\r
            'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },\r
            model: new go.GraphLinksModel(\r
              {\r
                linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel\r
                // positive keys for nodes\r
                makeUniqueKeyFunction: (m: go.Model, data: any) => {\r
                  let k = data.key || 1;\r
                  while (m.findNodeDataForKey(k)) k++;\r
                  data.key = k;\r
                  return k;\r
                },\r
                // negative keys for links\r
                makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {\r
                  let k = data.key || -1;\r
                  while (m.findLinkDataForKey(k)) k--;\r
                  data.key = k;\r
                  return k;\r
                }\r
              })\r
          });\r
\r
      // define a simple Node template\r
      diagram.nodeTemplate =\r
        new go.Node('Auto')  // the Shape will go around the TextBlock\r
          .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
          .add(\r
            new go.Shape('RoundedRectangle',\r
              {\r
                name: 'SHAPE', fill: 'white', strokeWidth: 0,\r
                // set the port properties:\r
                portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'\r
              })\r
              // Shape.fill is bound to Node.data.color\r
              .bind('fill', 'color'),\r
            new go.TextBlock(\r
              { margin: 8, editable: true, font: '400 .875rem Roboto, sans-serif' })  // some room around the text\r
              .bindTwoWay('text')\r
          );\r
\r
      // relinking depends on modelData\r
      diagram.linkTemplate =\r
        new go.Link()\r
          .bindModel('relinkableFrom', 'canRelink')\r
          .bindModel('relinkableTo', 'canRelink')\r
          .add(\r
            new go.Shape(),\r
            new go.Shape({ toArrow: 'Standard' })\r
          );\r
\r
      return diagram;\r
    };\r
\r
  /**\r
    * Diagram initialization function, which is passed to the ReactDiagram component.\r
    * This is responsible for making the diagram and initializing the model, any templates,\r
    * and maybe doing other initialization tasks like customizing tools.\r
    * The model's data should not be set here, as the ReactDiagram component handles that via the other props.\r
    */\r
  const initDiagram = (): go.Diagram => {\r
    // set your license key here before creating the diagram: go.Diagram.licenseKey = '...';\r
    const diagram =\r
      new go.Diagram(\r
        {\r
          'undoManager.isEnabled': true,  // must be set to allow for model change listening\r
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality\r
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },\r
          model: new go.GraphLinksModel(\r
            {\r
              linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel\r
              // positive keys for nodes\r
              makeUniqueKeyFunction: (m: go.Model, data: any) => {\r
                let k = data.key || 1;\r
                while (m.findNodeDataForKey(k)) k++;\r
                data.key = k;\r
                return k;\r
              },\r
              // negative keys for links\r
              makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {\r
                let k = data.key || -1;\r
                while (m.findLinkDataForKey(k)) k--;\r
                data.key = k;\r
                return k;\r
              }\r
            })\r
        });\r
\r
    // define a simple Node template\r
    diagram.nodeTemplate =\r
      new go.Node('Auto')  // the Shape will go around the TextBlock\r
        .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)\r
        .add(\r
          new go.Shape('RoundedRectangle',\r
            {\r
              name: 'SHAPE', fill: 'white', strokeWidth: 0,\r
              // set the port properties:\r
              portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'\r
            })\r
            // Shape.fill is bound to Node.data.color\r
            .bind('fill', 'color'),\r
          new go.TextBlock(\r
            { margin: 8, editable: true, font: '400 .875rem Roboto, sans-serif' })  // some room around the text\r
            .bindTwoWay('text')\r
        );\r
\r
    // relinking depends on modelData\r
    diagram.linkTemplate =\r
      new go.Link()\r
        .bindModel('relinkableFrom', 'canRelink')\r
        .bindModel('relinkableTo', 'canRelink')\r
        .add(\r
          new go.Shape(),\r
          new go.Shape({ toArrow: 'Standard' })\r
        );\r
\r
    return diagram;\r
  };`,isExecutable:!1,language:`tsx`,initiallyVisible:!0},{id:null,code:`import go from 'gojs';\r
import { useEffect } from 'react';\r
import { useImmer } from 'use-immer';  // we use Immer here for simple immutable updates\r
\r
  import { DiagramWrapper } from './components/Diagram';\r
\r
interface AppState {\r
  // ...\r
  nodeDataArray: Array<go.ObjectData>;\r
  linkDataArray: Array<go.ObjectData>;\r
  modelData: go.ObjectData;\r
  selectedKey: number | null;\r
  skipsDiagramUpdate: boolean;\r
}\r
\r
export const App = () => {\r
  // Diagram state\r
  const [diagramData, updateDiagramData] = useImmer<AppState>({\r
    nodeDataArray: [\r
      { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },\r
      { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },\r
      { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },\r
      { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }\r
    ],\r
    linkDataArray: [\r
      { key: -1, from: 0, to: 1 },\r
      { key: -2, from: 0, to: 2 },\r
      { key: -3, from: 1, to: 1 },\r
      { key: -4, from: 2, to: 3 },\r
      { key: -5, from: 3, to: 0 }\r
    ],\r
    modelData: { canRelink: true },\r
    selectedKey: null,\r
    skipsDiagramUpdate: false\r
  });\r
\r
  /**\r
    * Handle any app-specific DiagramEvents, in this case just selection changes.\r
    * On ChangedSelection, find the corresponding data and set the selectedKey state.\r
    *\r
    * This is not required, and is only needed when handling DiagramEvents from the GoJS diagram.\r
    * @param e a GoJS DiagramEvent\r
    */\r
  const handleDiagramEvent = (e: go.DiagramEvent) => {\r
    const name = e.name;\r
    switch (name) {\r
      case 'ChangedSelection': {\r
        const sel = e.subject.first();\r
        updateDiagramData(draft => {\r
          if (sel) {\r
            draft.selectedKey = sel.key;\r
          } else {\r
            draft.selectedKey = null;\r
          }\r
        });\r
        break;\r
      }\r
      default: break;\r
    }\r
  };\r
\r
  /**\r
    * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.\r
    * This method should iterate over those changes and update state to keep in sync with the GoJS model.\r
    * This can be done via setState in React or another preferred state management method,\r
    * such as updateDiagramData in a case like this.\r
    * @param obj a JSON-formatted string\r
    */\r
  const handleModelChange = (obj: go.IncrementalData) => {\r
    // const insertedNodeKeys = obj.insertedNodeKeys;\r
    // const modifiedNodeData = obj.modifiedNodeData;\r
    // const removedNodeKeys = obj.removedNodeKeys;\r
    // const insertedLinkKeys = obj.insertedLinkKeys;\r
    // const modifiedLinkData = obj.modifiedLinkData;\r
    // const removedLinkKeys = obj.removedLinkKeys;\r
    // const modifiedModelData = obj.modelData;\r
\r
    // see gojs-react-basic for an example model change handler\r
    // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update\r
  };\r
\r
  /**\r
    * Handle changes to the checkbox on whether to allow relinking.\r
    * @param e a change event from the checkbox\r
    */\r
  const handleRelinkChange = (e: any) => {\r
    const target = e.target;\r
    const value = target.checked;\r
    updateDiagramData(draft => {\r
      draft.modelData = { canRelink: value };\r
      draft.skipsDiagramUpdate = false;\r
    });\r
  };\r
\r
  let selKey;\r
  if (diagramData.selectedKey !== null) {\r
    selKey = <p>Selected key: {diagramData.selectedKey}</p>;\r
  }\r
\r
  export const App = () => {\r
    // Diagram state\r
    const [diagramData, updateDiagramData] = useImmer<AppState>({\r
      nodeDataArray: [\r
        { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },\r
        { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },\r
        { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },\r
        { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }\r
      ],\r
      linkDataArray: [\r
        { key: -1, from: 0, to: 1 },\r
        { key: -2, from: 0, to: 2 },\r
        { key: -3, from: 1, to: 1 },\r
        { key: -4, from: 2, to: 3 },\r
        { key: -5, from: 3, to: 0 }\r
      ],\r
      modelData: { canRelink: true },\r
      selectedKey: null,\r
      skipsDiagramUpdate: false\r
    });\r
\r
    /**\r
     * Handle any app-specific DiagramEvents, in this case just selection changes.\r
     * On ChangedSelection, find the corresponding data and set the selectedKey state.\r
     *\r
     * This is not required, and is only needed when handling DiagramEvents from the GoJS diagram.\r
     * @param e a GoJS DiagramEvent\r
     */\r
    const handleDiagramEvent = (e: go.DiagramEvent) => {\r
      const name = e.name;\r
      switch (name) {\r
        case 'ChangedSelection': {\r
          const sel = e.subject.first();\r
          updateDiagramData(draft => {\r
            if (sel) {\r
              draft.selectedKey = sel.key;\r
            } else {\r
              draft.selectedKey = null;\r
            }\r
          });\r
          break;\r
        }\r
        default: break;\r
      }\r
    };\r
\r
    /**\r
     * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.\r
     * This method should iterate over those changes and update state to keep in sync with the GoJS model.\r
     * This can be done via setState in React or another preferred state management method,\r
     * such as updateDiagramData in a case like this.\r
     * @param obj a JSON-formatted string\r
     */\r
    const handleModelChange = (obj: go.IncrementalData) => {\r
      // const insertedNodeKeys = obj.insertedNodeKeys;\r
      // const modifiedNodeData = obj.modifiedNodeData;\r
      // const removedNodeKeys = obj.removedNodeKeys;\r
      // const insertedLinkKeys = obj.insertedLinkKeys;\r
      // const modifiedLinkData = obj.modifiedLinkData;\r
      // const removedLinkKeys = obj.removedLinkKeys;\r
      // const modifiedModelData = obj.modelData;\r
\r
      // see gojs-react-basic for an example model change handler\r
      // when setting state, be sure to set skipsDiagramUpdate: true since GoJS already has this update\r
    };\r
\r
    /**\r
     * Handle changes to the checkbox on whether to allow relinking.\r
     * @param e a change event from the checkbox\r
     */\r
    const handleRelinkChange = (e: any) => {\r
      const target = e.target;\r
      const value = target.checked;\r
      updateDiagramData(draft => {\r
        draft.modelData = { canRelink: value };\r
        draft.skipsDiagramUpdate = false;\r
      });\r
    };\r
\r
    let selKey;\r
    if (diagramData.selectedKey !== null) {\r
      selKey = <p>Selected key: {diagramData.selectedKey}</p>;\r
    }\r
\r
    return (\r
      <div>\r
        <DiagramWrapper\r
          nodeDataArray={diagramData.nodeDataArray}\r
          linkDataArray={diagramData.linkDataArray}\r
          modelData={diagramData.modelData}\r
          skipsDiagramUpdate={diagramData.skipsDiagramUpdate}\r
          onDiagramEvent={handleDiagramEvent}\r
          onModelChange={handleModelChange}\r
        />\r
        <label>\r
          Allow Relinking?\r
          <input\r
            type='checkbox'\r
            id='relink'\r
            checked={diagramData.modelData.canRelink}\r
            onChange={handleRelinkChange} />\r
        </label>\r
        {selKey}\r
      </div>\r
    );\r
  }`,isExecutable:!1,language:`tsx`,initiallyVisible:!0},{id:null,code:`const reinitModel = () => {\r
  diagramRef.current.clear();\r
  updateDiagramData(draft => {\r
    draft.nodeDataArray = [\r
      { key: 0, text: 'Epsilon', color: 'lightblue' },\r
      { key: 1, text: 'Zeta', color: 'orange' },\r
      { key: 2, text: 'Eta', color: 'lightgreen' },\r
      { key: 3, text: 'Theta', color: 'pink' }\r
    ];\r
    draft.linkDataArray = [\r
      { key: -1, from: 0, to: 1 },\r
      { key: -2, from: 0, to: 2 },\r
      { key: -3, from: 1, to: 1 },\r
      { key: -4, from: 2, to: 3 },\r
      { key: -5, from: 3, to: 0 }\r
    ];\r
    draft.skipsDiagramUpdate = false;\r
  });\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`z6p8h1`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};