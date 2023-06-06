"use strict";
/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

// A class for simulating mouse and keyboard input.

// As a special feature, this supports limited simulation of drag-and-drop between Diagrams,
// by setting on the EVENTPROPS argument of the mouseDown/mouseMove/mouseUp methods
// both the "sourceDiagram" and "targetDiagram" properties.
// Although InputEvent.targetDiagram is a real property,
// the "sourceDiagram" property is only used by these Robot methods.

var isMac = (this.navigator !== undefined && this.navigator.platform !== undefined && this.navigator.platform.toUpperCase().indexOf('MAC') >= 0);

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @class
* Typical setup:
* <pre>
*    // a shared Robot that can be used by all commands for this one Diagram
*    myRobot = new Robot(myDiagram);  // defined in Robot.js
* </pre>
* Then later:
* <pre>
*    // Simulate a mouse drag to move a node:
*    const loc = ...;  // some Point in document coordinates that is within the bounds of a node
*    const options = {};  // possible settings of InputEvent, such as setting control or shift to true
*    myRobot.mouseDown(loc.x, loc.y, 0, options);
*    myRobot.mouseMove(loc.x + 80, loc.y + 50, 50, options);
*    myRobot.mouseMove(loc.x + 20, loc.y + 100, 100, options);
*    myRobot.mouseUp(loc.x + 20, loc.y + 100, 150, options);
* </pre>
* @param {Diagram=} dia the Diagram on which the Robot simulates input events
*/
function Robot(dia) {
  if (dia === undefined) dia = null;
  this.diagram = dia;
}

/**
* @ignore
* Transfer property settings from a JavaScript Object to an InputEvent.
* @this {Robot}
* @param {InputEvent} e
* @param {Object} props
*/
Robot.prototype.initializeEvent = function(e, props) {
  if (!props) return;
  for (var p in props) {
    if (p !== "sourceDiagram") e[p] = props[p];
    // If people write control: true, switch to alt: true on macs, for ctrl+copy
    if (p === "control") {
      if (isMac) {
        e['alt'] = props[p];
      } else {
        e[p] = props[p];
      }
    }
  }
};

/**
* Simulate a mouse down event.
* @this {Robot}
* @param {number} x the X-coordinate of the mouse point in document coordinates.
* @param {number} y the Y-coordinate of the mouse point in document coordinates.
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.mouseDown = function(x, y, time, eventprops) {
  if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseDown first two args must be X,Y numbers");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (eventprops && eventprops.sourceDiagram) diagram = eventprops.sourceDiagram;
  if (!diagram.isEnabled) return;

  var n = new go.InputEvent();
  n.diagram = diagram;
  n.documentPoint = new go.Point(x, y);
  n.viewPoint = diagram.transformDocToView(n.documentPoint);
  n.timestamp = time;
  n.down = true;
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  diagram.firstInput = n.copy();
  diagram.currentTool.doMouseDown();
};

/**
* Simulate a mouse move event.
* @this {Robot}
* @param {number} x the X-coordinate of the mouse point in document coordinates.
* @param {number} y the Y-coordinate of the mouse point in document coordinates.
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.mouseMove = function(x, y, time, eventprops) {
  if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseMove first two args must be X,Y numbers");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (eventprops && eventprops.sourceDiagram) diagram = eventprops.sourceDiagram;
  if (!diagram.isEnabled) return;

  var n = new go.InputEvent();
  n.diagram = diagram;
  n.documentPoint = new go.Point(x, y);
  n.viewPoint = diagram.transformDocToView(n.documentPoint);
  n.timestamp = time;
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  diagram.currentTool.doMouseMove();
};

/**
* Simulate a mouse up event.
* @this {Robot}
* @param {number} x the X-coordinate of the mouse point in document coordinates.
* @param {number} y the Y-coordinate of the mouse point in document coordinates.
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.mouseUp = function(x, y, time, eventprops) {
  if (typeof x !== "number" || typeof y !== "number") throw new Error("Robot.mouseUp first two args must be X,Y numbers");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (eventprops && eventprops.sourceDiagram) diagram = eventprops.sourceDiagram;
  if (!diagram.isEnabled) return;

  var n = new go.InputEvent();
  n.diagram = diagram;
  n.documentPoint = new go.Point(x, y);
  n.viewPoint = diagram.transformDocToView(n.documentPoint);
  n.timestamp = time;
  n.up = true;
  if (diagram.firstInput.documentPoint.equals(n.documentPoint)) n.clickCount = 1;  // at least??
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  // if (diagram.simulatedMouseUp(null, (n as any).sourceDiagram, n.documentPoint, n.targetDiagram)) return;
  diagram.currentTool.doMouseUp();
};

/**
* Simulate a mouse wheel event.
* @this {Robot}
* @param {number} delta non-zero turn
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.mouseWheel = function(delta, time, eventprops) {
  if (typeof delta !== "number") throw new Error("Robot.mouseWheel first arg must be DELTA number");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (!diagram.isEnabled) return;

  var n = diagram.lastInput.copy();
  n.diagram = diagram;
  n.delta = delta;
  n.timestamp = time;
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  diagram.currentTool.doMouseWheel();
};

/**
* Simulate a key down event.
* @this {Robot}
* @param {string|number} keyorcode
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.keyDown = function(keyorcode, time, eventprops) {
  if (typeof keyorcode !== "string" && typeof keyorcode !== "number") throw new Error("Robot.keyDown first arg must be a string or a number");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (!diagram.isEnabled) return;

  var n = diagram.lastInput.copy();
  n.diagram = diagram;
  if (typeof (keyorcode) === 'string') {
    n.key = keyorcode;
  } else if (typeof (keyorcode) === 'number') {
    n.key = String.fromCharCode(keyorcode);
  }
  n.timestamp = time;
  n.down = true;
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  diagram.currentTool.doKeyDown();
};

/**
* Simulate a key up event.
* @this {Robot}
* @param {string|number} keyorcode
* @param {number=} time the timestamp of the simulated event, in milliseconds; default zero
* @param {object=} eventprops an optional argument providing properties for the InputEvent.
*/
Robot.prototype.keyUp = function(keyorcode, time, eventprops) {
  if (typeof keyorcode !== "string" && typeof keyorcode !== "number") throw new Error("Robot.keyUp first arg must be a string or a number");
  if (time === undefined) time = 0;

  var diagram = this.diagram;
  if (!diagram.isEnabled) return;

  var n = diagram.lastInput.copy();
  n.diagram = diagram;
  if (typeof (keyorcode) === 'string') {
    n.key = keyorcode;
  } else if (typeof (keyorcode) === 'number') {
    n.key = String.fromCharCode(keyorcode);
  }
  n.timestamp = time;
  n.up = true;
  this.initializeEvent(n, eventprops);
  diagram.lastInput = n;
  diagram.currentTool.doKeyUp();
};
