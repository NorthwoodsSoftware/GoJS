import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Testing GoJS apps`,category:`Dev Environment`},htmlContent:`<h1>Testing GoJS apps</h1>\r
\r
<p>\r
  The <b>emit...</b> methods of the <a href="../api/symbols/Diagram.html" target="api">Diagram</a> class are useful for pretending to interact with\r
  a Diagram without actually generating any keyboard or mouse or pointer events.\r
  See the sample at <a href="../samples/Robot">Simulating Inputs</a>.\r
</p>\r
<p>\r
  One convenient feature of those methods such as <a href="../api/symbols/Diagram.html#emitmousedown" target="api">Diagram.emitMouseDown</a> is that they use document coordinates,\r
  so that changes in the viewport size or diagram content alignment,\r
  scroll position, or zoom level will not affect the calls.\r
</p>\r
\r
\r
<h2 id="TestingwithJest"><a class="not-prose heading-anchor" href="#TestingwithJest">Testing with Jest</a></h2>\r
\r
<p>Testing with Jest depends on installing: <code>jest</code>, <code>puppeteer</code>, and <code>jest-puppeteer</code>.</p>\r
\r
<!-- CODE_BLOCK_0 -->\r
\r
<!-- CODE_BLOCK_1 -->\r
\r
<h3 id="TestingwithJestInReact"><a class="not-prose heading-anchor" href="#TestingwithJestInReact">Testing with Jest in React</a></h3>\r
\r
<p>\r
  In our\r
  <a href="https://github.com/NorthwoodsSoftware/gojs-react-samples/tree/main/gojs-react-jest">GoJS React samples</a>, we have an example of using the\r
  gojs-react component with Jest: <a href="https://github.com/NorthwoodsSoftware/gojs-react-samples/tree/main/gojs-react-jest">gojs-react-jest</a>.\r
</p>\r
\r
\r
<h2 id="TestingwithCypress"><a class="not-prose heading-anchor" href="#TestingwithCypress">Testing with Cypress</a></h2>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="TestingwithPlaywright"><a class="not-prose heading-anchor" href="#TestingwithPlaywright">Testing with Playwright</a></h2>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
\r
<h2 id="TestingwithTestCafe"><a class="not-prose heading-anchor" href="#TestingwithTestCafe">Testing with TestCafe</a></h2>\r
\r
<!-- CODE_BLOCK_4 -->\r
`,codeBlocks:[{id:null,code:`// jest.config.js\r
module.exports = {\r
  preset: "jest-puppeteer"\r
};`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// An example Jest test script for testing the unmodified Minimal sample,\r
// which is available at https://gojs.net/latest/samples/minimal.html.\r
// Copyright 1998-2026 by Northwoods Software Corporation\r
\r
describe("minimal", () => {\r
  beforeAll(async () => {\r
    await page.goto('https://gojs.net/latest/samples/minimal.html');\r
  });\r
\r
  it('should show 4 nodes and 5 links', async () => {\r
    expect(await page.locator("#myDiagramDiv")).not.toBeNull();\r
\r
    expect(await page.waitForFunction(() => {\r
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;\r
      return myDiagram.nodes.count === 4 &&\r
             myDiagram.links.count === 5;\r
    })).toBeTruthy();\r
  });\r
\r
  it('show that the Beta node is orange', async () => {\r
    expect(await page.waitForFunction(() => {\r
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;\r
      const beta = myDiagram.findNodeForKey(2);\r
      return beta !== null && beta.data.color === "orange";\r
    })).toBeTruthy();\r
  });\r
\r
  it('demonstrates deleting a node', async () => {\r
    expect(await page.waitForFunction(() => {\r
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;\r
      const beta = myDiagram.findNodeForKey(2);\r
      myDiagram.select(beta);\r
      myDiagram.commandHandler.deleteSelection();\r
      return true;\r
    })).toBeTruthy();\r
\r
    expect(await page.waitForFunction(() => {\r
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;\r
      return myDiagram.nodes.count === 3 &&\r
             myDiagram.links.count === 3 &&\r
             myDiagram.findNodeForKey(2) === null;\r
    })).toBeTruthy();\r
  });\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// An example Cypress test script for testing the unmodified Minimal sample,\r
// which is available at https://gojs.net/latest/samples/minimal.html.\r
// Copyright 1998-2026 by Northwoods Software Corporation\r
\r
describe("minimal", () => {\r
  let myDiagram = null\r
\r
  beforeEach(() => {\r
    // more likely you would be running the sample locally,\r
    // say at http://localhost:5500/samples/minimal.html\r
    cy.visit("https://gojs.net/latest/samples/minimal")\r
\r
    // make sure the HTMLDivElement exists holding the Diagram\r
    cy.get("#myDiagramDiv")\r
\r
    // save these references for each test, which simplifies each test code\r
    cy.window().then(win => {\r
      myDiagram = win.go.Diagram.fromDiv(win.document.getElementById("myDiagramDiv"));\r
    })\r
\r
    // wait for the Diagram to finish initializing; is there a better way?\r
    cy.wait(1)\r
  })\r
\r
  // A minimal test to make sure the Diagram got set up OK.\r
  it("has nodes and links", () => {\r
    cy.window().then(win => {\r
      expect(myDiagram.nodes.count).to.equal(4)\r
      expect(myDiagram.links.count).to.equal(5)\r
\r
      const delta = myDiagram.findNodeForKey(4);\r
      expect(delta).to.not.equal(null)\r
      expect(delta.elt(0).fill).to.equal("pink")\r
    })\r
  })\r
\r
  // A test that simulates inputs by emitting InputEvents.\r
  it("copies a node", () => {\r
    cy.window().then(win => {\r
      // Find the center of the Delta node in document coordinates.\r
      const delta = myDiagram.findNodeForKey(4);\r
      const loc = delta.actualBounds.center;\r
\r
      // Simulate a mouse drag to move the Delta node:\r
      const options = { control: true, alt: true };\r
      myDiagram.emitMouseDown(loc.x, loc.y, 0, options);\r
      myDiagram.emitMouseMove(loc.x + 80, loc.y + 50, 50, options);\r
      myDiagram.emitMouseMove(loc.x + 20, loc.y + 100, 100, options);\r
      myDiagram.emitMouseUp(loc.x + 20, loc.y + 100, 150, options);\r
      // If successful, this will have made a copy of the "Delta" node below it.\r
\r
      // Check that the new node is at the drop point,\r
      // and that it is a copy, different from the original node.\r
      const newloc = new win.go.Point(loc.x + 20, loc.y + 100);\r
      const newnode = myDiagram.findPartAt(newloc);\r
      expect(newnode).to.not.equal(delta)\r
      expect(newnode.key).to.equal("Delta2")\r
      expect(newnode.isSelected).to.equal(true)\r
    })\r
  })\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// @ts-check\r
import { test, expect } from '@playwright/test';\r
import go from 'gojs';  // just for go.Point.parse\r
\r
// First make sure you install gojs and create-gojs-kit:\r
// $ npm i gojs\r
// $ npm i create-gojs-kit\r
\r
// $ npx playwright test\r
\r
// Then your tests can open your web app and evaluate JavaScript test code on the page.\r
\r
test.describe('minimal tests', () => {\r
  test.beforeEach(async ({ page }) => {\r
    await page.goto('https://gojs.net/latest/samples/minimal.html');\r
    await expect(page.locator('#myDiagramDiv')).toBeVisible();\r
  });\r
\r
  // This selects node "Beta" (key: 2) and then copies and pastes.\r
  // This should add both one Node and one Link to the Diagram.\r
  // The paste is performed a bit away from where the nodes are, and that is checked too.\r
  test('copy node', async ({ page }) => {\r
    const numNodesLinks = await page.evaluate(() => {\r
      const div = document.getElementById('myDiagramDiv');\r
      if (!div) return;\r
      const diagram = go.Diagram.fromDiv(div);\r
      if (!diagram) return;\r
      const node2 = diagram.findNodeForKey(2);\r
      if (!node2) return;\r
      diagram.select(node2);\r
      diagram.commandHandler.copySelection();\r
      diagram.commandHandler.pasteSelection(new go.Point(150, -50));\r
      const newnode = diagram.selection.first();\r
      return [diagram.nodes.count, diagram.links.count, newnode ? go.Point.stringify(newnode.location) : ''];\r
    });\r
    expect(Array.isArray(numNodesLinks)).toBe(true)\r
    expect(numNodesLinks[0]).toBe(5);\r
    expect(numNodesLinks[1]).toBe(6);\r
    // Note that this is executing the static Point.parse function in the test environment, not on the page.\r
    const pt = go.Point.parse(numNodesLinks[2]);\r
    expect(pt.x).toBeCloseTo(124, 0);\r
    expect(pt.y).toBeCloseTo(-68, 0);\r
  });\r
\r
  // This simulates mouse events dragging node "Beta" (key: 2).\r
  // It checks the new location.\r
  test('drag node', async ({ page }) => {\r
    const newloc = await page.evaluate(() => {\r
      const div = document.getElementById('myDiagramDiv');\r
      if (!div) return;\r
      const diagram = go.Diagram.fromDiv(div);\r
      if (!diagram) return;\r
      const node2 = diagram.findNodeForKey(2);\r
      if (!node2) return;\r
      const loc2 = node2.actualBounds.center;\r
      diagram.emitMouseDown(loc2.x, loc2.y, 0);\r
      diagram.emitMouseMove(loc2.x-10, loc2.y-20, 100);\r
      diagram.emitMouseMove(loc2.x-20, loc2.y-30, 200);\r
      diagram.emitMouseUp(loc2.x-25, loc2.y-50, 300);\r
      return go.Point.stringify(node2.location);\r
    });\r
    if (typeof newloc === 'string') {\r
      const pt = go.Point.parse(newloc);\r
      expect(pt.x).toBeCloseTo(55, 0);\r
      expect(pt.y).toBeCloseTo(-50, 0);\r
    }\r
  });\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`import { ClientFunction, Selector } from 'testcafe';\r
import go from "gojs";  // just for go.Point.parse\r
\r
// First make sure you install gojs and create-gojs-kit:\r
// $ npm i gojs\r
// $ npm i create-gojs-kit\r
\r
// $ npx testcafe firefox tests/test.js --live\r
\r
fixture('minimal tests')\r
    .page('https://gojs.net/latest/samples/minimal.html')\r
\r
// Tests\r
\r
test('copy node', async t => {\r
  const numNodesLinks = await t\r
    .expect(Selector('#myDiagramDiv').exists).ok()\r
    .eval(() => {\r
      const div = document.getElementById('myDiagramDiv');\r
      const diagram = go.Diagram.fromDiv(div);\r
      if (!diagram) return;\r
      const node2 = diagram.findNodeForKey(2);\r
      if (!node2 || node2.isSelected) return;\r
      diagram.select(node2);\r
      diagram.commandHandler.copySelection();\r
      diagram.commandHandler.pasteSelection(new go.Point(150, -50));\r
      const newnode = diagram.selection.first();\r
      return [diagram.nodes.count, diagram.links.count, newnode ? go.Point.stringify(newnode.location) : ''];\r
    });\r
  await t\r
    .expect(Array.isArray(numNodesLinks)).ok()\r
    .expect(numNodesLinks[0]).eql(5)\r
    .expect(numNodesLinks[1]).eql(6)\r
  // Note that this is executing the static Point.parse function in the test environment, not on the page.\r
  const pt = go.Point.parse(numNodesLinks[2]);\r
  await t\r
    .expect(pt.x).within(123, 125)\r
    .expect(pt.y).within(-70, -68)\r
})\r
\r
test('drag node', async t => {\r
  const newloc = await t.eval(() => {\r
    const div = document.getElementById('myDiagramDiv');\r
    const diagram = go.Diagram.fromDiv(div);\r
    if (!diagram) return;\r
    const node2 = diagram.findNodeForKey(2);\r
    if (!node2 || node2.isSelected) return;\r
    const loc2 = node2.actualBounds.center;\r
    diagram.emitMouseDown(loc2.x, loc2.y, 0);\r
    diagram.emitMouseMove(loc2.x-10, loc2.y-20, 100);\r
    diagram.emitMouseMove(loc2.x-20, loc2.y-30, 200);\r
    diagram.emitMouseUp(loc2.x-25, loc2.y-50, 300);\r
    return go.Point.stringify(node2.location);\r
  });\r
  if (typeof newloc === 'string') {\r
    const pt = go.Point.parse(newloc);\r
    await t\r
      .expect(pt.x).within(55, 56)\r
      .expect(pt.y).within(-51, -50)\r
  }\r
})`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`dt1hoa`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};