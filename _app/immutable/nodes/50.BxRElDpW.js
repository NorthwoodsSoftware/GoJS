import{$ as e,C as t,G as n,H as r,L as i,N as a,T as o,U as s,W as c,X as l,c as u,et as d,it as f,m as p,st as m,z as h}from"../chunks/BY_RssUb.js";import"../chunks/xihTtKlq.js";import{t as g}from"../chunks/CmgMociJ.js";var _=m({load:()=>v,prerender:()=>!0}),v=()=>({metadata:{title:`Pictures`,category:`Building Blocks`,categoryOrder:4},htmlContent:`<h1>Pictures</h1>\r
<p>\r
  Use the <a href="../api/symbols/Picture.html" target="api">Picture</a> class to display images. The most common usage is to set the <a href="../api/symbols/Picture.html#source" target="api">Picture.source</a> property with a URL string, along with the\r
  <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> or the <a href="../api/symbols/GraphObject.html#width" target="api">GraphObject.width</a> and <a href="../api/symbols/GraphObject.html#height" target="api">GraphObject.height</a>.\r
</p>\r
<p>\r
  If the URL is just a simple constant string, you can pass the string directly as an argument, rather than assign the "source:" property. Both techniques have\r
  the same effect.\r
</p>\r
<!-- CODE_BLOCK_0 -->\r
<p>For more sophisticated control, you can set the <a href="../api/symbols/Picture.html#element" target="api">Picture.element</a> to an <b>HTMLImageElement</b> or an <b>HTMLCanvasElement</b>.</p>\r
<p>\r
  In these simplistic demonstrations, the code programmatically creates a Node and adds it to the Diagram.\r
  Once you learn about models and data binding you will generally not create parts (nodes or links) programmatically.\r
</p>\r
\r
<h3 id="SimpleIconsUsingFonts"><a class="not-prose heading-anchor" href="#SimpleIconsUsingFonts">Simple icons Using fonts</a></h3>\r
<p>\r
  Note: for showing simple icons you may want to use an icon font.\r
  See the example using a <a href="../api/symbols/TextBlock.html" target="api">TextBlock</a> rather than a <a href="../api/symbols/Picture.html" target="api">Picture</a> at:\r
  <a href="textBlocks#IconFonts">Icon Fonts</a>\r
</p>\r
\r
<h2 id="Sizing"><a class="not-prose heading-anchor" href="#Sizing">Sizing</a></h2>\r
<p>\r
  If you do not set the <a href="../api/symbols/GraphObject.html#desiredsize" target="api">GraphObject.desiredSize</a> of a <a href="../api/symbols/Picture.html" target="api">Picture</a>, it will get the picture's natural size. But when you set the desiredSize to be\r
  something different than the natural size, the picture may be stretched or compressed to fit.\r
</p>\r
<p>The following Picture elements all show a picture of apples that is 320x240 pixels.</p>\r
<ul>\r
  <li>The first picture shows the image at its natural size.</li>\r
  <li>The second picture also shows the image at its natural size, but has its width and height set explicitly.</li>\r
  <li>The third picture increases the size of the Picture, causing the image to be expanded evenly.</li>\r
  <li>The fourth picture squeezes the 320x240 image into a 160x120 space -- half size. This also maintains the original aspect ratio of the image.</li>\r
  <li>The last picture sets the picture size to be 320x480, which changes the aspect ratio to be taller and thinner than the original.</li>\r
</ul>\r
<!-- CODE_BLOCK_1 -->\r
<p>\r
  Note that it may take a while for the media to load. Until the time that the media has loaded sufficiently to know its natural size, the Picture may have the\r
  wrong size, such as 0x0. We recommend that you specify the desiredSize (or width and height) so that the Panel(s) holding the Picture will not have to\r
  rearrange themselves once the media has loaded.\r
</p>\r
<p>However, for the times when you cannot know the natural size ahead of time, there are alternative ways of stretching images to fit in a given space:</p>\r
\r
<h2 id="ImageStretch"><a class="not-prose heading-anchor" href="#ImageStretch">ImageStretch</a></h2>\r
<p>\r
  Instead of always stretching or compressing to fill the desiredSize, you can set the <a href="../api/symbols/Picture.html#imagestretch" target="api">Picture.imageStretch</a> property to control the size and aspect ratio\r
  of the drawn image.\r
</p>\r
<p>\r
  The following pictures demonstrate the four possible values for Picture.imageStretch. The first four Pictures have size 200x400 and show the same 330x330 JPG\r
  file. They have a light gray background to show the space that may be left unused but is still part of the Picture's bounds.\r
</p>\r
<ul>\r
  <li>\r
    "Fill" demonstrates the default behavior (stretching in both directions). In this case, the image is distorted to be narrower than its natural size,\r
    but the entire image is visible and it fully fills the space.\r
  </li>\r
  <li>\r
    "None" uses an imageStretch of <a href="../api/symbols/ImageStretch.html#none" target="api">ImageStretch.None</a>. Because the desiredSize is smaller than the natural size of the image, parts of it are clipped.\r
  </li>\r
  <li>\r
    "Uniform" shows how setting imageStretch to <a href="../api/symbols/ImageStretch.html#uniform" target="api">ImageStretch.Uniform</a> ensures the whole image is shown at the largest scale such that its aspect ratio is maintained.\r
    This leaves the remaining space empty.\r
  </li>\r
  <li>\r
    "UniformToFill" shows how setting imageStretch to <a href="../api/symbols/ImageStretch.html#uniformtofill" target="api">ImageStretch.UniformToFill</a> ensures the image fills the whole space by scaling \r
    it until the area is completely covered and then clipping any excess.\r
  </li>\r
  <li>The last node contains the original image in its natural size for comparison for comparison.</li>\r
</ul>\r
<!-- CODE_BLOCK_2 -->\r
\r
<h2 id="Clipping"><a class="not-prose heading-anchor" href="#Clipping">Clipping</a></h2>\r
<p>\r
  If you have a Picture that must be clipped to a certain geometry, you can add it to a Spot that has a main Shape\r
  of the desired geometry and set <a href="../api/symbols/Panel.html#isclipping" target="api">Panel.isClipping</a> to true. This allows the filled area of the main Shape to \r
  serve as a clipping region instead of a drawn shape. Only the drawn part of the Picture will be pickable, but it \r
  does not actually change its area.\r
</p>\r
<p>Examples of both follow:</p>\r
<!-- CODE_BLOCK_3 -->\r
\r
<p>\r
  When images are clipped, you can control what part of the image is drawn by using the <a href="../api/symbols/Picture.html#imagealignment" target="api">Picture.imageAlignment</a> property.\r
  The default value is <a href="../api/symbols/Spot.html#center" target="api">Spot.Center</a>. <i>However,</i> this property is only consulted when the <a href="../api/symbols/Picture.html#imagestretch" target="api">Picture.imageStretch</a> property \r
  is not set to its default value of <a href="../api/symbols/ImageStretch.html#fill" target="api">ImageStretch.Fill</a>. In the example below, the same rectangular picture is clipped by\r
  a circular frame, one with imageAlignment set to its default and one with it set to <a href="../api/symbols/Spot.html#top" target="api">Spot.Top</a>:\r
</p>\r
\r
<!-- CODE_BLOCK_4 -->\r
\r
<h2 id="Flipping"><a class="not-prose heading-anchor" href="#Flipping">Flipping</a></h2>\r
\r
<p>You can flip image sources horizontally and vertically with the <a href="../api/symbols/Picture.html#flip" target="api">Picture.flip</a> property:</p>\r
\r
<!-- CODE_BLOCK_5 -->\r
\r
<h2 id="CrossOriginPictures"><a class="not-prose heading-anchor" href="#CrossOriginPictures">Cross origin Pictures</a></h2>\r
\r
<p>\r
  Since Pictures are backed by HTMLImageElements, they must abide by the same Cross-origin (CORS) rules that apply to images. If you are using images that apply\r
  to CORS rules, you may need to set the <a href="../api/symbols/Picture.html#sourcecrossorigin" target="api">Picture.sourceCrossOrigin</a> property to a function that returns an appropriate value. If\r
  <code>sourceCrossOrigin</code> is supplied, the value returned by the function is used as the value of any constructed <code>image.crossOrigin</code>.\r
  Example:\r
</p>\r
<!-- CODE_BLOCK_6 -->\r
<p>\r
  Common values to return are "use-credentials" and "anonymous", but other situations may call for other values or conditional values. We suggest researching\r
  <a href="https://enable-cors.org/">cross-origin resource sharing</a> to determine what is right for your situation.\r
</p>\r
<p>\r
  If you are using <a href="../api/symbols/Diagram.html#makeimage" target="api">Diagram.makeImage</a>, <a href="../api/symbols/Diagram.html#makeimagedata" target="api">Diagram.makeImageData</a>, or <a href="../api/symbols/Diagram.html#makesvg" target="api">Diagram.makeSvg</a>, and you are seeing blank or missing images, CORS-related\r
  problems are the first thing to investigate.\r
</p>\r
<h2 id="UsingSVGAsPictureSource"><a class="not-prose heading-anchor" href="#UsingSVGAsPictureSource">Using SVG as a Picture source</a></h2>\r
\r
<p>\r
  All modern browsers accept SVG files as a Picture source, but you <strong>must</strong>\r
  assign width and height attributes to the SVG element. These values should be integers.\r
</p>\r
<p>\r
  This first SVG file has a width and height specified in its SVG element, and also has its desired size set.\r
</p>\r
\r
<!-- CODE_BLOCK_7 -->\r
\r
<!-- CODE_BLOCK_8 -->\r
\r
<p>\r
  <strong> The following SVG file does not specify width and height attributes in its SVG element,\r
    and as a result, some browsers may not render it correctly: </strong>\r
</p>\r
\r
<!-- CODE_BLOCK_9 -->\r
<!-- CODE_BLOCK_10 -->\r
\r
<h2 id="ErrorHandling"><a class="not-prose heading-anchor" href="#ErrorHandling">Error handling</a></h2>\r
\r
<p>\r
  If an image source fails to load, the <a href="../api/symbols/Picture.html#errorfunction" target="api">Picture.errorFunction</a> property can be set to call a function \r
  in response. This can be helpful in cases such as user input when an image can't be guaranteed to work. \r
  This error function can then set the source to a known value.\r
</p>\r
\r
<!-- CODE_BLOCK_11 -->`,codeBlocks:[{id:`source`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      // image URL passed as an argument\r
      new go.Picture("images/1280x960.jpg", { width: 128, height: 96, scale: 2 })\r
    ));`,isExecutable:!0,animation:!1,minHeight:250,language:`js`,initiallyVisible:!0},{id:`sizedPictures`,code:`const settings = { source: "images/320x240.jpg", margin: 2, scale: .3 }; // scaled for clarity\r
const font = "11pt Trebuchet MS";\r
diagram.add(\r
  new go.Node("Table")\r
    .add(\r
      new go.Picture(settings)\r
        .set({ column: 0, /* natural width and height */ }),\r
      new go.TextBlock("natural", { row: 1, column: 0, font }),\r
      new go.Picture(settings)\r
        .set({ column: 1, width: 320, height: 240 }),\r
      new go.TextBlock("same size", { row: 1, column: 1, font }),\r
      new go.Picture(settings)\r
        .set({ column: 2, width: 640, height: 480 }),\r
      new go.TextBlock("bigger", { row: 1, column: 2, font }),\r
      new go.Picture(settings)\r
        .set({ column: 3, width: 160, height: 120 }),\r
      new go.TextBlock("smaller", { row: 1, column: 3, font }),\r
      new go.Picture(settings)\r
        .set({ column: 4, width: 320, height: 480 }),\r
      new go.TextBlock("stretched", { row: 1, column: 4, font })\r
    ));`,isExecutable:!0,animation:!1,split:50,language:`js`,initiallyVisible:!0},{id:`stretchedPictures`,code:`const settings = { source: "images/nawoods.jpg", scale: .5, width: 200, height: 400, margin: 2, background: "lightgray" };\r
const font = "11pt Trebuchet MS";\r
diagram.add(\r
  new go.Node("Table")\r
    .add(\r
      new go.Picture({\r
                                        /* the default value */\r
          row: 0, column: 0, imageStretch: go.ImageStretch.Fill\r
        })\r
        .set(settings),\r
      new go.TextBlock("Fill", { row: 1, column: 0, font }),\r
      new go.Picture({\r
          row: 0, column: 1, imageStretch: go.ImageStretch.None\r
        })\r
        .set(settings),\r
      new go.TextBlock("None", { row: 1, column: 1, font }),\r
      new go.Picture({\r
          row: 0, column: 2, imageStretch: go.ImageStretch.Uniform\r
        })\r
        .set(settings),\r
      new go.TextBlock("Uniform", { row: 1, column: 2, font }),\r
      new go.Picture({\r
          row: 0, column: 3, imageStretch: go.ImageStretch.UniformToFill\r
        })\r
        .set(settings),\r
      new go.TextBlock("UniformToFill", { row: 1, column: 3, font })\r
    ));\r
\r
// The original image sized naturally, for comparison\r
diagram.add(\r
  new go.Node("Vertical", { position: new go.Point(125, 250)})\r
    .add(\r
      new go.Picture("images/nawoods.jpg", { scale: .5 }),\r
      new go.TextBlock("Original image,\\nsized naturally", { font })\r
    ));`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`clipPictures`,code:`diagram.layout = new go.GridLayout();\r
\r
// Original image\r
diagram.add(\r
  new go.Node("Vertical", { scale: 2 })\r
    .add(\r
      new go.Picture("../samples/images/55x55.png", {\r
        width: 55, height: 55\r
      }),\r
      new go.TextBlock("Original Image", { font: "5pt Trebuchet MS", margin: 2 } )\r
    )\r
  );\r
\r
// Using Panel.isClipping\r
diagram.add(\r
  new go.Node("Spot", { scale: 2, isClipping: true })\r
    .add(\r
      new go.Shape("Circle", { width: 55, strokeWidth: 0 } ),\r
      new go.Picture("../samples/images/55x55.png",\r
          { width: 55, height: 55 })\r
    )\r
  );\r
\r
// Using Panel.isClipping and also having a surrounding border behind it\r
diagram.add(\r
  new go.Node("Spot", { scale: 2 })\r
    .add(\r
      // the background border\r
      new go.Shape("Circle", { width: 60, strokeWidth: 0 } ),\r
      // the same clipping panel as the second example, above\r
      new go.Panel("Spot", { isClipping: true })\r
        .add(\r
          new go.Shape("Circle", { width: 55, strokeWidth: 0 } ),\r
          new go.Picture("../samples/images/55x55.png",\r
            { width: 55, height: 55 })\r
        )\r
    )\r
  );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`imageAlignment`,code:`diagram.layout = new go.GridLayout();\r
\r
// Original image for comparison\r
diagram.add(\r
  new go.Node("Spot", { \r
    scale: 2, isClipping: true\r
  })\r
    .add(\r
      new go.Picture("images/330x461.jpg",\r
        { width: 60, height: 90 })\r
    )\r
  );\r
// Uses default imageAlignment\r
diagram.add(\r
  new go.Node("Spot", { \r
    scale: 2, isClipping: true\r
  })\r
    .add(\r
      new go.Shape("Circle", { width: 60, strokeWidth: 0 }),\r
      new go.Picture("images/330x461.jpg",\r
        { width: 60, height: 60, imageStretch: go.ImageStretch.UniformToFill })\r
    )\r
  );\r
// Sets imageAlignment to top of the picture\r
diagram.add(\r
  new go.Node("Spot", { \r
    scale: 2, isClipping: true\r
  })\r
    .add(\r
      new go.Shape("Circle", { width: 60, strokeWidth: 0 }),\r
      new go.Picture("images/330x461.jpg",\r
        { width: 60, height: 60, imageStretch: go.ImageStretch.UniformToFill,\r
          imageAlignment: go.Spot.Top })\r
    )\r
  );`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:`flipPictures`,code:`const settings = { source: "images/nawoods2.jpg", scale: .3, margin: 2 };\r
const font = "11pt Trebuchet MS";\r
diagram.add(\r
  new go.Node("Table")\r
    .add(\r
      new go.Picture(settings)\r
        .set({ row: 0, column: 0, flip: go.Flip.None /* the default value */ }),\r
      new go.TextBlock("None (default)", { row: 1, column: 0, font }),\r
      new go.Picture(settings)\r
        .set({ row: 0, column: 1, flip: go.Flip.Horizontal }),\r
      new go.TextBlock("FlipHorizontal", { row: 1, column: 1, font }),\r
      new go.Picture(settings)\r
        .set({ row: 2, column: 0, flip: go.Flip.Vertical }),\r
      new go.TextBlock("FlipVertical", { row: 3, column: 0, font }),\r
      new go.Picture(settings)\r
        .set({ row: 2, column: 1, flip: go.Flip.Both }),\r
      new go.TextBlock("FlipBoth", { row: 3, column: 1, font })\r
    ));`,isExecutable:!0,animation:!1,minHeight:0,language:`js`,initiallyVisible:!0},{id:null,code:`new go.Picture({\r
    width: 64, height: 64,\r
    sourceCrossOrigin: pict => "use-credentials"\r
  })\r
  .bind("source", "path")`,isExecutable:!1,language:`js`,initiallyVisible:!0},{id:null,code:`<svg xmlns="http://www.w3.org/2000/svg"\r
     xmlns:xlink="http://www.w3.org/1999/xlink"\r
     width="580" height="580">\r
  ...`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`svg1`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Picture({ width: 580, height: 580, source: "images/tiger.svg" })\r
    ));\r
diagram.scale = 0.5;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`<svg xmlns="http://www.w3.org/2000/svg"\r
     xmlns:xlink="http://www.w3.org/1999/xlink">\r
  ...`,isExecutable:!1,language:`html`,initiallyVisible:!0},{id:`svg2`,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      // missing width and height:\r
      new go.Picture({ source: "images/tiger-noWidthHeightSpecified.svg" })\r
    ));\r
diagram.scale = 0.5;`,isExecutable:!0,animation:!1,language:`js`,initiallyVisible:!0},{id:null,code:`diagram.add(\r
  new go.Node()\r
    .add(\r
      new go.Picture({\r
        width: 150, height: 150, background: lightblue,\r
        errorFunction: (picture, event) => {\r
          // set to fallback value\r
          picture.source = "images/1280x960.png";\r
          // adjust width and height accordingly\r
          picture.width = 128;\r
          picture.height = 85.3;\r
        }\r
      })\r
        .bind("source", "path") // may return a bad image source\r
    ));`,isExecutable:!1,language:`js`,initiallyVisible:!0}],externalStyles:[],extraScripts:[],pageScript:null}),y=o(`<meta property="og:title"/> <meta name="description"/> <meta property="og:description"/>`,1),b=o(`<article class="prose mx-auto px-4 py-8"><!></article>`);function x(o,m){d(m,!0);let _=m.data.metadata.description??`${m.data.metadata.title} in GoJS, the JavaScript and TypeScript library for building interactive diagrams.`;var v=b();p(`1lbhnv1`,e=>{var a=y(),o=c(a),s=n(o,2),l=n(s,2);h(()=>{u(o,`content`,`${m.data.metadata.title??``} | Learn GoJS`),u(s,`content`,_),u(l,`content`,_)}),i(()=>{r.title=`${m.data.metadata.title??``} | Learn GoJS`}),t(e,a)});var x=s(v);{let e=l(()=>m.data.extraScripts??[]);g(x,{get htmlContent(){return m.data.htmlContent},get codeBlocks(){return m.data.codeBlocks},get extraScripts(){return a(e)},get pageScript(){return m.data.pageScript}})}f(v),t(o,v),e()}export{x as component,_ as universal};