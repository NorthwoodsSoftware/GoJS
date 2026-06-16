import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Collections`},htmlContent:`<h1>Collections</h1>\r
<p>\r
  GoJS provides its own collection classes: <a href="../api/symbols/List.html" target="api">List</a>, <a href="../api/symbols/Set.html" target="api">Set</a>, and <a href="../api/symbols/Map.html" target="api">Map</a>.\r
  The latter two are very similar to the JavaScript <b>Set</b> and <b>Map</b> classes.\r
  By default, iteration is different, using an <a href="../api/symbols/Iterator.html" target="api">Iterator</a> instead of the JavaScript <b>Iterable</b> protocol.\r
  As of GoJS 3.0, List, Set, and Map also implement the JavaScript <b>Iterable</b> protocol with the <code>[iterable]</code> property, \r
  allowing the use of <code>for (let item of list/set/map) ...</code> and spread syntax.\r
</p>\r
<p>\r
  While GoJS methods return these proprietary collection types, most methods will also accept the built in JavaScript versions, \r
  which may often be preferable for consistency with modern standards. Like the JavaScript collections, they are generic in TypeScript, \r
  and thus can enforce type checking at compile time. One potential advantage of the GoJS collections is that they can be made \r
  read-only to avoid unwanted modifications at runtime.\r
</p>\r
<p>\r
  In GoJS most of the properties and methods that return collections describing the structure of the diagram return an <a href="../api/symbols/Iterator.html" target="api">Iterator</a>.\r
  That is because the implementation of the collections are internal — you only need to know how to iterate over the result collection.\r
  Other methods or properties will allow you to modify the diagram.\r
  An example is <a href="../api/symbols/Diagram.html#nodes" target="api">Diagram.nodes</a>, which returns the current collection of <a href="../api/symbols/Node.html" target="api">Node</a>s and <a href="../api/symbols/Group.html" target="api">Group</a>s in the diagram as an <a href="../api/symbols/Iterator.html" target="api">Iterator</a>.\r
  The collection is automatically modified as the programmer adds or removes node data in the model or by direct calls to\r
  <a href="../api/symbols/Diagram.html#add" target="api">Diagram.add</a> or <a href="../api/symbols/Diagram.html#remove" target="api">Diagram.remove</a>.</p>\r
<p>\r
  However, there are a few properties that return collections that are allowed to be modified.\r
  Examples include collections on classes that are mutable when constructed but usually frozen after initialization:\r
  <a href="../api/symbols/Geometry.html#figures" target="api">Geometry.figures</a>, <a href="../api/symbols/PathFigure.html#segments" target="api">PathFigure.segments</a>, and <a href="../api/symbols/Brush.html#colorstops" target="api">Brush.colorStops</a>.\r
  Other examples include collections that are modified very infrequently, usually only upon diagram initialization:\r
  <a href="../api/symbols/ToolManager.html#mousedowntools" target="api">ToolManager.mouseDownTools</a> (and the other lists of tools) and <a href="../api/symbols/Diagram.html#nodetemplatemap" target="api">Diagram.nodeTemplateMap</a>\r
  (and other template maps).\r
</p>\r
<p>\r
  See samples that make use of collections in the <a href="../samples/#collections">samples index</a>.\r
</p>\r
\r
\r
<h2 id="List"><a class="not-prose heading-anchor" href="#List">List</a></h2>\r
<p>\r
  A <a href="../api/symbols/List.html" target="api">List</a> is an ordered collection of values that are indexed by integers from zero to one less than the <a href="../api/symbols/List.html#count" target="api">List.count</a>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  However, if you are writing in TypeScript, GoJS collections classes (<code>List</code>, <code>Map</code>, <code>Set</code>) are now generic, and will help you enforce types:\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
<p>\r
  To iterate over a <a href="../api/symbols/List.html" target="api">List</a>, get its <a href="../api/symbols/List.html#iterator" target="api">List.iterator</a> and call <a href="../api/symbols/Iterator.html#next" target="api">Iterator.next</a>\r
  on it to advance its position in the list.  Its <a href="../api/symbols/Iterator.html#value" target="api">Iterator.value</a> will be a list item;\r
  its <a href="../api/symbols/Iterator.html#key" target="api">Iterator.key</a> will be the corresponding index in the list.  Or, more commonly,\r
  just call <a href="../api/symbols/List.html#each" target="api">List.each</a>.\r
</p>\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="Set"><a class="not-prose heading-anchor" href="#Set">Set</a></h2>\r
<p>\r
  A <a href="../api/symbols/Set.html" target="api">Set</a> is an unordered collection of values that does not allow duplicate values.\r
  This class is similar to the <code>Set</code> object that is built into JavaScript.\r
</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  When writing TypeScript, it is a generic class so that the compiler can enforce types:\r
</p>\r
<!-- CODE_BLOCK_4 -->\r
\r
<p>\r
  Iterating over the items in a <a href="../api/symbols/Set.html" target="api">Set</a> is just like iterating over a <a href="../api/symbols/List.html" target="api">List</a>,\r
  except that the order of the items may vary.\r
</p>\r
<!-- CODE_BLOCK_5 -->\r
\r
<p>\r
  Furthermore, as of version 3, <a href="../api/symbols/Set.html" target="api">Set</a> implements the JavaScript <b>Iterable</b> protocol,\r
  by defining the <code>[Symbol.iterator]</code> property.\r
  This allows using the <code>for (let item of set) ...</code> statement.\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
\r
<p>\r
  Thus <a href="../api/symbols/Set.html" target="api">Set</a>s can be used with spread syntax.  For example:\r
</p>\r
<!-- CODE_BLOCK_7 -->\r
\r
\r
<h2 id="Map"><a class="not-prose heading-anchor" href="#Map">Map</a></h2>\r
<p>\r
  A <a href="../api/symbols/Map.html" target="api">Map</a> is an unordered collection of key-value pairs that are indexed by the keys.\r
  This class is similar to the <code>Map</code> object that is built into JavaScript.\r
</p>\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  When writing TypeScript, it is a generic class so that the compiler can enforce types:\r
</p>\r
<!-- CODE_BLOCK_9 -->\r
\r
<p>\r
  Iterating over the items in a <a href="../api/symbols/Map.html" target="api">Map</a> is just like iterating over a <a href="../api/symbols/List.html" target="api">List</a>,\r
  but offering access to both the keys and the values.\r
  As with <a href="../api/symbols/Set.html" target="api">Set</a>s the order of the items may vary.\r
</p>\r
<!-- CODE_BLOCK_10 -->\r
<p>\r
  Typically one uses <a href="../api/symbols/Map.html#iteratorkeys" target="api">Map.iteratorKeys</a> or <a href="../api/symbols/Map.html#iteratorvalues" target="api">Map.iteratorValues</a>\r
  when needing to pass a collection on to other methods that take an <a href="../api/symbols/Iterator.html" target="api">Iterator</a>.\r
</p>\r
\r
<p>\r
  As of version 3, <a href="../api/symbols/Map.html" target="api">Map</a> implements the JavaScript <b>Iterable</b> protocol,\r
  by defining the <code>[Symbol.iterator]</code> property.\r
  This allows using the <code>for (let item of map) ...</code> statement.\r
</p>\r
<!-- CODE_BLOCK_11 -->\r
\r
\r
<h2 id="MoreIterationExamples"><a class="not-prose heading-anchor" href="#MoreIterationExamples">More iteration examples</a></h2>\r
\r
<p>\r
It is commonplace to iterate over the selected <a href="../api/symbols/Part.html" target="api">Part</a>s of a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>:\r
</p>\r
<!-- CODE_BLOCK_12 -->\r
<p>Alternatively:</p>\r
<!-- CODE_BLOCK_13 -->\r
\r
<p>\r
Sometimes one needs to iterate over the <a href="../api/symbols/Node.html" target="api">Node</a>s in a <a href="../api/symbols/Diagram.html" target="api">Diagram</a>:\r
</p>\r
<!-- CODE_BLOCK_14 -->\r
\r
<p>\r
You can also iterate over the port elements in a <a href="../api/symbols/Node.html" target="api">Node</a>, or the <a href="../api/symbols/Link.html" target="api">Link</a>s connected to a port element:\r
</p>\r
<!-- CODE_BLOCK_15 -->\r
\r
<p>\r
Or perhaps you need to iterate over the elements of a <a href="../api/symbols/Panel.html" target="api">Panel</a>:\r
</p>\r
<!-- CODE_BLOCK_16 -->\r
\r
<p>\r
If you want to find <a href="../api/symbols/Node.html" target="api">Node</a>s that are immediate members of a <a href="../api/symbols/Group.html" target="api">Group</a>:\r
</p>\r
<!-- CODE_BLOCK_17 -->\r
`,codeBlocks:[{id:null,code:`const l = new go.List();\r
l.add("A");\r
l.add("B");\r
l.add("C");\r
\r
assert(l.count === 3);\r
assert(l.elt(0) === "A");\r
assert(l.has("B"));\r
assert(l.indexOf("B") === 1);\r
\r
l.setElt(1, "z");  // replace an item\r
assert(l.elt(1) === "z");\r
\r
l.removeAt(1);  // remove an item\r
assert(l.count === 2);\r
assert(l.elt(1) === "C");`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// TypeScript:\r
const l = new go.List<string>(); // Create a list of only strings\r
l.add("A");\r
l.add(23);  // produces an error during compilation or highlights it in an IDE\r
l.add({});  // produces an error during compilation or highlights it in an IDE`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`const l = new go.List();\r
l.add("A");\r
l.add("B");\r
l.add("C");\r
\r
const it = l.iterator;\r
while (it.next()) {\r
  console.log(it.key + ": " + it.value);\r
}\r
// This outputs:\r
// 0: A\r
// 1: B\r
// 2: C\r
\r
// Or, if you just want to iterate over the items in the list:\r
l.each(item => console.log(item));`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const s = new go.Set();\r
s.add("A");\r
s.add("B");\r
s.add("C");\r
s.add("B");  // duplicate is ignored\r
\r
assert(s.count === 3);\r
assert(s.has("B"));\r
\r
s.delete("B");  // remove an item\r
assert(s.count === 2);\r
assert(!s.has("B"));`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// TypeScript:\r
const s = new go.Set<string>(); // Create a set of only strings\r
s.add("A");\r
s.add(23);  // produces an error during compilation or highlights it in an IDE\r
s.add({});  // produces an error during compilation or highlights it in an IDE`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`const s = new go.Set();\r
s.add("A");\r
s.add("B");\r
s.add("C");\r
s.add("B");  // duplicate is ignored\r
\r
const it = s.iterator;\r
while (it.next()) {\r
  console.log(it.value);\r
}\r
// This might output, perhaps in different order:\r
// A\r
// B\r
// C\r
\r
// Or, equivalent code using Set.each:\r
s.each(item => console.log(item));`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const s = new go.Set();\r
s.add("A");\r
s.add("B");\r
s.add("C");\r
\r
// iteration using for ... of:\r
for (let item of s) console.log(item);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const s = new go.Set();\r
  s.add("A");\r
  s.add("B");\r
  s.add("C");\r
\r
  const arr = [...set, "Z"];\r
  // which is an Array of length 4: ["A", "B", "C", "Z"]`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const m = new go.Map();\r
m.set("A", 1);  // associate "A" with 1\r
m.set("B", 2);\r
m.set("C", 3);\r
\r
assert(s.count === 3);\r
assert(s.has("B"));\r
assert(s.get("B") === 2);\r
\r
m.set("B", 222);  // replace the value for "B"\r
assert(s.get("B") === 222);\r
\r
s.delete("B");  // remove an item\r
assert(s.count === 2);\r
assert(!s.has("B"));\r
assert(s.get("B") === null);`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`// TypeScript:\r
const m = new go.Map<string, number>(); // Create a map of strings to numbers\r
m.set("A", 1);\r
m.set(23, 23);  // produces an error during compilation or highlights it in an IDE\r
m.set({}, 23);  // produces an error during compilation or highlights it in an IDE`,isExecutable:!1,language:`ts`,initiallyVisible:!0},{id:null,code:`const m = new go.Map();\r
m.set("A", 1);  // associate "A" with 1\r
m.set("B", 2);\r
m.set("C", 3);\r
m.set("B", 222);  // replace the value for "B"\r
\r
// Normal iteration lets you get both the key and its corresponding value:\r
const it = m.iterator;\r
while (it.next()) {\r
  console.log(it.key + ": " + it.value);\r
}\r
// This might output, perhaps in different order:\r
// A: 1\r
// B: 222\r
// C: 3\r
\r
// Or, equivalently using Map.each:\r
m.each(kvp => console.log(kvp.key + ": " + kvp.value));\r
\r
// To get a collection of the keys, use Map.iteratorKeys:\r
const kit = m.iteratorKeys;\r
while (kit.next()) {\r
  console.log(kit.value);\r
}\r
// This might output, perhaps in different order:\r
// A\r
// B\r
// C\r
\r
// To get a collection of the values, use Map.iteratorValues:\r
const vit = m.iteratorValues;\r
while (vit.next()) {\r
  console.log(vit.value);\r
}\r
// This might output, perhaps in different order:\r
// 1\r
// 222\r
// 3`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`const m = new go.Map();\r
m.add("A", 1);  // associate "A" with 1\r
m.add("B", 2);\r
m.add("C", 3);\r
m.add("B", 222);  // replace the value for "B"\r
\r
// JavaScript iteration over the key and value pairs:\r
for (let kvp of map) console.log(\`\${kvp[0]}: \${kvp[1]}\`);\r
// This might output, perhaps in different order:\r
// A: 1\r
// B: 222\r
// C: 3\r
\r
for (let k of map.iteratorKeys) console.log(k);\r
// This might output, perhaps in different order:\r
// A\r
// B\r
// C\r
\r
for (let v of map.iteratorValues) console.log(v);\r
// This might output, perhaps in different order:\r
// 1\r
// 222\r
// 3`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`for (let part of diagram.selection) {\r
  // part is now a Node or a Group or a Link or maybe a simple Part\r
  if (part instanceof go.Node) { . . . }\r
  else if (part instanceof go.Link) { . . . }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`diagram.selection.each(part => {\r
  // part is now a Node or a Group or a Link or maybe a simple Part\r
  if (part instanceof go.Node) { . . . }\r
  else if (part instanceof go.Link) { . . . }\r
});`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`for (let n of diagram.nodes) {\r
  // n is now a Node or a Group\r
  if (n.category === "Special") { . . . }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`for (let port of node.ports) {\r
  // port is now a GraphObject within the Node\r
  for (let link of node.findLinksConnected(port.portId)) {\r
    // link is now a Link connected with the port\r
    if (link.data.xyz === 17) { . . . }\r
  }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`for (let elt of panel.elements) {\r
  // elt is now a GraphObject that is an immediate child of the Panel\r
  if (elt instanceof go.TextBlock) { . . . }\r
  else if (elt instanceof go.Panel) { . . . recurse . . . }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`for (let part of group.memberParts) {\r
  // part is now a Part within the Group\r
  if (part instanceof go.Node) { . . . maybe work with part.data . . . }\r
}`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`bxmv7j`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};