"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom Tool for zooming into a selected area

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends Tool
* @class
* The DragZoomingTool lets the user zoom into a diagram by stretching a box
* to indicate the new contents of the diagram's viewport (the area of the
* model shown by the Diagram).
* Hold down the Shift key in order to zoom out.
* <p/>
* The default drag selection box is a magenta rectangle.
* You can modify the {@link #box} to customize its appearance.
* <p/>
* The diagram that is zoomed by this tool is specified by the {@link #zoomedDiagram} property.
* If the value is null, the tool zooms its own {@link Tool#diagram}.
* <p/>
* You can use this tool in a modal manner by executing:
* <pre>
*   diagram.currentTool = new DragZoomingTool();
* </pre>
* <p/>
* Use this tool in a mode-less manner by executing:
* <pre>
*   myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());
* </pre>
* However when used mode-lessly as a mouse-move tool, in {@link ToolManager#mouseMoveTools},
* this cannot start running unless there has been a motionless delay
* after the mouse-down event of at least {@link #delay} milliseconds.
* <p/>
* This tool does not utilize any {@link Adornment}s or tool handles,
* but it does temporarily add the {@link #box} part to the diagram.
* This tool does not modify the model or conduct any transaction.
*/
function DragZoomingTool() {
  go.Tool.call(this);
  this.name = "DragZooming";

  var b = new go.Part();
  b.layerName = "Tool";
  b.selectable = false;
  var r = new go.Shape();
  r.name = "SHAPE";
  r.figure = "Rectangle";
  r.fill = null;
  r.stroke = "magenta";
  r.position = new go.Point(0, 0);
  b.add(r);
  /** @type {Part} */
  this._box = b;

  /** @type {number} */
  this._delay = 175;

  /** @type {Diagram} */
  this._zoomedDiagram = null;
}

go.Diagram.inherit(DragZoomingTool, go.Tool);

/**
* This tool can run when there has been a mouse-drag, far enough away not to be a click,
* and there has been delay of at least {@link #delay} milliseconds
* after the mouse-down before a mouse-move.
* <p/>
* This method may be overridden.
* @this {DragZoomingTool}
* @return {boolean}
*/
DragZoomingTool.prototype.canStart = function() {
  if (!this.isEnabled) return false;
  var diagram = this.diagram;
  if (diagram === null) return false;
  var e = diagram.lastInput;
  // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
  if (!e.left) return false;
  // don't include the following checks when this tool is running modally
  if (diagram.currentTool !== this) {
    if (!this.isBeyondDragSize()) return false;
    // must wait for "delay" milliseconds before that tool can run
    if (e.timestamp - diagram.firstInput.timestamp < this.delay) return false;
  }
  return true;
};

/**
* Capture the mouse and show the {@link #box}.
* @this {DragZoomingTool}
*/
DragZoomingTool.prototype.doActivate = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  this.isActive = true;
  diagram.isMouseCaptured = true;
  diagram.skipsUndoManager = true;
  diagram.add(this.box);
  this.doMouseMove();
};

/**
* Release the mouse and remove any {@link #box}.
* @this {DragZoomingTool}
*/
DragZoomingTool.prototype.doDeactivate = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  diagram.remove(this.box);
  diagram.skipsUndoManager = false;
  diagram.isMouseCaptured = false;
  this.isActive = false;
};

/**
* Update the {@link #box}'s position and size according to the value
* of {@link #computeBoxBounds}.
* @this {DragZoomingTool}
*/
DragZoomingTool.prototype.doMouseMove = function() {
  var diagram = this.diagram;
  if (diagram === null) return;
  if (this.isActive && this.box !== null) {
    var r = this.computeBoxBounds();
    var shape = this.box.findObject("SHAPE");
    if (shape === null) shape = this.box.findMainElement();
    shape.desiredSize = r.size;
    this.box.position = r.position;
  }
};

/**
* Call {@link #zoomToRect} with the value of a call to {@link #computeBoxBounds}.
* @this {DragZoomingTool}
*/
DragZoomingTool.prototype.doMouseUp = function() {
  if (this.isActive) {
    var diagram = this.diagram;
    diagram.remove(this.box);
    try {
      diagram.currentCursor = "wait";
      this.zoomToRect(this.computeBoxBounds());
    } finally {
      diagram.currentCursor = "";
    }
  }
  this.stopTool();
};

/**
* This just returns a {@link Rect} stretching from the mouse-down point to the current mouse point
* while maintaining the aspect ratio of the {@link #zoomedDiagram}.
* <p/>
* This method may be overridden.
* @this {DragZoomingTool}
* @return {Rect} a {@link Rect} in document coordinates.
*/
DragZoomingTool.prototype.computeBoxBounds = function() {
  var diagram = this.diagram;
  if (diagram === null) return new go.Rect(0, 0, 0, 0);
  var start = diagram.firstInput.documentPoint;
  var latest = diagram.lastInput.documentPoint;
  var adx = latest.x - start.x;
  var ady = latest.y - start.y;

  var observed = this.zoomedDiagram;
  if (observed === null) observed = this.diagram;
  if (observed === null) {
    return new go.Rect(start, latest);
  }
  var vrect = observed.viewportBounds;
  if (vrect.height === 0 || ady === 0) {
    return new go.Rect(start, latest);
  }

  var vratio = vrect.width / vrect.height;
  var lx;
  var ly;
  if (Math.abs(adx / ady) < vratio) {
    lx = start.x + adx;
    ly = start.y + Math.ceil(Math.abs(adx) / vratio) * (ady < 0 ? -1 : 1);
  } else {
    lx = start.x + Math.ceil(Math.abs(ady) * vratio) * (adx < 0 ? -1 : 1);
    ly = start.y + ady;
  }
  return new go.Rect(start, new go.Point(lx, ly));
};

/**
* This method is called to change the {@link #zoomedDiagram}'s viewport to match the given rectangle.
* <p/>
* This method may be overridden.
* @this {DragZoomingTool}
* @param {Rect} r a rectangular bounds in document coordinates.
*/
DragZoomingTool.prototype.zoomToRect = function(r) {
  if (r.width < 0.1) return;
  var observed = this.zoomedDiagram;
  if (observed === null) observed = this.diagram;
  if (observed === null) return;

  // zoom out when using the Shift modifier
  if (this.diagram.lastInput.shift) {
    observed.scale = Math.max(observed.scale * r.width / observed.viewportBounds.width, observed.minScale);
    observed.centerRect(r);
  } else {
    // do scale first, so the Diagram's position normalization isn't constrained unduly when increasing scale
    observed.scale = Math.min(observed.viewportBounds.width * observed.scale / r.width, observed.maxScale);
    observed.position = new go.Point(r.x, r.y);
  }
};


// Public properties

/**
* Gets or sets the {@link Part} used as the "rubber-band zoom box"
* that is stretched to follow the mouse, as feedback for what area will
* be passed to {@link #zoomToRect} upon a mouse-up.
* <p/>
* Initially this is a {@link Part} containing only a simple magenta rectangular {@link Shape}.
* The object to be resized should be named "SHAPE".
* Setting this property does not raise any events.
* <p/>
* Modifying this property while this tool {@link Tool#isActive} might have no effect.
* @name DragZoomingTool#box

* @return {Part}
*/
Object.defineProperty(DragZoomingTool.prototype, "box", {
  get: function() { return this._box; },
  set: function(val) { this._box = val; }
});

/**
* Gets or sets the time in milliseconds for which the mouse must be stationary
* before this tool can be started.
* The default value is 175 milliseconds.
* Setting this property does not raise any events.
* @name DragZoomingTool#delay

* @return {number}
*/
Object.defineProperty(DragZoomingTool.prototype, "delay", {
  get: function() { return this._delay; },
  set: function(val) { this._delay = val; }
});

/**
* Gets or sets the {@link Diagram} whose {@link Diagram#position} and {@link Diagram#scale}
* should be set to display the drawn {@link #box} rectangular bounds.
* <p/>
* The default value is null, which causes {@link #zoomToRect} to modify this tool's {@link Tool#diagram}.
* Setting this property does not raise any events.
* @name DragZoomingTool#zoomedDiagram

* @return {Diagram}
*/
Object.defineProperty(DragZoomingTool.prototype, "zoomedDiagram", {
  get: function() { return this._zoomedDiagram; },
  set: function(val) { this._zoomedDiagram = val; }
});
