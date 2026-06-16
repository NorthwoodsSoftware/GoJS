import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Theming`},htmlContent:`<style>\r
  :root {\r
    --color-bg: var(--color-gray-100);\r
    --color-primary: var(--color-amber-300);\r
    --color-border: var(--color-amber-500);\r
    --color-text: black;\r
    --color-link: var(--color-gray-700);\r
    --color-selection: var(--color-teal-500);\r
  }\r
\r
  .dark {\r
    --color-bg: var(--color-gray-900);\r
    --color-primary: var(--color-amber-700);\r
    --color-text: white;\r
    --color-link: var(--color-gray-200);\r
  }\r
</style>\r
\r
<h1>Theming</h1>\r
<p>\r
  Many applications aim to provide multiple themes, especially light and dark modes to support user preferences.\r
  GoJS provides functionality to define and manage themes to achieve this goal.\r
</p>\r
\r
<h2 id="GettingStartedWithThemes"><a class="not-prose heading-anchor" href="#GettingStartedWithThemes">Getting started with themes</a></h2>\r
<p>\r
  Various GoJS templates are themed, such as the default node, group and link template, tool adornments, background grid, and more.\r
  This makes it easy to quickly change the way certain objects appear.\r
  For example, you can change the selection adornment color/thickness without providing a <a href="../api/symbols/Part.html#selectionadornmenttemplate" target="api">Part.selectionAdornmentTemplate</a>,\r
  or change the temporary link color when drawing a new link without providing a <a href="../api/symbols/LinkingBaseTool.html#temporarylink" target="api">LinkingBaseTool.temporaryLink</a>.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
\r
<p>\r
  The default theme objects group properties into category objects by property type. The category for a given\r
  binding is inferred from the target property. For example, <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> and\r
  <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a> are grouped in the <code>colors</code> object, while <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a> is\r
  grouped in <code>numbers</code>. The predefined templates and tool archetypes use the following categories:\r
</p>\r
<table>\r
  <thead>\r
    <tr>\r
      <th>Category</th>\r
      <th>Used for</th>\r
      <th>Example keys</th>\r
    </tr>\r
  </thead>\r
  <tbody>\r
    <tr>\r
      <td><code>colors</code></td>\r
      <td>brush-valued properties such as <a href="../api/symbols/Shape.html#fill" target="api">Shape.fill</a> and <a href="../api/symbols/Shape.html#stroke" target="api">Shape.stroke</a></td>\r
      <td><code>selection</code>, <code>tempLink</code>, <code>link</code>, <code>text</code></td>\r
    </tr>\r
    <tr>\r
      <td><code>fonts</code></td>\r
      <td>font strings for <a href="../api/symbols/TextBlock.html#font" target="api">TextBlock.font</a></td>\r
      <td><code>normal</code>, <code>bold</code></td>\r
    </tr>\r
    <tr>\r
      <td><code>numbers</code></td>\r
      <td>numeric properties such as <a href="../api/symbols/Shape.html#strokewidth" target="api">Shape.strokeWidth</a></td>\r
      <td><code>selection</code>, <code>group</code></td>\r
    </tr>\r
    <tr>\r
      <td><code>margins</code></td>\r
      <td><a href="../api/symbols/Margin.html" target="api">Margin</a>-valued properties such as <a href="../api/symbols/Panel.html#padding" target="api">Panel.padding</a></td>\r
      <td><code>group</code></td>\r
    </tr>\r
    <tr>\r
      <td><code>arrowheads</code></td>\r
      <td>arrowhead names for <a href="../api/symbols/Shape.html#toarrow" target="api">Shape.toArrow</a> and <a href="../api/symbols/Shape.html#fromarrow" target="api">Shape.fromArrow</a></td>\r
      <td><code>toArrow</code></td>\r
    </tr>\r
  </tbody>\r
</table>\r
\r
<p>\r
  For a complete list of themed properties on predefined templates,\r
  see <a href="../extensionsJSM/Templates.js">Templates.js</a> in the extensionsJSM directory.\r
</p>\r
\r
<h2 id="BasicTheming"><a class="not-prose heading-anchor" href="#BasicTheming">Basic theming</a></h2>\r
<p>\r
  The simplest way to theme your diagram is to use the predefined <a href="../api/symbols/Themes.html" target="api">Themes</a> available and call <a href="../api/symbols/GraphObject.html#theme" target="api">GraphObject.theme</a>\r
  or create a new <a href="../api/symbols/ThemeBinding.html" target="api">ThemeBinding</a> when constructing templates.\r
  By default, both a light and a dark theme are provided in the <a href="../api/symbols/ThemeManager.html" target="api">ThemeManager</a>.\r
  These are the <a href="../api/symbols/Themes.html#light" target="api">Themes.Light</a> and <a href="../api/symbols/Themes.html#dark" target="api">Themes.Dark</a> objects, respectively.\r
</p>\r
\r
<p>\r
  To change themes, simply set <a href="../api/symbols/ThemeManager.html#currenttheme" target="api">ThemeManager.currentTheme</a> to a theme name.\r
  Note that the special value <code>'system'</code> will pick either the\r
  <code>'light'</code> or <code>'dark'</code> theme depending on the end user's browser preference.\r
</p>\r
<!-- CODE_BLOCK_1 -->\r
\r
\r
<h2 id="ModifyingThemes"><a class="not-prose heading-anchor" href="#ModifyingThemes">Creating or modifying themes</a></h2>\r
<p>\r
  In most scenarios, you'll want custom themes, either by modifying the predefined themes or creating your own.\r
  This can be done by calling <a href="../api/symbols/ThemeManager.html#set" target="api">ThemeManager.set</a>, passing a theme name and a partial (or complete) <a href="../api/symbols/Theme.html" target="api">Theme</a> object.\r
  Passing an empty string as the theme name will modify the <a href="../api/symbols/ThemeManager.html#defaulttheme" target="api">ThemeManager.defaultTheme</a>, which is initially <code>'light'</code>.\r
</p>\r
<p>\r
  If the theme name exists in the <a href="../api/symbols/ThemeManager.html#thememap" target="api">ThemeManager.themeMap</a>, that theme will be updated by merging the partial theme object into it.\r
  If the theme name does not exist, the theme will be added to the theme map.\r
</p>\r
\r
<!-- CODE_BLOCK_2 -->\r
\r
\r
<h2 id="ThemeCSS"><a class="not-prose heading-anchor" href="#ThemeCSS">Using CSS variables for theming</a></h2>\r
<p>\r
  If you're using CSS variables to style other parts of your application, you can use <a href="../api/symbols/ThemeManager.html#readscssvariables" target="api">ThemeManager.readsCssVariables</a>\r
  to reuse those variables in your GoJS themes.\r
</p>\r
\r
<p class="box bg-info">\r
  NOTE: The syntax to reference a CSS variable in a theme is <code>'var(&lt;varname&gt;)'</code>.\r
  Only a single variable may be referenced, and any fallbacks should be defined either on the template or\r
  in the referenced CSS variable.\r
\r
  The CSS variable's value will be read before any <a href="../api/symbols/Binding.html#themeconverter" target="api">Binding.themeConverter</a> functions have run.\r
</p>\r
\r
<!-- CODE_BLOCK_3 -->\r
\r
\r
<p class="mt-3">\r
  In some cases, your CSS variables may already handle light and dark mode.\r
  If that's the case, you have the option to use a single theme which references those variables.\r
  Rather than changing the theme, you'll update your page as normal and call <a href="../api/symbols/ThemeManager.html#updatediagrams" target="api">ThemeManager.updateDiagrams</a>,\r
  reflecting any changes in CSS variables in the <a href="../api/symbols/ThemeManager.html" target="api">ThemeManager</a>'s associated diagrams.\r
</p>\r
<p>\r
  When using a single theme, you'll need to make sure you define any properties used\r
  by default templates such as <code>colors.selection</code> or <code>colors.link</code>\r
  if you haven't overridden those templates.\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
\r
<h2 id="ThemeSources"><a class="not-prose heading-anchor" href="#ThemeSources">Theme binding sources</a></h2>\r
<p>\r
  The typical case for theming a GraphObject will be getting a value directly from a Theme.\r
  It is also possible to use values from other sources, such as a bound data object,\r
  a GraphObject in the binding Panel, or the shared model data object.\r
</p>\r
<p>\r
  These different sources are specified by calling <a href="../api/symbols/GraphObject.html#themedata" target="api">GraphObject.themeData</a>, <a href="../api/symbols/GraphObject.html#themeobject" target="api">GraphObject.themeObject</a>, or <a href="../api/symbols/GraphObject.html#thememodel" target="api">GraphObject.themeModel</a>.\r
  In addition to specifying the source, the <a href="../api/symbols/Binding.html#converter" target="api">Binding.converter</a> function can be used to convert from some value to a theme property name.\r
  In the following example, a themeObject binding is used on the node's text to get a color variable from the theme when the node is selected:\r
</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
\r
<h2 id="ConvertingThemeValues"><a class="not-prose heading-anchor" href="#ConvertingThemeValues">Converting theme values</a></h2>\r
<p>\r
  In addition to a conversion function to determine the theme property name,\r
  a <a href="../api/symbols/Binding.html#themeconverter" target="api">Binding.themeConverter</a> can be provided as the fifth argument to <a href="../api/symbols/GraphObject.html#themedata" target="api">GraphObject.themeData</a>\r
  to perform a conversion on the resulting theme value before assigning it to the target property.\r
</p>\r
\r
<!-- CODE_BLOCK_6 -->\r
\r
\r
<h2 id="OtherThemeableProperties"><a class="not-prose heading-anchor" href="#OtherThemeableProperties">Other themable types</a></h2>\r
<p>\r
  Discussion on this page has focused on colors, but theming can also be used for fonts, stroke widths, sizes, or any other property type.\r
  You must ensure that the returned theme value matches the type of the target property.\r
</p>\r
<p>\r
  To access an arbitrary property value in your theme, you can use a '.' separated path,\r
  like <code>'colors.primary'</code> or <code>'icons.mode'</code>.\r
</p>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
\r
<h2 id="BuilderObjects"><a class="not-prose heading-anchor" href="#BuilderObjects">Theming builder objects</a></h2>\r
<p>\r
  To keep the builder objects ("Button", "ToolTip", "ContextMenu", etc) simple, they are not themed by default.\r
</p>\r
<p>\r
  Creating themed versions of these objects is relatively simple given the predefined definitions available at\r
  <a href="../extensions/Buttons.js">Buttons.js</a>.\r
  Here we demonstrate theming the "Button" and "ToolTip" builders.\r
</p>\r
<p>\r
  See the learn pages on <a href="buttons">buttons</a>, <a href="tooltips">tooltips</a>,\r
  and <a href="./contextMenus">context menus</a> to change appearances without theming.\r
</p>\r
\r
<!-- CODE_BLOCK_8 -->\r
`,codeBlocks:[{id:`theme0`,code:`// The ThemeManager.currentTheme defaults to 'light'\r
diagram.themeManager.set('light', {\r
  // modify some property values of the "light" Theme\r
  colors: {\r
    selection: '#ec4899',  // pink selection adornment\r
    tempLink: '#14b8a6'  // teal temporary link while linking\r
  },\r
  numbers: {\r
    selection: 6  // increased selection adornment thickness\r
  }\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', {\r
        fill: 'skyblue', strokeWidth: 0, portId: '',\r
        fromLinkable: true, toLinkable: true, cursor: 'pointer'\r
      }),\r
      new go.TextBlock({ margin: 8, cursor: 'pointer' })\r
        .bind('text')\r
    );\r
\r
diagram.model = new go.Model([\r
  { key: 1, text: 'Alpha' },\r
  { key: 2, text: 'Beta' }\r
]);\r
\r
diagram.select(diagram.nodes.first());`,isExecutable:!0,animation:!1,expanded:!0,language:`js`,initiallyVisible:!0},{id:`theme1`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect1').value;\r
// Update the div background color when theme changes;\r
// in most applications, the div background will be transparent,\r
// and the page background should be updated.\r
diagram.themeManager.changesDivBackground = true;\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
        .theme('fill', 'group'),  // fill color is a semi-transparent gray\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        .theme('stroke', 'text')  // stroke color is a dark or light gray\r
    );\r
\r
// the default link template changes color based on the theme's 'link' color\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha' },\r
  { key: 2, text: 'Beta' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme1 = () => {\r
  const selectedTheme = document.getElementById('themeSelect1').value;\r
  diagram.themeManager.currentTheme = selectedTheme;\r
};`,isExecutable:!0,animation:!1,expanded:!0,html:`<div>
  <select id="themeSelect1" class="mt-1 p-1" onchange="changeTheme1()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`theme2`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect2').value\r
diagram.themeManager.changesDivBackground = true;\r
\r
// update the light theme and dark theme with some additional colors\r
diagram.themeManager.set('light', {\r
  colors: {\r
    primary: '#a5b4fc',\r
    border: '#4f46e5'\r
  }\r
});\r
diagram.themeManager.set('dark', {\r
  colors: {\r
    primary: '#4338ca'\r
    // border comes from default theme\r
  }\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 2 })\r
        // Shape.fill is set to the current theme's colors.primary\r
        .theme('fill', 'primary')\r
        // Shape.stroke is set to the current theme's colors.border\r
        .theme('stroke', 'border'),\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        .theme('stroke', 'text')  // stroke color is a dark or light gray\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha' },\r
  { key: 2, text: 'Beta' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme2 = () => {\r
  const selectedTheme = document.getElementById('themeSelect2').value;\r
  diagram.themeManager.currentTheme = selectedTheme;\r
};`,isExecutable:!0,animation:!1,html:`<div>
  <select id="themeSelect2" class="mt-1 p-1" onchange="changeTheme2()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`themeCss`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelectCss').value\r
diagram.themeManager.readsCssVariables = true;  // (defaults to true, just for demonstration)\r
diagram.themeManager.changesDivBackground = true;\r
\r
diagram.themeManager.set('light', {\r
  colors: {\r
    primary: 'var(--color-teal-300)',\r
    border: 'var(--color-teal-500)'\r
  }\r
});\r
diagram.themeManager.set('dark', {\r
  colors: {\r
    primary: 'var(--color-teal-700)'\r
  }\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 2 })\r
        .theme('fill', 'primary')\r
        .theme('stroke', 'border'),\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        .theme('stroke', 'text')\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha' },\r
  { key: 2, text: 'Beta' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeThemeCss = () => {\r
  diagram.themeManager.currentTheme = document.getElementById('themeSelectCss').value;\r
};`,isExecutable:!0,animation:!1,html:`<style>
  :root {
    --color-teal-300: #5eead4;
    --color-teal-500: #14b8a6;
    --color-teal-700: #0f766e;
  }
</style>
<div>
  <select id="themeSelectCss" class="mt-1 p-1" onchange="changeThemeCss()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`themeCss2`,code:`// Here, our CSS is defined as:\r
// :root {\r
//   --color-bg: var(--color-gray-100);\r
//   --color-primary: var(--color-amber-300);\r
//   --color-border: var(--color-amber-500);\r
//   --color-text: black;\r
//   --color-link: var(--color-gray-700);\r
//   --color-selection: var(--color-teal-500);\r
// }\r
// .dark {\r
//   --color-bg: var(--color-gray-900);\r
//   --color-primary: var(--color-amber-700);\r
//   --color-text: white;\r
//   --color-link: var(--color-gray-200);\r
// }\r
\r
diagram.themeManager = new go.ThemeManager({\r
  readsCssVariables: true,  // (defaults to true, just for demonstration)\r
  changesDivBackground: true,  // may not be needed when the diagram background is transparent\r
  defaultTheme: 'default',\r
  currentTheme: 'default',\r
  themeMap: new go.Map([{\r
    key: 'default',\r
    value: {\r
      ...go.Themes.Dark,\r
      colors: {\r
        ...go.Themes.Dark.colors,  // take some default colors from the built-in dark theme\r
        div: 'var(--color-bg)',\r
        primary: 'var(--color-primary)',\r
        border: 'var(--color-border)',\r
        text: 'var(--color-text)',\r
        link: 'var(--color-link)',\r
        selection: 'var(--color-selection)'\r
      }\r
    }\r
  }])\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 2 })\r
        .theme('fill', 'primary')\r
        .theme('stroke', 'border'),\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        .theme('stroke', 'text')\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Gamma' },\r
  { key: 2, text: 'Delta' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeMode = () => {\r
  const mode = document.getElementById('themeSelectCss2').value;\r
  // instead of changing the theme, just update your page in the normal manner\r
  // and notify the ThemeManager of the change\r
  document.documentElement.classList.toggle('dark',\r
    mode === 'dark' ||\r
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)\r
  );\r
  diagram.themeManager.updateDiagrams();\r
};\r
\r
changeMode();  // set initial root style appropriately`,isExecutable:!0,animation:!1,html:`<style>
  :root {
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-700: #374151;
    --color-gray-900: #111827;
    --color-amber-300: #fcd34d;
    --color-amber-500: #f59e0b;
    --color-amber-700: #b45309;
    --color-teal-500: #14b8a6;

    --color-bg: var(--color-gray-100);
    --color-primary: var(--color-amber-300);
    --color-border: var(--color-amber-500);
    --color-text: black;
    --color-link: var(--color-gray-700);
    --color-selection: var(--color-teal-500);
  }
  .dark {
    --color-bg: var(--color-gray-900);
    --color-primary: var(--color-amber-700);
    --color-text: white;
    --color-link: var(--color-gray-200);
  }
</style>
<div>
  <select id="themeSelectCss2" class="mt-1 p-1" onchange="changeMode()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to update the root's mode.
</div>`,language:`js`,initiallyVisible:!0},{id:`theme3`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect3').value\r
diagram.themeManager.changesDivBackground = true;\r
\r
diagram.themeManager.set('', {\r
  colors: {\r
    red: '#dc2626',\r
    blue: '#2563eb',\r
    selected: '#0ea5e9'\r
  }\r
});\r
\r
// converted from Part.isSelected to a theme property name\r
const convertSelectedToThemeProp = s => s ? 'selected' : 'text';\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
        .themeData('fill', 'color'),  // from data\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        // stroke binding is from object, gets color from theme via converter\r
        .themeObject('stroke', 'isSelected', null, convertSelectedToThemeProp)\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha', color: 'red' },\r
  { key: 2, text: 'Beta', color: 'blue' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme3 = () => {\r
  const selectedTheme = document.getElementById('themeSelect3').value;\r
  diagram.themeManager.currentTheme = selectedTheme;\r
};`,isExecutable:!0,animation:!1,html:`<div>
  <select id="themeSelect3" class="mt-1 p-1" onchange="changeTheme3()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`theme4`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect4').value\r
diagram.themeManager.changesDivBackground = true;\r
\r
diagram.themeManager.set('', {\r
  colors: {\r
    red: '#dc2626',\r
    blue: '#2563eb'\r
  }\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 2 })\r
        // from data\r
        .themeData('fill', 'color')\r
        // from data converted to a darker color by go.Brush.darken\r
        .themeData('stroke', 'color', null, null, go.Brush.darken),\r
      new go.TextBlock({ margin: 8 })\r
        .bind('text')\r
        .theme('stroke', 'text')\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha', color: 'red' },\r
  { key: 2, text: 'Beta', color: 'blue' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme4 = () => {\r
  const selectedTheme = document.getElementById('themeSelect4').value;\r
  diagram.themeManager.currentTheme = selectedTheme;\r
};`,isExecutable:!0,animation:!1,html:`<div>
  <select id="themeSelect4" class="mt-1 p-1" onchange="changeTheme4()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`theme5`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect5').value\r
diagram.themeManager.changesDivBackground = true;\r
\r
diagram.themeManager.set('', {\r
  colors: {\r
    primary: '#a5b4fc'\r
  },\r
  icons: {\r
    mode: \`M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386\r
          6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25\r
          12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0\r
          3.75 3.75 0 017.5 0z\`\r
  }\r
});\r
diagram.themeManager.set('dark', {\r
  icons: {\r
    mode: \`M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385\r
          0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753\r
          9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753\r
          0 009.002-5.998z\`\r
  }\r
});\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto')\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
        .theme('fill', 'primary'),  // colors.primary\r
      new go.Panel('Horizontal', { margin: 8 })\r
        .add(\r
          new go.TextBlock({ margin: new go.Margin(0, 8, 0, 0) })\r
            .bind('text')\r
            .theme('stroke', 'text')  // colors.text\r
            .theme('font', 'bold'),  // fonts.bold\r
          new go.Shape({ width: 16, height: 16, strokeWidth: 2 })\r
            // looks in the theme's 'icons' object\r
            .theme('geometryString', 'icons.mode')\r
            .theme('stroke', 'text')  // colors.text\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha' },\r
  { key: 2, text: 'Beta' }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme5 = () => {\r
  const selectedTheme = document.getElementById('themeSelect5').value;\r
  diagram.themeManager.currentTheme = selectedTheme;\r
};`,isExecutable:!0,animation:!1,html:`<div>
  <select id="themeSelect5" class="mt-1 mb-4 p-1" onchange="changeTheme5()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>`,language:`js`,initiallyVisible:!0},{id:`theme6`,code:`diagram.themeManager.currentTheme = document.getElementById('themeSelect6').value\r
diagram.themeManager.changesDivBackground = true;\r
\r
// update the light theme and dark theme with some additional colors\r
diagram.themeManager.set('light', {\r
  colors: {\r
    primary: '#a5b4fc',\r
    button: '#f9a8d4',\r
    buttonHover: '#f472b6',\r
    toolTip: '#fafafa'\r
  }\r
});\r
diagram.themeManager.set('dark', {\r
  colors: {\r
    primary: '#4338ca',\r
    button: '#be185d',\r
    buttonHover: '#db2777',\r
    toolTip: '#262626'\r
  }\r
});\r
\r
// theme the predefined "Button", modifying the initial fill and _button properties via theming\r
go.GraphObject.defineBuilder('ThemedButton', args =>\r
  go.GraphObject.build('Button', { 'ButtonBorder.strokeWidth': 0 })\r
    .theme('ButtonBorder.fill', 'button')\r
    .theme('_buttonFillOver', 'buttonHover')\r
);\r
\r
// theme the predefined "ToolTip", modifying the fill via theming\r
go.GraphObject.defineBuilder('ThemedToolTip', args =>\r
  go.GraphObject.build('ToolTip')\r
    .theme('Border.fill', 'toolTip')\r
);\r
\r
diagram.nodeTemplate =\r
  new go.Node('Auto', {\r
    toolTip:\r
      go.GraphObject.build('ThemedToolTip')\r
        .add(\r
          new go.TextBlock('tooltip', { margin: 5 })\r
            .bind('text', 'text', k => \`\${k}'s tooltip\`)\r
            .theme('stroke', 'text')\r
        )\r
  })\r
    .add(\r
      new go.Shape('RoundedRectangle', { strokeWidth: 0 })\r
        .theme('fill', 'primary'),\r
      new go.Panel('Vertical', { margin: 8 })\r
        .add(\r
          new go.TextBlock({ margin: new go.Margin(0, 0, 8, 0) })\r
            .bind('text', 'count')\r
            .theme('stroke', 'text')\r
            .theme('font', 'bold'),\r
          go.GraphObject.build('ThemedButton', {\r
            click: (e, obj) => {\r
              const data = obj.part.data;\r
              obj.part.diagram.commit(d => {\r
                d.model.set(data, "count", data.count + 1, "clicked")\r
              })\r
            }\r
          })\r
            .add(\r
              new go.TextBlock('Button', { margin: 5 })\r
                .theme('stroke', 'text')\r
            )\r
        )\r
    );\r
\r
diagram.model = new go.GraphLinksModel([\r
  { key: 1, text: 'Alpha', count: 1 },\r
  { key: 2, text: 'Beta', count: 2 }\r
], [\r
  { from: 1, to: 2 }\r
]);\r
\r
changeTheme6 = () => {\r
  diagram.themeManager.currentTheme = document.getElementById('themeSelect6').value;\r
};`,isExecutable:!0,animation:!1,html:`<div>
  <select id="themeSelect6" class="mt-1 mb-4 p-1" onchange="changeTheme6()">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  Use the select box to change the current theme.
</div>
`,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`lxwiig`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};